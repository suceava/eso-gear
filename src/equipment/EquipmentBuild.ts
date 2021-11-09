import { EsoItem, EsoSlot } from '../data/eso-sets';

export enum EquipmentSlot {
  head = 'head',
  shoulders = 'shoulders',
  chest = 'chest',
  legs = 'legs',
  hands = 'hands',
  feet = 'feet',
  waist = 'waist',
  neck = 'neck',
  ring1 = 'ring1',
  ring2 = 'ring2',
  mainHand1 = 'mainHand1',
  offHand1 = 'offHand1',
  mainHand2 = 'mainHand2',
  offHand2 = 'offHand2'
}

// convert EquipmentSlot to EsoSlot
export const equipmentSlotToEsoSlot = (equipmentSlot: EquipmentSlot): EsoSlot | EsoSlot[] => {
  switch (equipmentSlot) {
    case EquipmentSlot.head:
      return EsoSlot.head;
    case EquipmentSlot.shoulders:
      return EsoSlot.shoulders;
    case EquipmentSlot.hands:
      return EsoSlot.hands;
    case EquipmentSlot.legs:
      return EsoSlot.legs;
    case EquipmentSlot.chest:
      return EsoSlot.chest;
    case EquipmentSlot.waist:
      return EsoSlot.waist;
    case EquipmentSlot.feet:
      return EsoSlot.feet;
    case EquipmentSlot.neck:
      return EsoSlot.neck;
    case EquipmentSlot.ring1:
    case EquipmentSlot.ring2:
      return EsoSlot.ring;
    case EquipmentSlot.mainHand1:
    case EquipmentSlot.mainHand2:
      return [EsoSlot.oneHand, EsoSlot.twoHands];
    case EquipmentSlot.offHand1:
    case EquipmentSlot.offHand2:
      return [EsoSlot.oneHand, EsoSlot.offHand];
  }
};


type EquipmentBuildItem = {
  enchantment?: string | undefined;
  trait?: string | undefined;
} & EsoItem;

type EquipmentBuildSlot = {
  [key in EquipmentSlot]: EquipmentBuildItem | undefined;
}

export class EquipmentBuild {
  name: string;
  items: EquipmentBuildSlot;

  constructor(name = 'New Build', items = {} as EquipmentBuildSlot) {
    this.name = name;
    this.items = items;
  }

  static fromPlainBuild(build: EquipmentBuild): EquipmentBuild {
    return new EquipmentBuild(build.name, build.items);
  }

  public equip(item: EsoItem, slot: EquipmentSlot): void {
    if (!item) {
      return;
    }

    const itemSlot = equipmentSlotToEsoSlot(slot);
    if (itemSlot instanceof Array) {
      if (!itemSlot.includes(item.slot)) {
        console.error(`${item.name} is not a ${slot}`);
        return;
      }
    } else {
      if (item.slot !== itemSlot) {
        console.error(`${item.name} is not a ${slot}`);
        return;
      }
    }

    if (item.slot === EsoSlot.twoHands) {
      // clear out off hand slot
      delete this.items[slot === EquipmentSlot.mainHand1 ? EquipmentSlot.offHand1 : EquipmentSlot.offHand2];
    }
    if (slot === EquipmentSlot.offHand1 && 
      this.items[EquipmentSlot.mainHand1] && 
      this.items[EquipmentSlot.mainHand1]?.slot === EsoSlot.twoHands) {
      // clear out main hand slot
      delete this.items[EquipmentSlot.mainHand1];
    }
    if (slot === EquipmentSlot.offHand2 && 
      this.items[EquipmentSlot.mainHand2] && 
      this.items[EquipmentSlot.mainHand2]?.slot === EsoSlot.twoHands) {
      // clear out main hand slot
      delete this.items[EquipmentSlot.mainHand2];
    }
    this.items[slot] = item;
  }

  public toHash(): string {
    const buildItems = this.items;
    const hashArray = Object.keys(EquipmentSlot).map(key => {
      const enumKey = key as EquipmentSlot;
      return buildItems[enumKey]?.id;
    });
    console.log(hashArray.join('_'));
    return hashArray.join('_');
  }
}
