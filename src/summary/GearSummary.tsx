import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

import { 
  EsoItemType,
  EsoItem,
  armorTypeToString,
  weaponTypeToString
} from '../data/eso-sets';
import { getEsoSetByName } from '../data/esoSetDataLoader';
import { 
  EquipmentBuild,
  EquipmentSlot,
  equipmentSlotToString
} from "../equipment/EquipmentBuild";
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
      return armorTypeToString(item.armorType);

    case EsoItemType.weapons:
      return weaponTypeToString(item.weaponType);

    default:
      return '';
  }
}

export function GearSummary({ build, showItem }: GearSummaryProps) {
  return (
    <Container className='GearSummary'>
      <Row className="row-table-header gear-summary-table-header-row">
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

          const className = `align-items-center gear-summary-table-row ${showItem ? 'cozy' : 'compact'}`;

          return (
            <Row key={enumKey} className={className}>
              <Col>{equipmentSlotToString(EquipmentSlot[enumKey])}</Col>
              { showItem &&
                <Col>
                  { item &&
                    <SimpleItemTooltip item={item}>
                      <img src={`../images/gear/${item.image}`} alt={item.name} />
                    </SimpleItemTooltip>
                  }
                </Col>
              }
              <Col lg={3}>
                {
                  set &&
                  <ItemSetTooltip set={set}>
                    <a target='_blank'rel='noreferrer' href={set.link} className='item-legendary'>{set.name}</a>
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
