import {
  EsoBonusStats,
  EsoItem,
  EsoItemRarity,
  EsoItemType,
  EsoSet,
  EsoSetBonus,
  EsoSetBonusKey,
  EsoSlot,
  EsoStat
} from '../data/eso-sets';
import { getEsoItemById, getEsoSetByName } from '../data/esoSetDataLoader';

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
export const Strings_EquipmentSlot = {
  [EquipmentSlot.head]: 'Head',
  [EquipmentSlot.shoulders]: 'Shoulders',
  [EquipmentSlot.chest]: 'Chest',
  [EquipmentSlot.legs]: 'Legs',
  [EquipmentSlot.hands]: 'Hands',
  [EquipmentSlot.feet]: 'Feet',
  [EquipmentSlot.waist]: 'Waist',
  [EquipmentSlot.neck]: 'Neck',
  [EquipmentSlot.ring1]: 'Ring 1',
  [EquipmentSlot.ring2]: 'Ring 2',
  [EquipmentSlot.mainHand1]: 'Main Hand 1',
  [EquipmentSlot.offHand1]: 'Off Hand 1',
  [EquipmentSlot.mainHand2]: 'Main Hand 2',
  [EquipmentSlot.offHand2]: 'Off Hand 2'
};

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
// convert EsoSlot to EquipmentSlot
export const esoSlotToEquipmentSlot = (esoSlot: EsoSlot, isMainWeaponSet: boolean = true): EquipmentSlot => {
  switch (esoSlot) {
    case EsoSlot.head:
      return EquipmentSlot.head;
    case EsoSlot.shoulders:
      return EquipmentSlot.shoulders;
    case EsoSlot.hands:
      return EquipmentSlot.hands;
    case EsoSlot.legs:
      return EquipmentSlot.legs;
    case EsoSlot.chest:
      return EquipmentSlot.chest;
    case EsoSlot.waist:
      return EquipmentSlot.waist;
    case EsoSlot.feet:
      return EquipmentSlot.feet;
    case EsoSlot.neck:
      return EquipmentSlot.neck;
    case EsoSlot.ring:
      return EquipmentSlot.ring1;
    case EsoSlot.oneHand:
      return isMainWeaponSet ? EquipmentSlot.mainHand1 : EquipmentSlot.mainHand2;
    case EsoSlot.twoHands:
      return isMainWeaponSet ? EquipmentSlot.mainHand1 : EquipmentSlot.mainHand2;
    case EsoSlot.offHand:
      return isMainWeaponSet ? EquipmentSlot.offHand1 : EquipmentSlot.offHand2;
  }
};

type EquipmentBuildSlot = {
  [key in EquipmentSlot]?: EsoItem;
}

export interface EquipmentSet {
  set: EsoSet;
  bonusCount: number;
}

export class EquipmentBuild {
  name: string;
  items: EquipmentBuildSlot;
  isMainWeaponSetActive: boolean;

  constructor(name = 'New Build', items = {} as EquipmentBuildSlot, isMainWeaponSetActive: boolean = true) {
    this.name = name;
    this.items = items;
    this.isMainWeaponSetActive = isMainWeaponSetActive;
  }

  static fromPlainBuild(build: EquipmentBuild): EquipmentBuild {
    return new EquipmentBuild(build.name, build.items, build.isMainWeaponSetActive);
  }

  static fromHash(hash: string): EquipmentBuild {
    const buildItems = {} as EquipmentBuildSlot;
    hash.split('_').forEach((itemId, index) => {
      if (!itemId) {
        return;
      }
      const slot = Object.keys(EquipmentSlot)[index] as EquipmentSlot;
      const item = getEsoItemById(parseInt(itemId));
      if (item) {
        buildItems[slot] = item;
      }
    });
    return new EquipmentBuild('New Build', buildItems);
  }

  public toHash(): string {
    const buildItems = this.items;
    const hashArray = Object.keys(EquipmentSlot).map(key => {
      const enumKey = key as EquipmentSlot;
      return buildItems[enumKey]?.id;
    });
    const itemsHash = hashArray.join('_');

    return itemsHash;
  }

