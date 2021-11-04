import { Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { EquipmentBuild, EquipmentSlot } from "../equipment/EquipmentBuild";

export interface GearSummaryProps {
  build: EquipmentBuild
}

export function GearSummary({ build }: GearSummaryProps) {
  return (
    <div>
      {
        Object.keys(EquipmentSlot).map(key => {
          const enumKey = key as EquipmentSlot;
          const item = build.items[enumKey];
          return (
            <Row key={enumKey}>
              <Col xs={4}>{EquipmentSlot[enumKey]}</Col>
              <Col xs={8}>{item?.name}</Col>
            </Row>
          );
        })
      } 

    </div>
  );
}
