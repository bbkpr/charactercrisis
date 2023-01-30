import { useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { loadCharacters, loadStats } from '../../services/characters.service';
import { getPublicImageUrl } from '../../services/images.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { letterGrade, normalizeStatScore } from '../../utils/utils';
import MainColumn from '../MainColumn/MainColumn';
import { StatRadar } from '../StatRadar/StatRadar';

const gradeValue = (value: number) => {
  const grade = letterGrade(value);
  return <div className={`grade-${grade.toLocaleLowerCase()}`}>{grade}</div>;
};

function CharactersResp() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadCharacters(dispatch);
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
          <h6>
            <Link to={'/characters'}>Characters</Link>
          </h6>
          {characters.map((ch) => {
            const statsData = ch.character_stat.map((s) => ({
              stat: s.stat.name,
              [ch.name]: normalizeStatScore(s.value)
            }));
            const mainImage = ch.character_image.find((i) => i.image_type === 'main')?.image;

            return (
              <Row key={ch.id} className="my-4 px-2 py-2 character-row">
                <Col sm="4" md="3" className="text-center">
                  <>
                    <div>
                      <Link to={`/characters/${ch.id}`} className="fs-5">
                        {ch.name}
                      </Link>
                      &nbsp;{' '}
                      <span className="fs-6">
                        (
                        <a href={ch.reference_link} target="_blank" rel="noreferrer">
                          wiki
                        </a>
                        )
                      </span>
                    </div>
                    <Link className="fs-6" to={`/games/${ch.game_id}`}>
                      {ch.game.abbreviation}
                    </Link>
                    {mainImage && (
                      <div className="mt-2 mx-auto img-fluid-wrap-md">
                        <Image fluid src={getPublicImageUrl(mainImage.path)} alt={mainImage.description} />
                      </div>
                    )}
                    <div>{ch.description}</div>
                    {ch && ch.character_stat.length ? (
                      <div className="radar-wrap mx-auto my-3">
                        <StatRadar character_name={ch.name} data={statsData} />
                      </div>
                    ) : null}
                  </>
                </Col>
                <Col sm="8" md="9">
                  <Row className="justify-content-around">
                    {ch.character_stat.map((cs, idx) => (
                      <Col xs="6" md={idx < 3 || idx > 6 ? 4 : 3}>
                        <div className="stat-block text-center py-2 px-2 my-2">
                          <h6>{cs.stat.name}</h6>
                          <h4>{gradeValue(cs.value)}</h4>
                          <div className="stat-block-value">
                            <div>{cs.comments}</div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </MainColumn>
  );
}

export default CharactersResp;
