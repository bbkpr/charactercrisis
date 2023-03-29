import { Col, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Character } from '../../models/character';

import { getPublicImageUrl } from '../../services/images.service';
import { letterGrade, normalizeStatScore } from '../../utils/utils';
import { StatRadar } from '../StatRadar/StatRadar';

const gradeValue = (value: number) => {
  const grade = letterGrade(value);
  return <div className={`grade-${grade.toLocaleLowerCase()}`}>{grade}</div>;
};

export interface ICharacterItemProps {
  character: Character;
  scoreDifference?: number;
}

function CharacterItem({ character, scoreDifference }: ICharacterItemProps) {
  const mainImage = character.character_image.find((i) => i.image_type === 'main')?.image;
  const statsData =
    character != null
      ? character.character_stat.map((s) => ({
          stat: s.stat.name,
          [character.name]: normalizeStatScore(s.value)
        }))
      : [];
  return (
    <Row key={character.id} className="my-4 px-2 py-2 character-row">
      <Col sm="4" md="3" className="text-center">
        <>
          <div>
            <Link to={`/characters/${character.id}`} className="fs-5 fw-bold">
              {character.name}
            </Link>
            &nbsp;{' '}
            <span className="fs-6">
              (
              <a href={character.reference_link} target="_blank" rel="noreferrer">
                wiki
              </a>
              )
            </span>
          </div>
          <Link className="fs-6" to={`/games/${character.game_id}`}>
            <div>{character.game.name}</div>
          </Link>
          {mainImage && (
            <div className="mt-2 mx-auto img-fluid-wrap-md">
              <Image fluid src={getPublicImageUrl(mainImage.path)} alt={mainImage.description} />
            </div>
          )}
          <div className="mt-2">{character.description}</div>
          <div className="character-tags clearfix mt-2">
            {character.character_tag.map((ct) => (
              <OverlayTrigger
                key={ct.tag_id}
                placement="top"
                overlay={<Tooltip id={`tooltip-top-${ct.character_id}-${ct.tag_id}`}>{ct.tag.description}</Tooltip>}
              >
                <div className="character-tag float-start">{ct.tag.name}</div>
              </OverlayTrigger>
            ))}
          </div>
          {character.character_stat.length ? (
            <div className="radar-wrap mx-auto mt-2">
              <StatRadar character_name={character.name} data={statsData} />
            </div>
          ) : null}
          {scoreDifference && <div className="mt-2">Score Difference: {scoreDifference}</div>}
        </>
      </Col>
      <Col sm="8" md="9">
        <Row className="justify-content-around">
          {character.character_stat.map((cs, idx) => (
            <Col md={idx < 3 || idx > 6 ? (scoreDifference ? 6 : 4) : scoreDifference ? 4 : 3} key={cs.stat_id}>
              <div className="stat-block text-center py-2 px-2 my-2">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={`tooltip-top-${cs.character_id}-${cs.stat_id}`}>{cs.stat.description}</Tooltip>}
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
}

export default CharacterItem;