  public equip(item: EsoItem, slot: EquipmentSlot): void {
    if (!item) {
      return;
    }

    // validate item is being equipped to a valid slot
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
    } else if (slot === EquipmentSlot.offHand1 && 
      this.items[EquipmentSlot.mainHand1] && 
      this.items[EquipmentSlot.mainHand1]?.slot === EsoSlot.twoHands) {
      // clear out main hand slot
      delete this.items[EquipmentSlot.mainHand1];
    } else if (slot === EquipmentSlot.offHand2 && 
      this.items[EquipmentSlot.mainHand2] && 
      this.items[EquipmentSlot.mainHand2]?.slot === EsoSlot.twoHands) {
      // clear out main hand slot
      delete this.items[EquipmentSlot.mainHand2];
    }
    if (item.rarity === EsoItemRarity.mythic) {
      // only one mythic item allowed
      Object.keys(this.items).forEach(key => {
        const enumKey = key as EquipmentSlot;
        if (this.items[enumKey]?.rarity === EsoItemRarity.mythic) {
          delete this.items[enumKey];
        }
      });
    }

    this.items[slot] = item;
  }

  public unequip(slot: EquipmentSlot): void {
    delete this.items[slot];
  }

  public toggleWeaponSet(): void {
    this.isMainWeaponSetActive = !this.isMainWeaponSetActive;
  }

  // returns the count of bonuses in a set
  public countBonusesBySet(setName: string): number {
    let count = 0;
    Object.keys(this.items).forEach(key => {
      const slotKey = key as EquipmentSlot;
      const item = this.items[slotKey];
      if (item?.setName !== setName) {
        return;
      }
      if ((slotKey === EquipmentSlot.mainHand2 || slotKey === EquipmentSlot.offHand2) && this.isMainWeaponSetActive) {
        return;
      }
      if ((slotKey === EquipmentSlot.mainHand1 || slotKey === EquipmentSlot.offHand1) && !this.isMainWeaponSetActive) {
        return;
      }
      count++;
      // 2 handed weapons are counted as two bonuses
      if (item?.itemType === EsoItemType.weapons && item?.slot === EsoSlot.twoHands) {
        count++;
      }
    });
    return count;
  }

  // return the list of sets that this build has and the count of bonuses in each set
  public getSets(onlyCountActive: boolean = false): Map<EsoSet, number> {
    const sets = new Map<EsoSet, number>();
    Object.keys(this.items).forEach(key => {
      const slotKey = key as EquipmentSlot;
      const item = this.items[slotKey];
      if (!item) {
        return;
      }

      if (onlyCountActive) {
        // only count active weapons
        if ((slotKey === EquipmentSlot.mainHand2 || slotKey === EquipmentSlot.offHand2) && this.isMainWeaponSetActive) {
          return false;
        }
        if ((slotKey === EquipmentSlot.mainHand1 || slotKey === EquipmentSlot.offHand1) && !this.isMainWeaponSetActive) {
          return;
        }
      }
      const set = getEsoSetByName(item.setName);
      if (!set) {
        return;
      }
      if (!sets.has(set)) {
        sets.set(set, 1);
      } else {
        // increment
        const inc = (item.itemType === EsoItemType.weapons && item.slot === EsoSlot.twoHands) ? 2 : 1;
        sets.set(set, (sets.get(set) || 0) + inc);
      }
    });
    return sets;
  }

  // return total bonus stats for the build
  public getTotalBonusStats(): EsoBonusStats {
    const bonusStats = {} as EsoBonusStats;
    const sets = this.getSets(true);
    sets.forEach((count, set) => {
      for (let i = 1; i <= count; i++) {
        const bonusKey = i.toString() as EsoSetBonusKey;
        const bonus: EsoSetBonus | undefined = set.bonuses[bonusKey];
        if (!bonus || !bonus.stats) {
          continue;
        }

        for (const stat in bonus.stats) {
          const esoStat = stat as EsoStat;
          if (!bonusStats[esoStat]) {
            bonusStats[esoStat] = 0;
          }
          bonusStats[esoStat] = (bonusStats[esoStat] as number) + (bonus.stats[esoStat] as number);
        }
      }
    });
    return bonusStats;
  }
}
