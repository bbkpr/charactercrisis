import { ColDef, ValueGetterParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Character } from '../../models/character';

import { loadCharacters, loadStats } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import MainColumn from '../MainColumn/MainColumn';

function CharactersGrid() {
  const dispatch = useAppDispatch();
  const initialColDefs: ColDef<Character>[] = [
    { field: 'name', pinned: 'left' },
    { field: 'description' },
    { field: 'game.name', headerName: 'Game' }
  ];
  [
    [1, 'Rushdown'],
    [2, 'Zoning'],
    [3, 'Damage'],
    [4, 'Footsies'],
    [5, 'Meter'],
    [6, 'Defense'],
    [7, 'Mobility'],
    [8, 'Ease of Use'],
    [9, 'Mixups'],
    [10, 'Okizeme']
  ].forEach((s) => {
    initialColDefs.push({
      headerName: s[1] as string,
      valueGetter: (c: ValueGetterParams<Character>) => c.data.character_stat.find((cs) => cs.stat_id === s[0])?.value,
      initialWidth: 110
    });
  });

  const [colDefs] = useState<ColDef<Character>[]>(initialColDefs);

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
