import { useEffect, useMemo, useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { loadCharacters } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import MainColumn from '../MainColumn/MainColumn';
import StatBarChart from '../Characters/StatBarChart';

function CharacterCharts() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadCharacters(dispatch);
  }, [dispatch]);
  const characters = useAppSelector((s) => s.characters);
  const [sortStat, setSortStat] = useState<string | null>(null);
  const [uiState, setUiState] = useState(() => {
    const storedUiState = localStorage.getItem('uiState');
    return storedUiState ? JSON.parse(storedUiState) : 'Normal';
  });

  const sortedCharacters = useMemo(() => {
    if (!sortStat) {
      return characters;
    }
    return [...characters].sort((a, b) => {
      const aValue = a.character_stat.find((s) => s.stat.name === sortStat)?.value || 0;
      const bValue = b.character_stat.find((s) => s.stat.name === sortStat)?.value || 0;
      return bValue - aValue;
    });
  }, [characters, sortStat]);

  const handleSort = (stat: string) => {
    setSortStat(stat);
  };

  useEffect(() => {
    localStorage.setItem('uiState', JSON.stringify(uiState));
  }, [uiState]);

  return (
    <MainColumn className={`${uiState === 'Small' ? 'small-ui' : uiState === 'Compact' ? 'compact-ui' : ''}`}>
      <Helmet>
        <title>Character Crisis | Character Stat Charts</title>
      </Helmet>
      <Row>
        <Col>This page shows Character Stats sorted by value, high to low.</Col>
      </Row>
      <Row>
        <Col md={4}>
          <h6>
            <Link to={'/characters'}>Characters</Link>
          </h6>
          <div className="fw-bold text-start">Click any Character to compare them to others!</div>
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
        </Col>
      </Row>
      <Row>
        <Col className="character-chart">
          <StatBarChart sortedCharacters={sortedCharacters} />
        </Col>
      </Row>
    </MainColumn>
  );
}

export default CharacterCharts;
