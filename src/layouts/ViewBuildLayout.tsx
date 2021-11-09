import { Container } from 'react-bootstrap';

import { EquipmentBuild } from '../equipment/EquipmentBuild';
import { Summary } from '../summary/Summary';

import './Layout.css';

export function ViewBuildLayout() {
  let build;
  if (window.location.hash) {
    console.log('got hash', window.location.hash);
    build = EquipmentBuild.fromHash(window.location.hash);
  } else {
    build = new EquipmentBuild();
  }

  return (
    <Container className='ViewBuildLayout'>
      <Summary build={build} layout='view'></Summary>
    </Container>
  );
}
