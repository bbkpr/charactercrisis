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
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [uiState, setUiState] = useState(() => {
    const storedUiState = localStorage.getItem('uiState');
    return storedUiState ? JSON.parse(storedUiState) : 'Normal';
  });

  const scrollTopCharacterRef = createRef<HTMLDivElement>();
  const scrollTopSimilarRef = createRef<HTMLDivElement>();

  useEffect(() => {
    loadCharacters(dispatch).then((lc) => {
      if (selectedGameId !== null) {
        setSelectedGameId(lc.payload.data.find((c) => c.id === Number(character_id))?.game_id ?? 0);
      }
    });
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
          .filter((c) => c.id !== target.id && (selectedGameId ? c.game_id === selectedGameId : true))
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
        <Row>
          <Col>
            <h6>
              <Link to={'/characters'}>Characters</Link>
              {' > '}
              <Link to={`/games/${ch?.game?.id}`}>{ch?.game?.name}</Link>
              {' > '}
              <Link to={`/characters/${ch?.id}`}>{ch?.name}</Link>
            </h6>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm={6} className="d-flex flex-column align-items-start mt-1 mt-sm-0">
            <div className="fw-bold ms-1">View</div>
            <div className="btn-group" role="group">
              <button
                className={`btn btn-secondary ${uiState === 'Normal' ? 'active' : ''}`}
                onClick={() => setUiState('Normal')}
              >
                Normal
              </button>
              <button
                className={`btn btn-secondary ${uiState === 'Small' ? 'active' : ''}`}
                onClick={() => setUiState('Small')}
              >
                Small
              </button>
              <button
                className={`btn btn-secondary ${uiState === 'Compact' ? 'active' : ''}`}
                onClick={() => setUiState('Compact')}
              >
                Compact
              </button>
            </div>
          </Col>
          <Col sm={6} className="sort-filter-wrap d-flex justify-content-sm-end">
            <div className="sort-filter-item d-flex flex-column align-items-end">
              <div className="fw-bold me-1">Filter by Game</div>
              <Dropdown className="text-end" onSelect={(e: string | null) => setSelectedGameId(e ? parseInt(e) : null)}>
                <Dropdown.Toggle variant="secondary" id="filter-dropdown">
                  {selectedGameId ? games.find((game) => game.id === selectedGameId)?.name || 'All Games' : 'All Games'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item key={'All Games'} eventKey={null}>
                    All Games
                  </Dropdown.Item>
                  {games
                    .filter((g) => g.character.length > 0)
                    .map((game) => (
                      <Dropdown.Item key={game.name} eventKey={game.id.toString()}>
                        {game.name}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
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
