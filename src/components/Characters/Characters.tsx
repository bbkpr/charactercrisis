import { useEffect, useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { loadCharacters } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { AboutBlurb } from '../About/About';
import MainColumn from '../MainColumn/MainColumn';
import CharacterItem from './CharacterItem';
import { loadGames } from '../../services/games.service';

function Characters() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadCharacters(dispatch);
    loadGames(dispatch);
  }, [dispatch]);
  const characters = useAppSelector((s) => s.characters);
  const games = useAppSelector((s) => s.games);
  const [uiState, setUiState] = useState(() => {
    const storedUiState = localStorage.getItem('uiState');
    return storedUiState ? JSON.parse(storedUiState) : 'Normal';
  });
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

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

  const [sortStat, setSortStat] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('uiState', JSON.stringify(uiState));
  }, [uiState]);

  const sortedCharacters = characters
    .filter((c) => (selectedGameId ? c.game_id === selectedGameId : true))
    .slice()
    .sort((a, b) => {
      if (!sortStat) return 0;

      const aStat = a.character_stat.find((stat) => stat.stat.name === sortStat);
      const bStat = b.character_stat.find((stat) => stat.stat.name === sortStat);

      if (!aStat || !bStat) return 0;

      return bStat.value - aStat.value;
    });

  const handleSort = (stat: string) => {
    setSortStat(stat);
  };

  return (
    <MainColumn className={`${uiState === 'Small' ? 'small-ui' : uiState === 'Compact' ? 'compact-ui' : ''}`}>
      <Helmet>
        <title>Character Crisis | Characters</title>
      </Helmet>
      <Row>
        <Col>
          <AboutBlurb />
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>
            <Link to={'/characters'}>Characters</Link>
          </h6>
          <div className="fw-bold ms-1">Click any Character to compare them to others!</div>
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
            <Dropdown onSelect={(e: string | null) => setSelectedGameId(e ? parseInt(e) : null)}>
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
          <div className="sort-filter-item d-flex flex-column align-items-end ms-2">
            <div className="fw-bold me-1">Sort</div>
            <Dropdown className="text-end" onSelect={(e: string | null) => handleSort(e || '')}>
              <Dropdown.Toggle variant="secondary" id="sort-dropdown">
                {sortStat || 'Name'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <>
                  <Dropdown.Item key={'Name'} eventKey={null}>
                    Name
                  </Dropdown.Item>
                  {characters[0]?.character_stat.map((stat) => (
                    <Dropdown.Item key={stat.stat.name} eventKey={stat.stat.name}>
                      {stat.stat.name}
                    </Dropdown.Item>
                  ))}
                </>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="character-list">
          {sortedCharacters.map((ch) => {
            return ch && <CharacterItem key={ch.id} character={ch} />;
          })}
        </Col>
      </Row>
    </MainColumn>
  );
}

export default Characters;
