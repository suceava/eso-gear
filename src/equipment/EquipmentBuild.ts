import { EsoItem, EsoSlot } from '../data/eso-sets';

export enum EquipmentSlot {
  chest = 'chest',
  waist = 'waist',
  feet = 'feet',
  legs = 'legs',
  hands = 'hands',
  head = 'head',
  shoulders = 'shoulders',
  neck = 'neck',
  ring1 = 'ring1',
  ring2 = 'ring2',
  mainHand = 'mainHand',
  offHand = 'offHand'
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
      return EsoSlot.ring;
    case EquipmentSlot.ring2:
      return EsoSlot.ring;
    case EquipmentSlot.mainHand:
      return [EsoSlot.oneHand, EsoSlot.twoHands];
    case EquipmentSlot.offHand:
      return [EsoSlot.oneHand, EsoSlot.offHand];
  }
};

type EquipmentBuildSlot = {
  [key in EquipmentSlot]: EsoItem;
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

    this.items[slot] = item;
  }
}
