import { promises as fs } from 'fs';
import setsList from './eso-sets.mjs';

const FILE_NAME = 'eso-sets.mjs';

// remove path from image names
const fixImagePaths = () => {
  // remove path from images
  setsList.forEach(s => {
    s.image = s.image.replace('/icons/', '');
    s.items.list.forEach(i => {
      i.image = i.image.replace('/icons/', '');
    })
  });
}

// fix htmlDescription
const fixHtmlDescription = () => {
  setsList.forEach(s => {
    // change <strong> tag to <span>
    s.htmlDescription = s.htmlDescription.replaceAll('<strong', '<span').replaceAll('strong>', 'span>');
    // remove <a> tags
    s.htmlDescription = s.htmlDescription.replaceAll('</a>', '').replace(/<a[^>]*>/g, '');
  });
}

const imageRgxSlots = [
  {
    slot: 'head',
    rgx: [ 'head', 'helmet' ]
  },
  { slot: 'feet' },
  {
    slot: 'chest',
    rgx: [ 'chest', 'shirt', 'robe' ]
  },
  { slot: 'legs' },
  {
    slot: 'hands',
    rgx: [ 'hands', 'hand' ]
  },
  {
    slot: 'shoulders',
    rgx: [ 'shoulders', 'shoulder' ]
  },
  {
    slot: 'waist',
    rgx: [ 'waist', 'belt' ]
  },
  { slot: 'neck' },
  { slot: 'ring' },
  {
    slot: 'oneHand',
    rgx: [ 'dagger', 'hammer', 'axe', 'sword', 'mace', '1haxe', '1hsword', '1hhammer', '1hmace' ]
  },
  {
    slot: 'twoHands',
    rgx: [ '2hhammer', '2haxe', '2hsword', '2hmace', 'staff', 'bow', 'satff' ]
  },
  {
    slot: 'offHand',
    rgx: [ 'shield' ]
  }
];
const extractItemSlot = (item) => {
  if (item.slot) {
    // already have slot
    return;
  }

  const extractSlot = (stringToMatch) => { 
    for (let i=0; i < imageRgxSlots.length; i++) {
      const rgxSlot = imageRgxSlots[i];
      const rgxList = rgxSlot.rgx ? rgxSlot.rgx : [rgxSlot.slot];
      for (let j=0; j < rgxList.length; j++) {
        const match = new RegExp(`_${rgxList[j]}_?`, 'i').exec(stringToMatch);
        if (match && match.length) {
          item.slot = rgxSlot.slot;
          break;
        }
      }
      if (item.slot) {
        break;
      }
    }
  }
  extractSlot(item.image);
  if (!item.slot) {
    // try name
//    extractSlot(item.name);

    if (!item.slot) {
      console.error('Item slot not found for ', item);
    }
  }
}
const extractItemArmorType = (item) => {
  if (item.armorType) {
    // already have armor type
    return;
  }

  const armorTypes = [
    {
      type: 'medium',
      rgx: [ 'arm cops', 'belt', 'helmet', 'bracers', 'boots', 'guards', 'jack' ]
    },
    {
      type: 'heavy',
      rgx: [ 'pauldrons', 'sabatons', 'gauntlets', 'helm', 'cuirass', 'greaves', 'girdle' ]
    },
    {
      type: 'light',
      rgx: [ 'epaulets', 'sash', 'gloves', 'breeches', 'robe', 'shirt', 'jerkin', 'hat', 'shoes' ]
    }
  ];
  for (let i=0; i < armorTypes.length; i++) {
    const arm = armorTypes[i];
    const match = new RegExp(`_${arm.type}_`, 'i').exec(item.image);
    if (match && match.length) {
      item.armorType = arm.type;
      break;
    }
    // check item name
    for (let j=0; j < arm.rgx.length; j++) {
      const match2 = new RegExp(`${arm.rgx[j]}`, 'i').exec(item.name);
      if (match2 && match2.length) {
        item.armorType = arm.type;
        break;
      }
    }
    if (item.armorType) {
      break;
    }
  }
  if (!item.armorType) {
    if (!['ring', 'neck', 'oneHand', 'offHand', 'twoHands'].includes(item.slot)) {
      console.error('Armor type not found for ', item);
    }
  }
}
// extract item info
const extractItemInfo = () => {
  setsList.forEach(s => {
    s.items.list.forEach(i => {
      extractItemSlot(i);
      extractItemArmorType(i);
      if (!i.armorType && s.type === 'Monster Set') {
        fixMonsterSetArmorTpe(i);
      }
    });
  });
}

