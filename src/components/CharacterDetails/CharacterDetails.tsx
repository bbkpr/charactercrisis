import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';

import { loadCharacters } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import CharacterItem from '../Characters/CharacterItem';
import MainColumn from '../MainColumn/MainColumn';

function CharacterDetails() {
  const { character_id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadCharacters(dispatch);
  }, [dispatch]);
  const characters = useAppSelector((s) => s.characters);
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
          <Col>{ch && <CharacterItem key={ch.id} character={ch} />}</Col>
          <Col>
            {characters.map((ch) => {
              return ch && <CharacterItem key={ch.id} character={ch} />;
            })}
          </Col>
        </Row>
      </MainColumn>
    )
  );
}

export default CharacterDetails;
