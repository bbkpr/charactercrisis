import { Col, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Character } from '../../models/character';

import { getPublicImageUrl } from '../../services/images.service';
import { letterGrade, normalizeStatScore } from '../../utils/utils';
import { StatRadar } from '../StatRadar/StatRadar';
// import { useEffect } from 'react';
import React from 'react';

const gradeValue = (value: number) => {
  const grade = letterGrade(value);
  return <div className={`grade-${grade.toLocaleLowerCase()}`}>{grade}</div>;
};

export interface ICharacterItemProps {
  character: Character;
  isComparing?: boolean;
  relevance?: number;
  statDifference?: number;
}

function CharacterItem({ character, isComparing, relevance, statDifference }: ICharacterItemProps) {
  const mainImage = character.character_image.find((i) => i.image_type === 'main')?.image;
  const statsData =
    character != null
      ? character.character_stat.map((s) => ({
          stat: s.stat.name,
          [character.name]: normalizeStatScore(s.value)
        }))
      : [];

  // useEffect(() => {
  //   const statBlockValues = document.querySelectorAll('.stat-block-value');
  //   statBlockValues.forEach((statBlockValue) => {
  //     statBlockValue.addEventListener('transitionend', () => {
  //       statBlockValue.classList.remove('animating');
  //     });
  //   });

  //   return () => {
  //     statBlockValues.forEach((statBlockValue) => {
  //       statBlockValue.removeEventListener('transitionend', () => {
  //         statBlockValue.classList.remove('animating');
  //       });
  //     });
  //   };
  // }, []);
  return (
    <Row key={character.id} className="my-3 px-2 py-2 character-row">
      <Col xs="4" md="3" className="text-center">
        <>
          <div>
            <Link to={`/characters/${character.id}`} className="character-name">
              {character.name}
            </Link>
            &nbsp;{' '}
            <span className="character-reference-link">
              (
              <a href={character.reference_link} target="_blank" rel="noreferrer">
                wiki
              </a>
              )
            </span>
          </div>
          <Link className="character-game" to={`/games/${character.game_id}`}>
            <div>{character.game.name}</div>
          </Link>
          {mainImage && (
            <Link to={`/characters/${character.id}`} className="character-name">
              <div className="mt-2 mx-auto img-fluid-wrap-md character-image">
                <Image fluid src={getPublicImageUrl(mainImage.path)} alt={mainImage.description} />
              </div>
            </Link>
          )}
          <div className="mt-2 character-description">{character.description}</div>
          <div className="character-tags clearfix mt-2">
            {character.character_tag.map((ct) => (
              <OverlayTrigger
                trigger="click"
                key={ct.tag_id}
                placement="top"
                overlay={<Tooltip id={`tooltip-top-${ct.character_id}-${ct.tag_id}`}>{ct.tag.description}</Tooltip>}
              >
                <div className="character-tag float-start tooltip-cursor-help">{ct.tag.name}</div>
              </OverlayTrigger>
            ))}
          </div>
          {character.character_stat.length ? (
            <div className="radar-wrap mx-auto mt-2">
              <StatRadar character_name={character.name} data={statsData} />
            </div>
          ) : null}
          {relevance && <div className="mt-2">Relevance: {relevance}</div>}
          {statDifference && <div className="mt-2">Stat Difference: {relevance}</div>}
        </>
      </Col>
      <Col xs="8" md="9">
        <Row className="justify-content-around">
          {character.character_stat.map((cs, idx) => {
            return (
              <Col className="px-0" xs={6} md={isComparing ? 6 : idx < 3 || idx > 6 ? 4 : 3} key={cs.stat_id}>
                <div className="stat-block text-center">
                  <div className="stat-block-header-wrap d-flex">
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-top-${cs.character_id}-${cs.stat_id}`}>{cs.stat.description}</Tooltip>
                      }
                    >
                      <div className="stat-name tooltip-cursor-help">{cs.stat.name}</div>
                    </OverlayTrigger>
                    <div className="grade-value">{gradeValue(cs.value)}</div>
                  </div>
                  <div className={`stat-block-value`}>
                    <div>{cs.comments}</div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}

export default React.memo(CharacterItem);
