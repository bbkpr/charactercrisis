import { ColDef, ValueGetterParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useEffect, useMemo, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Character } from '../../models/character';

import { loadCharacters, loadStats } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import MainColumn from '../MainColumn/MainColumn';

const initialColDefs: ColDef<Character>[] = [
  { field: 'name', pinned: 'left' },
  { field: 'description' },
  { field: 'game.name', headerName: 'Game' },
  {
    headerName: 'Rushdown',
    initialWidth: 110,
    valueGetter: (c: ValueGetterParams<Character>) => c.data.character_stat.find((cs) => cs.stat_id === 1)?.value
  },
  {
    headerName: 'Zoning',
    initialWidth: 110,
    valueGetter: (c: ValueGetterParams<Character>) => c.data.character_stat.find((cs) => cs.stat_id === 2)?.value
  },
  {
    headerName: 'Damage',
    initialWidth: 110,
    valueGetter: (c: ValueGetterParams<Character>) => c.data.character_stat.find((cs) => cs.stat_id === 3)?.value
  },
  {
    headerName: 'Footsies',
    initialWidth: 110,
    valueGetter: (c: ValueGetterParams<Character>) => c.data.character_stat.find((cs) => cs.stat_id === 4)?.value
  },
  {
    headerName: 'Meter',
    initialWidth: 110,
    valueGetter: (c: ValueGetterParams<Character>) => c.data.character_stat.find((cs) => cs.stat_id === 5)?.value
  },
  {
    headerName: 'Defense',
    initialWidth: 110,
    valueGetter: (c: ValueGetterParams<Character>) => c.data.character_stat.find((cs) => cs.stat_id === 6)?.value
  },
  {
    headerName: 'Mobility',
    initialWidth: 110,
    valueGetter: (c: ValueGetterParams<Character>) => c.data.character_stat.find((cs) => cs.stat_id === 7)?.value
  },
  {
    headerName: 'Ease of Use',
    initialWidth: 120,
    valueGetter: (c: ValueGetterParams<Character>) => c.data.character_stat.find((cs) => cs.stat_id === 8)?.value
  },
  {
    headerName: 'Mixups',
    initialWidth: 110,
    valueGetter: (c: ValueGetterParams<Character>) => c.data.character_stat.find((cs) => cs.stat_id === 9)?.value
  },
  {
    headerName: 'Okizeme',
    initialWidth: 110,
    valueGetter: (c: ValueGetterParams<Character>) => c.data.character_stat.find((cs) => cs.stat_id === 10)?.value
  }
];

function CharactersGrid() {
  const dispatch = useAppDispatch();

  const colDefs = useMemo<ColDef<Character>[]>(() => initialColDefs, []);

  useEffect(() => {
    loadCharacters(dispatch);
    loadStats(dispatch);
  }, [dispatch]);

  const characters = useAppSelector((s) => s.characters);
  const gridRef = useRef<AgGridReact<Character>>(null);
  const defaultColDef = useMemo<ColDef<Character>>(() => {
    return {
      initialWidth: 160,
      sortable: true,
      resizable: true,
      filter: true
    };
  }, []);

  return (
    <MainColumn>
      <Row>
        <Col>
          <h6>
            <Link to={'/charactersgrid'}>Characters (Grid)</Link>
          </h6>
          <div className="ag-theme-alpine-dark" style={{ height: 960 }}>
            <AgGridReact<Character>
              defaultColDef={defaultColDef}
              columnDefs={colDefs}
              getRowId={(row) => row.data.id?.toString() ?? row.data.name}
              ref={gridRef}
              rowData={characters}
            ></AgGridReact>
          </div>
        </Col>
      </Row>
    </MainColumn>
  );
}

export default CharactersGrid;