const fixMonsterSetArmorTpe = () => {
  setsList.filter(s => s.type === 'Monster Set').forEach(s => {
    ['head', 'shoulders'].forEach(t => {
      const items = s.items.list.filter(i => i.slot === t);
      if (!items || items.length != 3) {
        console.error('Monster set not valid ', s.name);
        return;
      }
      // make sure armor type not already set
      const countItemsWithType = (items[0].armorType ? 1 : 0) + (items[1].armorType ? 1 : 0) + (items[2].armorType ? 1 : 0);
      if (countItemsWithType === 3) {
        // all have type
        return;
      }
      if (countItemsWithType !== 0) {
        console.error('Monster set mismatched armor type ', s.name);
        return;
      }
      // assume 3 items => make one armor type for each
      items[0].armorType = 'light';
      items[1].armorType = 'medium';
      items[2].armorType = 'heavy';
    });
  });
}

const addItemType = () => {
  setsList.forEach(s => {
    s.items.list.forEach(i => {
      if (i.slot === 'ring' || i.slot === 'neck') {
        i.itemType = 'jewelry';
      } else if (i.slot === 'oneHand' || i.slot === 'twoHands') {
        i.itemType = 'weapons';
      } else {
        i.itemType = 'armor';
      }
    });
  });
}

const addSetName = () => {
  setsList.forEach(s => {
    s.items.list.forEach(i => {
      i.setName = s.name;
    });
  });
}

const itemNameArmorMap = {
  "head_heavy": "Helm",
  "head_medium": "Helmet",
  "head_light": "Hat",
  "shoulders_heavy": "Pauldron",
  "shoulders_medium": "Arm Cops",
  "shoulders_light": "Epaulets",
  "hands_heavy": "Gauntlets",
  "hands_medium": "Bracers",
  "hands_light": "Gloves",
  "chest_heavy": "Cuirass",
  "chest_medium": "Jack",
  "chest_light": "Robe",
  "legs_heavy": "Greaves",
  "legs_medium": "Guards",
  "legs_light": "Breeches",
  "feet_heavy": "Sabatons",
  "feet_medium": "Boots",
  "feet_light": "Shoes",
  "waist_heavy": "Girdle",
  "waist_medium": "Belt",
  "waist_light": "Sash"
}
const itemNameWeaponMap = ['Battle Axe', 'Axe', 'Bow', 'Dagger', 'Mace', 'Sword', 'Greatsword', 'Maul'];
const itemNameStaffMap = ['Restoration', 'Inferno', 'Ice', 'Lightning'];
const itemNameJewelryMap = {
  'neck': 'Necklace',
  'ring': 'Ring'
};
const updateItemNames = (setName, prefix, suffix) => {
  let staffIndex = 0;
  setsList.find(s => s.name === setName)
    .items.list.forEach(item => {
      if (item.armorType) {
        item.name = `${prefix} ${itemNameArmorMap[`${item.slot}_${item.armorType}`]} ${suffix}`.trim();
        console.log(item.name);
        return;
      }
      if (item.slot === 'ring' || item.slot === 'neck') {
        item.name = `${prefix} ${itemNameJewelryMap[item.slot]} ${suffix}`.trim();
        console.log(item.name);
        return;
      }
      if (item.slot === 'offHand') {
        item.name = `${prefix} Shield ${suffix}`.trim();
        console.log(item.name);
        return;
      }
      if (item.name.includes('Staff')) {
        item.name = `${prefix} ${itemNameStaffMap[staffIndex++]} Staff ${suffix}`.trim();
        console.log(item.name);
        return;
      }
      for (let j=0; j < itemNameWeaponMap.length; j++) {
        const w = itemNameWeaponMap[j];
        if (item.name.includes(w)) {
          item.name = `${prefix} ${w} ${suffix}`.trim();
          console.log(item.name);
          return;
        }
      }
  });
}


