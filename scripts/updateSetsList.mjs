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
    s.htmlDescription = s.htmlDescription.replace('<strong', '<span').replace('strong>', 'span>');
    // remove <a> tags
    s.htmlDescription = s.htmlDescription.replace('</a>', '').replace(/<a[^>]*>/g, '');
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
      type: 'heavy',
      rgx: [ 'pauldrons', 'sabatons', 'gauntlets', 'helm', 'cuirass', 'greaves', 'girdle' ]
    },
    {
      type: 'medium',
      rgx: [ 'arm cops', 'belt', 'helmet', 'bracers', 'boots', 'guards', 'jack' ]
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

const updateData = async () => {
  // fixImagePaths();  // DONE
  // fixHtmlDescription();  // DONE
  // extractItemInfo(); // DONE
  // fixMonsterSetArmorTpe(); // DONE
  // addItemType(); // DONE
  addSetName();

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
