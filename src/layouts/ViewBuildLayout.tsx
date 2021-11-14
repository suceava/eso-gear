import { Container } from 'react-bootstrap';

import { EquipmentBuild } from '../character/EquipmentBuild';
import { Summary } from '../summary/Summary';

import './Layout.css';

export function ViewBuildLayout() {
  let build;
  if (window.location.hash) {
    build = EquipmentBuild.fromHash(window.location.hash.replace('#', ''));
  } else {
    build = new EquipmentBuild();
  }

  return (
    <Container className='ViewBuildLayout'>
      <Summary build={build} layout='view'></Summary>
    </Container>
  );
}
