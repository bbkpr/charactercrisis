import { useEffect } from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { loadCharacters, loadStats } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { letterGrade, normalizeStatScore } from '../../utils/utils';
import MainColumn from '../MainColumn/MainColumn';
import { StatRadar } from '../StatRadar/StatRadar';

const gradeValue = (value: number) => {
  const grade = letterGrade(value);
  return <div className={`grade-${grade.toLocaleLowerCase()}`}>{grade}</div>;
};

function CharacterDetails() {
  const { character_id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadCharacters(dispatch);
    loadStats(dispatch);
  }, [dispatch]);
  const characters = useAppSelector((s) => s.characters);

  const char = characters.find((c) => c.id === Number(character_id));
  const statsData =
    char != null
      ? char.character_stat.map((s) => ({
          stat: s.stat.name,
          [char.name]: normalizeStatScore(s.value)
        }))
      : [];
  return (
    char != null && (
      <MainColumn>
        <h6>
          <Link to={'/characters'}>Characters</Link>
          {' > '} <Link to={`/games/${char.game_id}`}>{char.game.name}</Link>
          {` > ${char.name}`}
        </h6>
        <Row>
          <Col sm={6}>
            <Accordion
              className="stats-accordion"
              defaultActiveKey={char.character_stat.map((s) => s.stat.name)}
              alwaysOpen
            >
              {char.character_stat.map((cs) => (
                <Accordion.Item eventKey={cs.stat.name} key={cs.stat.name}>
                  <Accordion.Header>
                    {cs.stat.name}:&nbsp;{gradeValue(cs.value)}
                  </Accordion.Header>
                  <Accordion.Body>{cs.comments}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
          <Col>
            <div className="character-details-card">
              <h3 className="mb-1">{char.name}</h3>
              <h6 className="mb-1 text-light">
                <Link to={`/games/${char.game_id}`}>{char.game.name}</Link>
              </h6>
              <div className="mb-1">{char.description}</div>
              <div className="mb-0">
                <a href={char.reference_link} target="_blank" rel="noreferrer">
                  Wiki
                </a>
              </div>
              {char.character_stat.length ? (
                <div className="radar-wrap mt-2">
                  <StatRadar character_name={char.name} data={statsData} />
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </MainColumn>
    )
  );
}

export default CharacterDetails;
