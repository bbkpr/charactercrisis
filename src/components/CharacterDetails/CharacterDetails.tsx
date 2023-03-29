import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { Character } from '../../models/character';

import { loadCharacters } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { calculateScoreDifference } from '../../utils/utils';
import CharacterItem from '../Characters/CharacterItem';
import MainColumn from '../MainColumn/MainColumn';

function CharacterDetails() {
  const { character_id } = useParams();
  const dispatch = useAppDispatch();
  const characters = useAppSelector((s) => s.characters);

  const [similarCharacters, setSimilarCharacters] = useState<Character[]>([]);

  useEffect(() => {
    loadCharacters(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const findSimilarCharacters = () => {
      if (characters) {
        const target = characters.find((c) => c.id === parseInt(character_id));
        const similars = characters
          .filter((c) => c.game_id === target.game_id && c.id !== target.id)
          .map((c) => {
            const scoreDifference = calculateScoreDifference(c, target);
            const commonTags = c.character_tag.filter((t1) =>
              target.character_tag.some((t2) => t1.tag_id === t2.tag_id)
            );
            const adjustedScoreDifference = commonTags.reduce(
              (acc, _, idx) => Math.floor(acc * (1 - 0.2 * (idx + 1))),
              scoreDifference
            );
            console.log(
              `${c.name} score diff: ${adjustedScoreDifference} | common tags: (${commonTags.length}): ${commonTags
                .map((ct) => ct.tag.name)
                .join(', ')}`
            );
            return { ...c, scoreDifference: adjustedScoreDifference };
          })
          .sort((a, b) => a.scoreDifference - b.scoreDifference);
        setSimilarCharacters(similars);
      }
    };
    findSimilarCharacters();
  }, [character_id, characters]);

  const ch = characters.find((c) => c.id === Number(character_id));
  return (
    ch != null && (
      <MainColumn>
        <Helmet>
          <title>Character Crisis | {ch.name}</title>
        </Helmet>
        <Row>
          <Col>
            <h6>
              <Link to={'/characters'}>Characters</Link>
              {' > '}
              <Link to={`/characters/${ch?.id}`}>{ch?.name}</Link>
            </h6>
          </Col>
        </Row>
        <Row>
          <Col className="me-md-2 sticky-col">{ch && <CharacterItem key={ch.id} character={ch} />}</Col>
          <Col className="ms-md-2 scrollable-col">
            {similarCharacters.map((sc) => {
              return (
                sc && (
                  <CharacterItem
                    key={sc.id}
                    character={sc}
                    scoreDifference={(sc as Character & { scoreDifference: number }).scoreDifference}
                  />
                )
              );
            })}
          </Col>
        </Row>
      </MainColumn>
    )
  );
}

export default CharacterDetails;
