import { useEffect, useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { Character, CharacterWithScoreDifference } from '../../models/character';

import { loadCharacters } from '../../services/characters.service';
import { loadGames } from '../../services/games.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { calculateScoreDifference } from '../../utils/utils';
import CharacterItem from '../Characters/CharacterItem';
import MainColumn from '../MainColumn/MainColumn';

function CharacterDetails() {
  const { character_id } = useParams();
  const dispatch = useAppDispatch();
  const characters = useAppSelector((s) => s.characters);
  const games = useAppSelector((s) => s.games);
  const ch = characters.find((c) => c.id === Number(character_id));

  const [similarCharacters, setSimilarCharacters] = useState<Character[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<number>(0);

  const handleGameSelection = (gameId: number) => {
    setSelectedGameId(gameId);
  };

  useEffect(() => {
    loadCharacters(dispatch).then((lc) =>
      setSelectedGameId(lc.payload.data.find((c) => c.id === Number(character_id))?.game_id ?? 0)
    );
    loadGames(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const findSimilarCharacters = () => {
      if (characters) {
        const target = characters.find((c) => c.id === parseInt(character_id));
        const similars = characters
          .filter((c) => c.id !== target.id && (selectedGameId !== 0 ? c.game_id === selectedGameId : true))
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
          .sort((a, b) =>
            a.scoreDifference !== 0 && b.scoreDifference !== 0
              ? a.scoreDifference - b.scoreDifference
              : a.scoreDifference === 0
              ? 1
              : -1
          );
        setSimilarCharacters(similars);
      }
    };
    findSimilarCharacters();
  }, [character_id, characters, selectedGameId]);

  return (
    ch != null && (
      <MainColumn>
        <Helmet>
          <title>Character Crisis | {ch.name}</title>
        </Helmet>
        <Row className="mb-2">
          <Col>
            <h6>
              <Link to={'/characters'}>Characters</Link>
              {' > '}
              <Link to={`/characters/${ch?.id}`}>{ch?.name}</Link>
            </h6>
          </Col>
          <Col className="text-end">
            <strong>Select a Game to compare</strong>
            <Dropdown onSelect={(v) => handleGameSelection(parseInt(v))}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {ch.game.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <>
                  <Dropdown.Item key="0" eventKey="0">
                    All Games
                  </Dropdown.Item>
                  {games.map((game) => (
                    <Dropdown.Item key={game.id} eventKey={game.id}>
                      {game.name}
                    </Dropdown.Item>
                  ))}
                </>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col className="me-md-2 sticky-col">
            <h4>{ch.name}</h4>
            {ch && <CharacterItem key={ch.id} character={ch} isComparing />}
          </Col>
          <Col className="ms-md-2 scrollable-col">
            <h4>
              Most similar characters to {ch.name} in {games.find((g) => g.id === selectedGameId)?.name ?? 'All Games'}
            </h4>
            {similarCharacters.map((sc) => {
              return (
                sc && (
                  <CharacterItem
                    key={sc.id}
                    character={sc}
                    isComparing
                    scoreDifference={(sc as CharacterWithScoreDifference).scoreDifference}
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
