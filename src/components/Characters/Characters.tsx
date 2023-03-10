import { useEffect } from 'react';
import { Col, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { loadCharacters, loadStats } from '../../services/characters.service';
import { getPublicImageUrl } from '../../services/images.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { letterGrade, normalizeStatScore } from '../../utils/utils';
import { AboutBlurb } from '../About/About';
import MainColumn from '../MainColumn/MainColumn';
import { StatRadar } from '../StatRadar/StatRadar';

const gradeValue = (value: number) => {
  const grade = letterGrade(value);
  return <div className={`fw-bold fs-3 grade grade-${grade.toLocaleLowerCase()}`}>{grade}</div>;
};

function Characters() {
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
          <AboutBlurb />
          <h6>
            <Link to={'/characters'}>Characters</Link>
          </h6>
          {characters.map((ch) => {
            const statsData = ch.character_stat.map((s) => ({
              stat: s.stat.name.split(' ')[0],
              [ch.name]: normalizeStatScore(s.value)
            }));
            const mainImage = ch.character_image.find((i) => i.image_type === 'main')?.image;

            return (
              <Row key={ch.id} className="my-4 px-2 py-2 character-row">
                <Col sm="4" md="3" className="text-center">
                  <>
                    <div>
                      <Link to={`/characters/${ch.id}`} className="fs-5 fw-bold">
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
                      <div>{ch.game.name}</div>
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
                    <div className="character-tags">
                      {ch.character_tag.map((ct) => (
                        <OverlayTrigger
                          key={ct.tag_id}
                          placement="top"
                          overlay={<Tooltip id={`tooltip-top`}>{ct.tag.description}</Tooltip>}
                        >
                          <div className="character-tag float-start">{ct.tag.name}</div>
                        </OverlayTrigger>
                      ))}
                    </div>
                  </>
                </Col>
                <Col sm="8" md="9">
                  <Row className="justify-content-around">
                    {ch.character_stat.map((cs, idx) => (
                      <Col xs="6" md={idx < 3 || idx > 6 ? 4 : 3} key={cs.stat_id}>
                        <div className="stat-block text-center py-2 px-2 my-2">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id={`tooltip-top`}>{cs.stat.description}</Tooltip>}
                          >
                            <h6 className="fw-bold fs-6">{cs.stat.name}</h6>
                          </OverlayTrigger>
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

export default Characters;
