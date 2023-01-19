import { useEffect } from 'react';
import { Accordion, Col, Row, Table } from 'react-bootstrap';

import { loadCharacters, loadStats } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import MainColumn from '../MainColumn/MainColumn';
import { StatRadar } from '../StatRadar/StatRadar';

function Characters() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadCharacters(dispatch);
    loadStats(dispatch);
  }, [dispatch]);
  const characters = useAppSelector((s) => s.characters);
  const stats = useAppSelector((s) => s.stats);
  return (
    <MainColumn title={'Characters'}>
      <Table striped bordered hover className="stats-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stats</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((ch) => {
            const statsData = ch.character_stat.map((s) => ({
              stat: s.stat.name,
              [ch.name]: s.value
            }));
            return (
              <tr key={ch.id}>
                <td>
                  <a href={ch.reference_link} target="_blank">
                    {ch.name}
                  </a>
                </td>
                <td>
                  <Row>
                    <Col sm={5}>
                      <Accordion
                        className="stats-accordion"
                        defaultActiveKey={stats.length ? stats.map((s) => s.name) : []}
                        alwaysOpen
                      >
                        {ch.character_stat.map((cs) => (
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
    </MainColumn>
  );
}

export default Characters;
