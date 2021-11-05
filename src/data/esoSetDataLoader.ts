import { EsoSet } from '../data/eso-sets';
// json data
import setsData from '../data/eso-sets.json';

let ESO_SETS: EsoSet[];
// contains a map of sets by name for quick lookup
const SETS_MAP: Map<string, EsoSet> = new Map<string, EsoSet>();

export const loadEsoSetData = (): EsoSet[] => {
  if (ESO_SETS) {
    return ESO_SETS;
  }

  // enforce typing
  ESO_SETS = setsData as EsoSet[];

  ESO_SETS.forEach(set => {
    SETS_MAP.set(set.name, set);
  });

  return ESO_SETS;
}

export const getEsoSetByName = (name: string): EsoSet | undefined => {
  return SETS_MAP.get(name);
}
