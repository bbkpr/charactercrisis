import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
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
  const [uiState, setUiState] = useState('Normal');

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

  return (
    <MainColumn className={`${uiState === 'Small' ? 'small-ui' : uiState === 'Compact' ? 'compact-ui' : ''}`}>
      <Helmet>
        <title>Character Crisis | Characters</title>
      </Helmet>
      <Row>
        <Col>
          <AboutBlurb />
          <h6>
            <Link to={'/characters'}>Characters</Link>
          </h6>
        </Col>
      </Row>
      <Row>
        <Col className="text-end">
          <div className="btn-group" role="group">
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
        </Col>
      </Row>
      <Row>
        <Col>
          {characters.map((ch) => {
            return ch && <CharacterItem key={ch.id} character={ch} />;
          })}
        </Col>
      </Row>
    </MainColumn>
  );
}

export default Characters;
