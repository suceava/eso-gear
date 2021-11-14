import { Container, Row, Col, Button } from 'react-bootstrap';

import { GearSummary } from './GearSummary';
import { SetSummary } from './SetSummary';
import { EquipmentBuild } from '../character/EquipmentBuild';

import './Summary.css';

export interface SummaryProps {
  build: EquipmentBuild;
  layout: string;
}

export function Summary({ build, layout }: SummaryProps) {
  const shareUrl = `${window.location.origin}/build?#${build.toHash()}`;

  const onCopyLinkClick = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className='Summary window'>
      {
        layout === 'create' &&
        <Container>
          <Row>
            <Col>
              <h1>SUMMARY</h1>
            </Col>
            <Col className='summary-share-cell'>
              <div>
                <a target='_blank'rel='noreferrer' href={shareUrl}>Share your build</a>
              </div>
              <Button title='Copy link' onClick={onCopyLinkClick}></Button>
            </Col>
          </Row>
        </Container>
      }
      <hr/>
      <h2>{build.name}</h2>
      <GearSummary build={build} showItem={layout === 'view'} />
      <br/>
      <hr/>
      <br/>
      <SetSummary build={build} />
    </div>
  );
}
