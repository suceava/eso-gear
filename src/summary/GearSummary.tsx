import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

import { EquipmentBuild } from "../character/EquipmentBuild";
import { EquipmentSlot } from '../character/EquipmentBuildSlot';
import { 
  EsoItemType,
  EsoItem,
  EsoSetType
} from '../data/eso-sets';
import { getEsoSetByName } from '../data/esoSetDataLoader';
import { Strings_EsoItemEnchantment } from '../strings/enchantments';
import {
  Strings_EsoArmorType,
  Strings_EquipmentSlot,
  Strings_EsoWeaponType
} from '../strings/equipment';
import { ItemSetTooltip, EquipmentItemTooltip } from '../tooltips/Tooltips';

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
          const equipmentSlot = key as EquipmentSlot;
          const item = build.getEsoItem(equipmentSlot);
          const set = item ? getEsoSetByName(item.setName) : undefined;
          const className = `align-items-center summary-table-row ${showItem ? 'cozy' : 'compact'}`;

          return (
            <Row key={equipmentSlot} className={className}>
              <Col>{Strings_EquipmentSlot[EquipmentSlot[equipmentSlot]]}</Col>
              { showItem &&
                <Col>
                  { item &&
                    <EquipmentItemTooltip build={build} equipmentSlot={equipmentSlot}>
                      <img src={`../images/gear/${item.image}`} alt={item.name} />
                    </EquipmentItemTooltip>
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
              <Col>{item ? Strings_EsoItemEnchantment[item.enchantment] : ''}</Col>
            </Row>
          );
        })
      } 

    </Container>
  );
}
