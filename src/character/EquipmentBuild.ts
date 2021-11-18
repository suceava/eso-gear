import {
  EsoBonusStats,
  EsoItem,
  EsoItemEnchantment,
  EsoItemRarity,
  EsoItemType,
  EsoSet,
  EsoSetBonus,
  EsoSetBonusKey,
  EsoSlot,
  EsoStat
} from '../data/eso-sets';
import { getArmorStats } from '../data/esoItemStatsDataLoader';
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

export class EquipmentBuildSlot {
  equipmentSlot: EquipmentSlot;
  item?: EsoItem;
  itemEnchantment?: {
    enchantment: EsoItemEnchantment;
    values: number[];
  };
  armor?: number;
  damage?: number;

  constructor(equipmentSlot: EquipmentSlot, item?: EsoItem) {
    this.equipmentSlot = equipmentSlot;
    this.setItem(item);
  }

  public setItem(item?: EsoItem) {
    this.item = item;
    this.assignStats();
  }

  public assignStats() {
    if (!this.item) {
      return;
    }

    if (this.item.itemType === EsoItemType.armor && this.item.armorType) {
      const armorStats = getArmorStats(this.item.slot, this.item.armorType);
      this.armor = armorStats ? armorStats.armor : 0;
    } else if (this.item.itemType === EsoItemType.weapon) {
      this.damage = 0;
    }
  }
}
type EquipmentBuildItems = {
  [key in EquipmentSlot]?: EquipmentBuildSlot;
}

export class EquipmentBuild implements Iterable<EquipmentBuildSlot> {
  private items: EquipmentBuildItems;
  name: string;
  isMainWeaponSetActive: boolean;

  constructor(name = 'New Build', items = {} as EquipmentBuildItems, isMainWeaponSetActive: boolean = true) {
    this.name = name;
    this.items = items;
    this.isMainWeaponSetActive = isMainWeaponSetActive;
  }

  public *[Symbol.iterator]() {
    for (let key of Object.keys(EquipmentSlot)) {
      const enumKey = key as EquipmentSlot;
      const item = this.items[enumKey];
      if (item) {
        yield item;
      }
    }
  }

  static fromPlainBuild(build: EquipmentBuild): EquipmentBuild {
    // check for old structure
    let itemList = build.items;
    if (itemList) {
      const item = Object.values(itemList)[0] as any;
      if (item.id) {
        // old structure => clear it out
        itemList = {};
      }
    }

    // must instantiate classes from plain objects so we can have access to methods
    Object.keys(EquipmentSlot).forEach(key => {
      const equipmentSlot = key as EquipmentSlot;
      const buildItem = itemList[equipmentSlot];
      if (buildItem) {
        itemList[equipmentSlot] = new EquipmentBuildSlot(equipmentSlot, buildItem.item);
      }
    });

    return new EquipmentBuild(build.name, itemList, build.isMainWeaponSetActive);
  }

  static fromHash(hash: string): EquipmentBuild {
    const buildItems = {} as EquipmentBuildItems;
    hash.split('_').forEach((itemId, index) => {
      if (!itemId) {
        return;
      }
      const slot = Object.keys(EquipmentSlot)[index] as EquipmentSlot;
      const item = getEsoItemById(parseInt(itemId));
      if (item) {
        buildItems[slot] = new EquipmentBuildSlot(slot, item);
      }
    });
    return new EquipmentBuild('New Build', buildItems);
  }

  public toHash(): string {
    const hashArray = Object.keys(EquipmentSlot).map(key => {
      const enumKey = key as EquipmentSlot;
      const buildItem = this.getEquipmentItem(enumKey);
      if (!buildItem || !buildItem.item) {
        return '';
      }
      return buildItem.item.id;
    });
    const itemsHash = hashArray.join('_');

    return itemsHash;
  }