/**
 * Calculate a 32 bit FNV-1a hash
 * Found here: https://gist.github.com/vaiorabbit/5657561
 * Ref.: http://isthe.com/chongo/tech/comp/fnv/
 *
 * @param {string} str the input value
 * @param {boolean} [asString=false] set to true to return the hash value as 
 *     8-digit hex string instead of an integer
 * @param {integer} [seed] optionally pass the hash of the previous chunk
 * @returns {integer | string}
 */
 function hashFnv32a(str, asString = false, seed = undefined) {
  /*jshint bitwise:false */
  var i, l,
      hval = (seed === undefined) ? 0x811c9dc5 : seed;

  for (i = 0, l = str.length; i < l; i++) {
      hval ^= str.charCodeAt(i);
      hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  if( asString ){
      // Convert to 8 digit hex string
      return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
  }
  return hval >>> 0;
}

const addIDs = () => {
  setsList.forEach(s => {
    s.id = hashFnv32a(s.name);
    s.items.list.forEach(i => {
      i.id = hashFnv32a(`${i.setName}_${i.name}`);
    });
  });
}

const addWeaponType = () => {
  setsList.forEach(s => {
    s.items.list.forEach(item => {
      if (item.itemType !== 'weapons') {
        return;
      }
      for (let j=0; j < itemNameWeaponMap.length; j++) {
        const w = itemNameWeaponMap[j];
        if (item.name.includes(w)) {
          if (w === 'Battle Axe') {
            item.weaponType = 'battleAxe';
            return;
          }

          item.weaponType = w.toLowerCase();
          return;
        }
      }
      for (let j=0; j < itemNameStaffMap.length; j++) {
        const w = `${itemNameStaffMap[j]} Staff`;
        if (item.name.includes(w)) {
          item.weaponType = `${itemNameStaffMap[j].toLowerCase()}Staff`;
          return;
        }
      }
    });
  });
}

const addSetBonusCount = () => {
  setsList.forEach(s => {
    if (s.bonuses['5']) {
      s.bonusCount = 5;
    } else if (s.bonuses['4']) {
      s.bonusCount = 4;
    } else if (s.bonuses['3']) {
      s.bonusCount = 3;
    } else if (s.bonuses['2']) {
      s.bonusCount = 2;
    } else if (s.bonuses['1']) {
      s.bonusCount = 1;
    }
    delete s.bonuses.count;
  });
}

const splitHtmlDescription = () => {
  const rgx = /\((\d) item[s]?\)/g;
  setsList.forEach(s => {
    const bonuses = s.htmlDescription.split('<br>');
    bonuses.forEach(b => {
      if (b === '') {
        return;
      }
      const match = rgx.exec(b);
      s.bonuses[match[1]].htmlDescription = b;
      rgx.lastIndex = 0;
    });
  });
}

const getSortOrderMap = () => {
  const sortOrderMap = new Map();
  sortOrderMap.set('head', 1);
  sortOrderMap.set('shoulders', 2);
  sortOrderMap.set('chest', 3);
  sortOrderMap.set('hands', 4);
  sortOrderMap.set('waist', 5);
  sortOrderMap.set('legs', 6);
  sortOrderMap.set('feet', 7);
  sortOrderMap.set('neck', 8);
  sortOrderMap.set('ring', 9);
  sortOrderMap.set('dagger', 10);
  sortOrderMap.set('axe', 11);
  sortOrderMap.set('mace', 12);
  sortOrderMap.set('sword', 13);
  sortOrderMap.set('battleAxe', 14);
  sortOrderMap.set('maul', 15);
  sortOrderMap.set('greatsword', 16);
  sortOrderMap.set('bow', 17);
  sortOrderMap.set('restorationStaff', 18);
  sortOrderMap.set('infernoStaff', 19);
  sortOrderMap.set('iceStaff', 20);
  sortOrderMap.set('lightningStaff', 21);
  sortOrderMap.set('shield', 22);
  return sortOrderMap;
}

const sortItems = () => {
  const sortOrderMap = getSortOrderMap();

  setsList.forEach(s => {
    s.items.list.sort((a, b) => {
      const aSortOrder = a.itemType === 'weapons' ? sortOrderMap.get(a.weaponType) : (a.slot === 'offHand' ?  sortOrderMap.get('shield') : sortOrderMap.get(a.slot));
      const bSortOrder = b.itemType === 'weapons' ? sortOrderMap.get(b.weaponType) : (b.slot === 'offHand' ?  sortOrderMap.get('shield') : sortOrderMap.get(b.slot));
      if (aSortOrder !== bSortOrder) {
        return aSortOrder - bSortOrder;
      }
      // same slot => light > medium > heavy
      switch (a.armorType) {
        case 'light':
          return -1;
        case 'medium':
          return b.armorType === 'light' ? 1 : -1;
        case 'heavy':
          return 1;
      }
    });
  });
}

const addItemRarity = () => {
  setsList.forEach(s => {
    s.items.list.forEach(i => {
      if (s.type === 'Mythic') {
        i.rarity = 'mythic';
      } else {
        i.rarity = 'legendary';
      }
    });
  });
}

const addShieldArmorType = () => {
  setsList.forEach(s => {
    s.items.list.forEach(i => {
      if (i.itemType === 'armor' && i.slot === 'offHand') {
        i.armorType = 'shield';
      }
    });
  });
}

const fixWeaponItemType = () => {
  setsList.forEach(s => {
    s.items.list.forEach(i => {
      if (i.itemType === 'weapons') {
        i.itemType = 'weapon';
      }
    });
  });
}

const addItemEnchantment = () => {
  setsList.forEach(s => {
    if (s.items.list[0].itemType !== 'armor') {
      console.log(`No armor set: ${s.name}`);
      return;
    }
    let setArmorType = s.items.list[0].armorType;
    // see if there are multiple armor types
    if (s.items.list.some(i => i.itemType === 'armor' && i.armorType !== setArmorType && i.armorType !== 'shield')) {
      // default jewelry and weapon to heavy stats
      setArmorType = 'heavy';
    }

    s.items.list.forEach(i => {
      if (i.itemType === 'armor') {
        switch (i.armorType) {
          case 'shield':
            i.enchantment = 'maximumStamina';
            return;
          case 'light':
            i.enchantment = 'maximumMagicka';
            return;
          case 'medium':
            delete i.enchantement;
            i.enchantment = 'maximumStamina';
            return;
          case 'heavy':
            i.enchantment = 'maximumHealth';
            return;
        }
      }
      if (i.itemType === 'jewelry') {
        switch (setArmorType) {
          case 'light':
            i.enchantment = 'magickaRecovery';
            return;
          case 'medium':
            i.enchantment = 'staminaRecovery';
            return;
          case 'heavy':
            i.enchantment = 'healthRecovery';
            return;
        }
      }
      // weapons
      switch (setArmorType) {
        case 'light':
          i.enchantment = 'absorbMagicka';
          return;
        case 'medium':
          i.enchantment = 'absorbStamina';
          return;
        case 'heavy':
          i.enchantment = 'lifeDrain';
          return;
      }
    });
  });
}

const validateData = () => {
  setsList.forEach(s => {
    if (s.type === 'Unknown') {
      console.log(`Unknown set: ${s.name}`);
      return;
    }
    s.items.list.forEach(i => {
      if (!i.enchantment) {
        console.error(`No enchantment - ${s.name} - ${i.name}`);
      }
    });
  });
}

const updateData = async () => {
  // fixImagePaths();  // DONE
  // fixHtmlDescription();  // DONE
  // extractItemInfo(); // DONE
  // fixMonsterSetArmorTpe(); // DONE
  // addItemType(); // DONE
  // addSetName(); // DONE
  // updateItemNames("Kagrenac's Hope", "", "of Kagrenac's Hope");  // ALL DONE
  // addIDs(); // DONE
  // addWeaponType(); // DONE
  // addSetBonusCount(); // DONE
  // splitHtmlDescription(); // DONE
  // sortItems(); // DONE
  // addItemRarity(); // DONE
  // addShieldArmorType(); // DONE
  // fixWeaponItemType(); // DONE
  addItemEnchantment(); // DONE

  validateData();

  // write to file
  const content = 'const ESO_SETS = ' +
    JSON.stringify(setsList, null, 2) + ';' +
    '\n' +
    'export default ESO_SETS;';
  try {
    await fs.writeFile(FILE_NAME, content);

    console.log(`Sets data written to ${FILE_NAME}`);
  } catch (err) {
    console.error(err);
  }
}

updateData();
