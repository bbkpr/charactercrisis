import { useEffect } from 'react';
import { Accordion, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import { Character } from '../../models/character';

import { loadCharacters, loadStats } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import MainColumn from '../MainColumn/MainColumn';
import RtTable from '../RtTable/RtTable';
import { StatRadar } from '../StatRadar/StatRadar';

const charColumns: Column<Character>[] = [];
function Characters() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadCharacters(dispatch);
    loadStats(dispatch);
  }, [dispatch]);
  const characters = useAppSelector((s) => s.characters);
  return (
    <MainColumn>
      <Row>
        <Col>
          <h6>
            <Link to={'/characters'}>Characters</Link>
          </h6>
          <RtTable columns={charColumns} data={characters} />
        </Col>
      </Row>
    </MainColumn>
  );
}

export default Characters;
