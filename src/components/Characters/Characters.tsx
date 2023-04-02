import { useEffect, useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { loadCharacters } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { AboutBlurb } from '../About/About';
import MainColumn from '../MainColumn/MainColumn';
import CharacterItem from './CharacterItem';

function Characters() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadCharacters(dispatch);
  }, [dispatch]);
  const characters = useAppSelector((s) => s.characters);
  const [uiState, setUiState] = useState(() => {
    const storedUiState = localStorage.getItem('uiState');
    return storedUiState ? JSON.parse(storedUiState) : 'Normal';
  });

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

  const sortedCharacters = characters.slice().sort((a, b) => {
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
        <Col md={4}>
          <h6>
            <Link to={'/characters'}>Characters</Link>
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
          <div className="fw-bold text-end">Sort</div>
          <Dropdown className="text-end" onSelect={(e: string | null) => handleSort(e || '')}>
            <Dropdown.Toggle variant="primary" id="sort-dropdown">
              {sortStat || 'Select stat to sort'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {characters[0]?.character_stat.map((stat) => (
                <Dropdown.Item key={stat.stat.name} eventKey={stat.stat.name}>
                  {stat.stat.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
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
