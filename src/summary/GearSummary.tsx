import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

import { 
  EquipmentBuild,
  EquipmentSlot,
  Strings_EquipmentSlot
} from "../character/EquipmentBuild";
import { 
  EsoItemType,
  EsoItem,
  EsoSetType,
  Strings_EsoArmorType,
  Strings_EsoWeaponType
} from '../data/eso-sets';
import { getEsoSetByName } from '../data/esoSetDataLoader';
import { ItemSetTooltip, SimpleItemTooltip } from '../tooltips/Tooltips';

export interface GearSummaryProps {
  build: EquipmentBuild,
  showItem: boolean
}

const getItemTypeString = (item?: EsoItem): string => {
  if (!item) {
    return '';
  }

  switch (item.itemType) {
    case EsoItemType.armor:
      return item.armorType ? Strings_EsoArmorType[item.armorType] : '';

    case EsoItemType.weapon:
      return item.weaponType ? Strings_EsoWeaponType[item.weaponType] : '';

    default:
      return '';
  }
}

export function GearSummary({ build, showItem }: GearSummaryProps) {
  return (
    <Container className='GearSummary'>
      <Row className="row-table-header summary-table-header-row">
        <Col>Slot</Col>
        { showItem &&
          <Col>Item</Col>
        }
        <Col lg={3}>Set</Col>
        <Col>Type</Col>
        <Col>Trait</Col>
        <Col>Enchantment</Col>
      </Row>
      {
        Object.keys(EquipmentSlot).map(key => {
          const enumKey = key as EquipmentSlot;
          const item = build.items[enumKey];
          const set = item ? getEsoSetByName(item.setName) : undefined;

          const className = `align-items-center summary-table-row ${showItem ? 'cozy' : 'compact'}`;

          return (
            <Row key={enumKey} className={className}>
              <Col>{Strings_EquipmentSlot[EquipmentSlot[enumKey]]}</Col>
              { showItem &&
                <Col>
                  { item &&
                    <SimpleItemTooltip build={build} item={item}>
                      <img src={`../images/gear/${item.image}`} alt={item.name} />
                    </SimpleItemTooltip>
                  }
                </Col>
              }
              <Col lg={3}>
                {
                  set &&
                  <ItemSetTooltip set={set}>
                    <a target='_blank'rel='noreferrer' href={set.link}>
                      <span className={set.type === EsoSetType.mythic ? 'item-mythic' : 'item-legendary'}>{set.name}</span>
                    </a>
                  </ItemSetTooltip>
                }
              </Col>
              <Col>{getItemTypeString(item)}</Col>
              <Col></Col>
              <Col></Col>
            </Row>
          );
        })
      } 

    </Container>
  );
}
