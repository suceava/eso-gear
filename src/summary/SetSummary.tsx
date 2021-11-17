import { Col, Container, Row } from 'react-bootstrap';

import { EquipmentBuild } from "../character/EquipmentBuild";
import {
  EsoSetBonus,
  EsoSetBonusKey,
  EsoSetType
} from '../data/eso-sets';
import { ItemSetTooltip } from '../tooltips/Tooltips';

export interface SetSummaryProps {
  build: EquipmentBuild;
}

export function SetSummary({ build }: SetSummaryProps) {
  const setsMap = build.getSets();
  const sets = Array.from(setsMap.keys()).sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <Container className='SetSummary'>
      <Row className="row-table-header summary-table-header-row">
        <Col lg={2}>Set</Col>
        <Col lg={5}>Bonuses</Col>
        <Col>Type</Col>
        <Col>Location</Col>
        <Col>DLC</Col>
      </Row>
      {
        sets.map(set => (
          <Row key={set.name} className='summary-table-row compact'>
            <Col lg={2}>
              <ItemSetTooltip set={set}>
                <a target='_blank'rel='noreferrer' href={set.link}>
                  <span className={set.type === EsoSetType.mythic ? 'item-mythic' : 'item-legendary'}>{set.name}</span>
                </a>
              </ItemSetTooltip>
              <div className='set-summary-bonus-count'>({Math.min(setsMap.get(set) || 0, set.bonusCount)}/{set.bonusCount})</div>
            </Col>
            <Col lg={5}>
              {
                Object.keys(set.bonuses).map(key => {
                  const bonusKey = key as EsoSetBonusKey;
                  const bonus = set.bonuses[bonusKey] as EsoSetBonus;
                  if (!bonus || parseInt(key) > (setsMap.get(set) || 0)) {
                    return null;
                  }
                  return (
                    <div key={key} dangerouslySetInnerHTML={{ __html: bonus.htmlDescription }}></div>
                  );
                })
              }
            </Col>
            <Col>{set.type}</Col>
            <Col>
              {
                set.location && set.location.map(location => (
                  <span key={location.name}>
                    <a target='_blank'rel='noreferrer' href={location.link}>{location.name}</a>
                    <br />
                  </span>
                ))
              }
            </Col>
            <Col>{set.dlc}</Col>
          </Row>
        ))
      }
    </Container>
  );
}