  public getEquipmentItem(slot: EquipmentSlot): EquipmentBuildSlot | undefined {
    return this.items[slot];
  }
  public getEsoItem(slot: EquipmentSlot): EsoItem | undefined {
    const item = this.items[slot];
    return item?.item;
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
      this.unequip(slot === EquipmentSlot.mainHand1 ? EquipmentSlot.offHand1 : EquipmentSlot.offHand2);
    } else if (slot === EquipmentSlot.offHand1 && 
      this.items[EquipmentSlot.mainHand1] && 
      this.items[EquipmentSlot.mainHand1]?.item?.slot === EsoSlot.twoHands) {
      // clear out main hand slot
      this.unequip(EquipmentSlot.mainHand1);
    } else if (slot === EquipmentSlot.offHand2 && 
      this.items[EquipmentSlot.mainHand2] && 
      this.items[EquipmentSlot.mainHand2]?.item?.slot === EsoSlot.twoHands) {
      // clear out main hand slot
      this.unequip(EquipmentSlot.mainHand2);
    }
    if (item.rarity === EsoItemRarity.mythic) {
      // only one mythic item allowed
      for (const buildItem of this) {
        if (buildItem.item?.rarity === EsoItemRarity.mythic) {
          this.unequip(buildItem.equipmentSlot);
        }
      }
    }

    let buildItem = this.getEquipmentItem(slot);
    if (buildItem) {
      buildItem.setItem(item);
    } else {
      buildItem = new EquipmentBuildSlot(slot, item);
      this.items[slot] = buildItem;
    }
  }

  public unequip(slot: EquipmentSlot): void {
    let buildItem = this.getEquipmentItem(slot);
    if (buildItem) {
      delete buildItem.item;
    }
  }

  public toggleWeaponSet(): void {
    this.isMainWeaponSetActive = !this.isMainWeaponSetActive;
  }

  // returns the count of bonuses in a set
  public countBonusesBySet(setName: string): number {
    let count = 0;
    Object.keys(this.items).forEach(key => {
      const slotKey = key as EquipmentSlot;
      const item = this.getEsoItem(slotKey);
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
      if (item?.itemType === EsoItemType.weapon && item?.slot === EsoSlot.twoHands) {
        count++;
      }
    });
    return count;
  }

  // return the list of sets that this build has and the count of bonuses in each set
  public getSets(onlyCountActive: boolean = false): Map<EsoSet, number> {
    const sets = new Map<EsoSet, number>();
    for (const buildItem of this) {
      const item = buildItem.item;
      if (!item) {
        continue;
      }

      if (onlyCountActive) {
        // only count active weapons
        if ((buildItem.equipmentSlot === EquipmentSlot.mainHand2 || buildItem.equipmentSlot === EquipmentSlot.offHand2) && this.isMainWeaponSetActive) {
          continue;
        }
        if ((buildItem.equipmentSlot === EquipmentSlot.mainHand1 || buildItem.equipmentSlot === EquipmentSlot.offHand1) && !this.isMainWeaponSetActive) {
          continue;
        }
      }
      const set = getEsoSetByName(item.setName);
      if (!set) {
        continue;
      }
      if (!sets.has(set)) {
        sets.set(set, 1);
      } else {
        // increment
        const inc = (item.itemType === EsoItemType.weapon && item.slot === EsoSlot.twoHands) ? 2 : 1;
        sets.set(set, (sets.get(set) || 0) + inc);
      }
    }
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

  // return total armor from items
  public getTotalArmor(): number {
    let armor = 0;
    for (const buildItem of this) {
      if (!buildItem || !buildItem.item) {
        continue;
      }

      const item = buildItem.item;
      if (item.itemType === EsoItemType.armor) {
        // only count active weapons bar
        if (buildItem.equipmentSlot === EquipmentSlot.offHand2 && this.isMainWeaponSetActive) {
          continue;
        }
        if (buildItem.equipmentSlot === EquipmentSlot.offHand1 && !this.isMainWeaponSetActive) {
          continue;
        }
        armor += (buildItem.armor || 0);
      }
    }
    return armor;
  }
}
