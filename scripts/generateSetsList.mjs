/*
 * Crawl website for initial list of sets
 *
 * Output file contains array of objects with following schema:
 * {
 *  image: string,
 *  name: string,
 *  type: enum,
 *  location: string,
 *  style: string,
 *  link: string,
 *  dlc: string,
 *  htmlDescription: string,
 *  bonuses: {
 *    "1": {
 *      description: string,
 *      stats: {
 *        armor: number | undefined,
 *        maximumHealth
 *        maximumMagicka
 *        maximumStamina
 *        healthRecovery
 *        magickaRecovery
 *        staminaRecovery
 *        spellDamage
 *        weaponDamage
 *        spellCritical
 *        weaponCritical
 *        criticalChance
 *        criticalResistance
 *        spellPenetration
 *        physicalPenetration
 *        offensivePenetration
 *        spellResistance
 *        physicalResistance
 *        healingDone
 *        healingTaken
 *      },
 *      buffs: []
 *    },
 *    "2": string | null,
 *    "3": string | null,
 *    "4": string | null,
 *    "5": string | null
 *  },
 *  items: {
 *    list: [],
 * 
 *    head: {
 *      light: string | null,
 *      medium: string | null,
 *      heavy: string | null
 *    },
 *    shoulders: {},
 *    hands: {},
 *    legs: {},
 *    chest: {},
 *    waist: {},
 *    feet: {},
 *    ring: {},
 *    neck: {},
 *    mainHand: {},
 *    offHand: {}
 *  }
 * }
 */

import fetch from 'cross-fetch';
import { promises as fs } from 'fs';
import { parse } from 'node-html-parser';

const FILE_NAME = 'eso-sets.mjs';

const STAT_REGEXES = [
  {
    stat: ['armor'],
    rgx: /([\d]*) Armor/g
  },
  {
    stat: ['maximumHealth'],
    rgx: /([\d]*) Maximum Health/g
  },
  {
    stat: ['maximumMagicka'],
    rgx: /([\d]*) Maximum Magicka/g
  },
  {
    stat: ['maximumStamina'],
    rgx: /([\d]*) Maximum Stamina/g
  },
  {
    stat: ['healthRecovery'],
    rgx: /([\d]*) Health Recovery/g
  },
  {
    stat: ['magickaRecovery'],
    rgx: /([\d]*) Magicka Recovery/g
  },
  {
    stat: ['staminaRecovery'],
    rgx: /([\d]*) Stamina Recovery/g
  },
  {
    stat: ['spellDamage'],
    rgx: /([\d]*) Spell Damage/g
  },
  {
    stat: ['weaponDamage'],
    rgx: /([\d]*) Weapon Damage/g
  },
  {
    stat: ['spellCritical'],
    rgx: /([\d]*) Spell Critical/g
  },
  {
    stat: ['weaponCritical'],
    rgx: /([\d]*) Weapon Critical/g
  },
  {
    stat: ['criticalChance'],
    rgx: /([\d]*) Critical Chance/g
  },
  {
    stat: ['criticalResistance'],
    rgx: /([\d]*) Critical Resistance/g
  },
  {
    stat: ['spellPenetration'],
    rgx: /([\d]*) Spell Penetration/g
  },
  {
    stat: ['physicalPenetration'],
    rgx: /([\d]*) Physical Penetration/g
  },
  {
    stat: ['offensivePenetration'],
    rgx: /([\d]*) Offensive Penetration/g
  },
  {
    stat: ['spellResistance'],
    rgx: /([\d]*) Spell Resistance/g
  },
  {
    stat: ['physicalResistance'],
    rgx: /([\d]*) Physical Resistance/g
  },
  {
    stat: ['healingDone'],
    rgx: /([\d]*)% Healing Done/g
  },
  {
    stat: ['healingTaken'],
    rgx: /([\d]*)% Healing Taken/g
  },
  {
    stat: ['weaponDamage', 'spellDamage'],
    rgx: /([\d]*) Weapon and Spell Damage/g
  },
  {
    stat: ['spellResistance', 'physicalResistance'],
    rgx: /Physical and Spell Resistance by ([\d]*)/g
  }
];
const BUFF_REGEXES = [
  /Minor [\w]*/g,
  /Major [\w]*/g,
  /Empower/g,
  /Reave/g,
  /Stagger/g
];


