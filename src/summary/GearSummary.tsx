import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

import { EsoArmorType, EsoItemType } from '../data/eso-sets';
import { getEsoSetByName } from '../data/esoSetDataLoader';
import { 
  EquipmentBuild,
  EquipmentBuildItem,
  EquipmentSlot,
  equipmentSlotToString
} from "../equipment/EquipmentBuild";
import { ItemSetTooltip, SimpleItemTooltip } from '../tooltips/Tooltips';

export interface GearSummaryProps {
  build: EquipmentBuild
}

const getItemTypeString = (item?: EquipmentBuildItem): string => {
  if (!item) {
    return '';
  }

  switch (item.itemType) {
    case EsoItemType.armor:
      switch (item.armorType) {
        case EsoArmorType.light:
          return 'Light';
        case EsoArmorType.medium:
          return 'Medium';
        case EsoArmorType.heavy:
          return 'Heavy';

        default:
          return '';
      }

    default:
      return '';
  }
}

export function GearSummary({ build }: GearSummaryProps) {
  return (
    <Container className='GearSummary'>
      <Row className="row-table-header">
        <Col>Slot</Col>
        <Col>Item</Col>
        <Col>Set</Col>
        <Col>Type</Col>
        <Col>Trait</Col>
        <Col>Enchantment</Col>
      </Row>
      {
        Object.keys(EquipmentSlot).map(key => {
          const enumKey = key as EquipmentSlot;
          const item = build.items[enumKey];
          const set = item ? getEsoSetByName(item.setName) : undefined;

          return (
            <Row key={enumKey}>
              <Col>{equipmentSlotToString(EquipmentSlot[enumKey])}</Col>
              <Col>
                {/* <SimpleItemTooltip item={item}> */}
                { item &&
                  <img src={`../images/gear/${item.image}`} alt={item.name} />
        }
                {/* </SimpleItemTooltip> */}
              </Col>
              <Col>
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
