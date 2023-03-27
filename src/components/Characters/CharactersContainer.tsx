import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { loadCharacters } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { AboutBlurb } from '../About/About';
import MainColumn from '../MainColumn/MainColumn';
import CharacterList from './CharacterList';

function Characters() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadCharacters(dispatch);
  }, [dispatch]);
  const characters = useAppSelector((s) => s.characters);

  return (
    <MainColumn>
      <Helmet>
        <title>Character Crisis | Characters</title>
      </Helmet>
      <Row>
        <Col>
          <AboutBlurb />
          <h6>
            <Link to={'/characters'}>Characters</Link>
          </h6>
          <CharacterList characters={characters} />
        </Col>
      </Row>
    </MainColumn>
  );
}

export default Characters;
