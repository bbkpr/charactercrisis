import { useEffect } from 'react';
import { Accordion, Col, Image, Row, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { loadCharacters, loadStats } from '../../services/characters.service';
import { getPublicImageUrl, loadImages } from '../../services/images.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { letterGrade, normalizeStatScore } from '../../utils/utils';
import { AboutBlurb } from '../About/About';
import MainColumn from '../MainColumn/MainColumn';
import { StatRadar } from '../StatRadar/StatRadar';

const gradeValue = (value: number) => {
  const grade = letterGrade(value);
  return <div className={`grade-${grade.toLocaleLowerCase()}`}>{grade}</div>;
};

function Characters() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadCharacters(dispatch);
    loadImages(dispatch);
    loadStats(dispatch);
  }, [dispatch]);
  const characters = useAppSelector((s) => s.characters);
  return (
    <MainColumn>
      <Helmet>
        <title>Character Crisis | Characters</title>
      </Helmet>
      <Row>
        <Col>
          <AboutBlurb />
          <h6>
            <Link to={'/characters'}>Characters</Link>
          </h6>
          <Table striped bordered hover className="stats-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Game</th>
                <th>Stats</th>
              </tr>
            </thead>
            <tbody>
              {characters.map((ch) => {
                const statsData = ch.character_stat.map((s) => ({
                  stat: s.stat.name,
                  [ch.name]: normalizeStatScore(s.value)
                }));
                const mainImage = ch.character_image.find((i) => i.image_type === 'main')?.image;

                return (
                  <tr key={ch.id}>
                    <td className="characters-name-column">
                      <>
                        <div>
                          <Link to={`/characters/${ch.id}`}>{ch.name}</Link>
                          &nbsp; (
                          <a href={ch.reference_link} target="_blank" rel="noreferrer">
                            wiki
                          </a>
                          )
                        </div>
                        {mainImage && (
                          <div className="mt-2 img-fluid-wrap-md">
                            <Image fluid src={getPublicImageUrl(mainImage.path)} alt={mainImage.description} />
                          </div>
                        )}
                      </>
                    </td>
                    <td className="characters-game-column">
                      <Link to={`/games/${ch.game_id}`}>{ch.game.name}</Link>
                    </td>
                    <td className="characters-stats-column">
                      <Row>
                        <Col sm={4}>
                          <Accordion
                            className="stats-accordion"
                            //defaultActiveKey={ch.character_stat.length ? ch.character_stat.map((s) => s.stat.name) : []}
                            alwaysOpen
                          >
                            {ch.character_stat.map((cs) => (
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
                          {ch && ch.character_stat.length ? (
                            <div className="radar-wrap">
                              <StatRadar character_name={ch.name} data={statsData} />
                            </div>
                          ) : null}
                        </Col>
                      </Row>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </MainColumn>
  );
}

export default Characters;
