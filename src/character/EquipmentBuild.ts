import { EquipmentBuildSlot, EquipmentSlot, equipmentSlotToEsoSlot } from './EquipmentBuildSlot';
import {
  EsoBonusStats,
  EsoItem,
  EsoItemRarity,
  EsoItemType,
  EsoSet,
  EsoSetBonus,
  EsoSetBonusKey,
  EsoSlot,
  EsoStat,
  esoItemEnchantmentToEsoStat
} from '../data/eso-sets';
import { getEsoItemById, getEsoSetByName } from '../data/esoSetDataLoader';


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

  public *[Symbol.iterator](): Iterator<EquipmentBuildSlot> {
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
      if (item && item.id) {
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
      const inc = (item.itemType === EsoItemType.weapon && item.slot === EsoSlot.twoHands) ? 2 : 1;
      if (!sets.has(set)) {
        sets.set(set, inc);
      } else {
        // increment
        sets.set(set, (sets.get(set) || 0) + inc);
      }
    }
    return sets;
  }

  // return set bonus stats for the build
  public getSetBonusStats(): EsoBonusStats {
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

  // return total enchantment bonuses from items
  public getTotalEnchantmentBonuses(): EsoBonusStats {
    const bonusStats = {} as EsoBonusStats;
    for (const prop of this) {
      const buildItem = prop as EquipmentBuildSlot;
      if (!buildItem || !buildItem.item) {
        continue;
      }

      // ensure item has enchantment
      const item = buildItem.item;
      if (!item.enchantment) {
        continue;
      }
      // only count active weapons bar
      if ((buildItem.equipmentSlot === EquipmentSlot.mainHand2 || buildItem.equipmentSlot === EquipmentSlot.offHand2) && this.isMainWeaponSetActive) {
        continue;
      }
      if ((buildItem.equipmentSlot === EquipmentSlot.mainHand1 || buildItem.equipmentSlot === EquipmentSlot.offHand1) && !this.isMainWeaponSetActive) {
        continue;
      }

      if (!buildItem.slotEnchantment?.stats) {
        continue;
      }

      // convert to EsoStat
      const esoStat = esoItemEnchantmentToEsoStat(item.enchantment);
      if (esoStat) {
        if (!bonusStats[esoStat]) {
          bonusStats[esoStat] = 0;
        }
        bonusStats[esoStat] = (bonusStats[esoStat] as number) + (buildItem.slotEnchantment?.stats[esoStat] as number);
      } else if (typeof buildItem.slotEnchantment.stats === 'object') {
        // enchantment is an object
        const { stats } = buildItem.slotEnchantment;
        Object.keys(stats).forEach(key => {
          // loop through enchantment object's props
          const statKey: EsoStat = (EsoStat as any)[key];
          if (!statKey) {
            return;
          }

          if (!bonusStats[statKey]) {
            bonusStats[statKey] = 0;
          }
          bonusStats[statKey] = (bonusStats[statKey] as number) + (stats[statKey] as number);
        });
      }
    }
    return bonusStats;
  }

  // return total bonuses from items and sets
  public getTotalStats(): EsoBonusStats {
    // start with set bonuses
    const stats = this.getSetBonusStats();

    // get total armor
    const armor = this.getTotalArmor();
    // add armor to stats
    stats[EsoStat.armor] = armor + (stats[EsoStat.armor] || 0);

    // get total enchantment bonuses
    const enchantments = this.getTotalEnchantmentBonuses();
    // add enchantments to stats
    for (const stat in enchantments) {
      const esoStat = stat as EsoStat;
      stats[esoStat] = (stats[esoStat] as number || 0) + (enchantments[esoStat] as number || 0);
    }

    return stats;
  }
}
