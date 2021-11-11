import { Container, Row, Col } from 'react-bootstrap';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Equipment } from '../equipment/Equipment';
import { EquipmentBuild } from '../equipment/EquipmentBuild';
import { Inventory } from '../inventory/Inventory';
import { Summary } from '../summary/Summary';
import { useStickyState } from '../stickyState';

import './Layout.css';

export function CreateBuildLayout() {
  // buildObj will be deserialized as a plain object
  const [buildObj, setBuild] = useStickyState<EquipmentBuild>(new EquipmentBuild(), 'EquipmentBuild');
  // instantiate build from buildObj
  const build = EquipmentBuild.fromPlainBuild(buildObj);

  const buildOnChange = (newBuild: EquipmentBuild) => {
    setBuild(prevBuild => newBuild);
  };

  return (
    <div className="CreateBuildLayout">
      <DndProvider backend={HTML5Backend}>
        <Container>
          <Row className='justify-content-lg-center'>
            <Col lg={7}>
              <Equipment build={build} buildOnChange={buildOnChange}></Equipment>
            </Col>
            <Col lg={5}>
              <Inventory build={build}></Inventory>
            </Col>
            <Col lg={10}>
              <Summary build={build} layout='create'></Summary>
            </Col>
          </Row>
        </Container>
      </DndProvider>
    </div>
  );
}