const parseSetImage = (node) => {
  const imgTag = node.querySelector('picture img');
  return {
    image: imgTag.attributes.src.replace('/storage', '')
  };
}
const parseSetName = (node) => {
  const aTag = node.querySelector('a');
  const smallTag = node.querySelector('small');
  return {
    name: aTag.text.trim(),
    type: smallTag.text.trim(),
    link: aTag.attributes.href
  };
}
const parseBonusStats = (desc) => {
  const bonuses = {};
  STAT_REGEXES.forEach(r => {
    const match = r.rgx.exec(desc);
    if (match) {
      if (!bonuses.stats) {
        bonuses.stats = {};
      }
      const val = parseInt(match[1]);
      if (val) {
        r.stat.forEach(s => {
          bonuses.stats[s] = val;
        });
      }
    }
    // reset regex
    r.rgx.lastIndex = 0;
  });

  BUFF_REGEXES.forEach(r => {
    const match = r.exec(desc);
    if (match) {
      if (!bonuses.buffs) {
        bonuses.buffs = [];
      }
      bonuses.buffs.push(match[0]);
    }
    // reset regex
    r.lastIndex = 0;
  });

  return bonuses;
}
const parseSetBonuses = (node) => {
  const txt = node.structuredText;
  const rgx = /\((\d) item[s]?\) ([^\n]*)/g;

  const bonuses = {};
  let matches;
  while ((matches = rgx.exec(txt)) !== null) {
    bonuses[matches[1]] = {
      description: matches[2],
      ...parseBonusStats(matches[2])
    }
  }

  return {
    htmlDescription: node.innerHTML,
    bonuses
  };
}

const regexMatch = (txt, rgx) => {
  const match = rgx.exec(txt);
  return match ? match[1].trim() : null;
}
const parseLocation = (div) => {
  /*
   * find 
   *  <strong>Location:</strong>
   *  <ul></ul>
   */
  let ulLocation;
  for (let i = 0; i < div.childNodes.length; i++) {
    const n = div.childNodes[i];
    if (n.rawTagName === 'strong' && n.text === 'Location:') {
      ulLocation = n.nextSibling;
      break;
    }
  }
  let location;
  if (ulLocation) {
    location = [];
    ulLocation.childNodes.forEach(n => {
      const aTag = n.querySelector('a');
      location.push({
        name: aTag.text.trim(),
        link: aTag.attributes.href
      });
    });
  }

  return location;
}
const parseItems = (div) => {
  const head = ['hat'];

  /*
   * find the <picture> tags
   *  <a href="">
   *    <picture></picture>
   *  </a>
   *  <a href="">
   *    <picture></picture>
   *  </a>
   *  <picture></picture>
   *  <a href="">
   *    <picture></picture>
   *  </a>
   */
  const itemList = [];
  let picTag = div.querySelector('picture');
  while (picTag) {
    // find the <img>
    const imgTag = picTag.querySelector('img');
    if (imgTag) {
      itemList.push({
        name: imgTag.attributes.title,
        image: imgTag.attributes.src.replace('/storage', '')
      })
    }

    const nextItem = picTag.parentNode.rawTagName === 'a' ? picTag.parentNode.nextSibling : picTag.nextSibling;
    if (!nextItem) {
      break;
    }
    if (nextItem.rawTagName === 'picture') {
      // jewelry items don't have wrapping <a> tag
      picTag = nextItem;
    } else if (nextItem.rawTagName === 'a' &&
      nextItem.childNodes &&
      nextItem.childNodes[0].rawTagName === 'picture') {
      picTag = nextItem.childNodes[0];
    } else {
      break;
    }
  }

  return {
    list: itemList
  };
}
const fetchSetInfo = async (setUrl) => {
  const response = await fetch(setUrl);
  if (response.status != 200) {
    console.error(`Response error: ${response.status}`);
    return null;
  }
  const htmlData = await response.text();
  // parse HTML and grab the div
  const root = parse(htmlData);
  const div = root.querySelector('#content .row div.col-md-8').removeWhitespace();
  const txt = div.structuredText;

  return {
    dlc: regexMatch(txt, /DLC Requirement:([^\n]*)/g),
    style: regexMatch(txt, /Style:([^\n]*)/g),
    location: parseLocation(div),
    items: parseItems(div)
  };
}

const fetchData = async () => {
  const response = await fetch('https://eso-hub.com/en/sets/all');
  if (response.status != 200) {
    console.error(`Response error: ${response.status}`);
    return;
  }
  const htmlData = await response.text();

  // parse HTML and grab the table
  const root = parse(htmlData);
  // <table id="searchable-table-sets" ...
  const tbl = root.querySelector('#searchable-table-sets').removeWhitespace();
  /*
   * <tr>
   *   <td> *image
   *   <td> *name & type
   *   <td> *set description
   * </tr>
   */
  const setsList = [];
  for (let i = 0; i < tbl.childNodes.length; i++) {
    const n = tbl.childNodes[i];
    const setNameInfo = parseSetName(n.childNodes[1]);
    console.info(`Parsing set ${setNameInfo.name} (${i + 1} of ${tbl.childNodes.length})`);
    const o = {
      ...parseSetImage(n.childNodes[0]),
      ...setNameInfo,
      ...parseSetBonuses(n.childNodes[2]),
      ...await fetchSetInfo(setNameInfo.link)
    }
    setsList.push(o);

    //if (i==0) break;
  }

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

fetchData();
