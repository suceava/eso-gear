import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { EquipmentBuild, EquipmentSlot, equipmentSlotToString } from "../equipment/EquipmentBuild";

export interface GearSummaryProps {
  build: EquipmentBuild
}

export function GearSummary({ build }: GearSummaryProps) {
  return (
    <Container>
      <Row className="table-header">
        <Col xs={4}>Slot</Col>
        <Col xs={8}>Set</Col>
        <Col xs={4}>Type</Col>
      </Row>
      {
        Object.keys(EquipmentSlot).map(key => {
          const enumKey = key as EquipmentSlot;
          const item = build.items[enumKey];
          return (
            <Row key={enumKey}>
              <Col xs={4}>{equipmentSlotToString(EquipmentSlot[enumKey])}</Col>
              <Col xs={8}>{item?.setName}</Col>
              <Col xs={4}>{item?.armorType}</Col>
            </Row>
          );
        })
      } 

    </Container>
  );
}
