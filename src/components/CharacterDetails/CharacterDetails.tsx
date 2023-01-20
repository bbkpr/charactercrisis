import { useEffect } from 'react';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { loadCharacters, loadStats } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import MainColumn from '../MainColumn/MainColumn';
import { StatRadar } from '../StatRadar/StatRadar';

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
          [char.name]: s.value
        }))
      : [];
  return (
    char != null && (
      <MainColumn>
        <h5>
          <Link to={'/characters'}>Characters</Link>
          {' > '} <Link to={`/games/${char.game_id}`}>{char.game.name}</Link>
          {` > ${char.name}`}
        </h5>
        <Row>
          <Col sm={4}>
            <Accordion
              className="stats-accordion"
              defaultActiveKey={char.character_stat.map((s) => s.stat.name)}
              alwaysOpen
            >
              {char.character_stat.map((cs) => (
                <Accordion.Item eventKey={cs.stat.name} key={cs.stat.name}>
                  <Accordion.Header>
                    {cs.stat.name}: {cs.value}
                  </Accordion.Header>
                  <Accordion.Body>{cs.comments}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{char.name}</Card.Title>
                <Card.Subtitle className="mb-1 text-light">{char.game.name}</Card.Subtitle>
                <Card.Text className="mb-1">
                  <div>{char.description}</div>
                  <div className="mt-1 text-sm">
                    Description from{' '}
                    <a href="https://wiki.gbl.gg/" target="_blank" rel="noreferrer">
                      Mizuumi
                    </a>
                  </div>
                </Card.Text>
                <Card.Link href={char.reference_link} target="_blank" rel="noreferrer">
                  Wiki
                </Card.Link>
              </Card.Body>
            </Card>
            {char.character_stat.length ? (
              <div className="radar-wrap">
                <StatRadar character_name={char.name} data={statsData} />
              </div>
            ) : null}
          </Col>
        </Row>
      </MainColumn>
    )
  );
}

export default CharacterDetails;
