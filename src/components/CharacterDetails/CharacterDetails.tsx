import { createRef, useEffect, useState } from 'react';
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
  const [uiState, setUiState] = useState(() => {
    const storedUiState = localStorage.getItem('uiState');
    return storedUiState ? JSON.parse(storedUiState) : 'Normal';
  });

  const scrollTopCharacterRef = createRef<HTMLDivElement>();
  const scrollTopSimilarRef = createRef<HTMLDivElement>();

  const handleGameSelection = (gameId: number) => {
    setSelectedGameId(gameId);
  };

  useEffect(() => {
    loadCharacters(dispatch).then((lc) =>
      setSelectedGameId(lc.payload.data.find((c) => c.id === Number(character_id))?.game_id ?? 0)
    );
    loadGames(dispatch);
  }, [character_id, dispatch]);

  useEffect(() => {
    scrollTopCharacterRef.current?.scrollIntoView({ behavior: 'auto' });
    scrollTopSimilarRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [character_id, scrollTopCharacterRef, scrollTopSimilarRef]);

  useEffect(() => {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card) => {
      card.classList.remove('animate');
    });

    setTimeout(() => {
      statCards.forEach((card) => {
        card.classList.add('animate');
      });
    }, 100);
  }, [uiState]);

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
      <MainColumn
        className={`character-details ${uiState === 'Small' ? 'small-ui' : uiState === 'Compact' ? 'compact-ui' : ''}`}
      >
        <Helmet>
          <title>Character Crisis | {ch.name}</title>
        </Helmet>
        <Row className="mb-2">
          <Col md={4}>
            <h6>
              <Link to={'/characters'}>Characters</Link>
              {' > '}
              <Link to={`/games/${ch?.game?.id}`}>{ch?.game?.name}</Link>
              {' > '}
              <Link to={`/characters/${ch?.id}`}>{ch?.name}</Link>
            </h6>
          </Col>
          <Col md={4}>
            <div className="fw-bold text-center">View</div>
            <div className="text-center">
              <div className="btn-group text-end" role="group">
                <button
                  className={`btn btn-primary ${uiState === 'Normal' ? 'active' : ''}`}
                  onClick={() => setUiState('Normal')}
                >
                  Normal
                </button>
                <button
                  className={`btn btn-primary ${uiState === 'Small' ? 'active' : ''}`}
                  onClick={() => setUiState('Small')}
                >
                  Small
                </button>
                <button
                  className={`btn btn-primary ${uiState === 'Compact' ? 'active' : ''}`}
                  onClick={() => setUiState('Compact')}
                >
                  Compact
                </button>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="fw-bold text-end">Select a Game to compare</div>
            <Dropdown className="text-end" onSelect={(v) => handleGameSelection(parseInt(v))}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {games.find((g) => g.id === selectedGameId)?.name ?? 'All Games'}
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
          <Col className="me-md-2 sticky-col" id="character-details-selected">
            <div ref={scrollTopCharacterRef}></div>
            <h6>
              {ch.game.name} {'>'} {ch.name}
            </h6>
            {ch && <CharacterItem key={ch.id} character={ch} isComparing />}
          </Col>
          <Col className="ms-md-2 scrollable-col" id="character-details-similar">
            <div ref={scrollTopSimilarRef}></div>
            <h6>
              Most similar characters to {ch.name} in {games.find((g) => g.id === selectedGameId)?.name ?? 'All Games'}
            </h6>
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
