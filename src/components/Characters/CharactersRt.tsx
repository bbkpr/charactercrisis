import { CellContext, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Character } from '../../models/character';

import { loadCharacters, loadStats } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { letterGrade } from '../../utils/utils';
import MainColumn from '../MainColumn/MainColumn';

const columnHelper = createColumnHelper<Character>();

const gradeCell = (info: CellContext<Character, number>) => {
  const grade = letterGrade(info.cell?.getValue());
  return <div className={`grade-${grade.toLocaleLowerCase()}`}>{grade}</div>;
};

const statAccessor = (row: Character, stat_id: number) =>
  row.character_stat.find((cs) => cs.stat_id === stat_id)?.value;

const columns = [
  columnHelper.accessor('name', {
    id: 'name',
    header: 'Name'
  }),
  columnHelper.accessor('description', {
    id: 'description',
    header: 'Description'
  }),
  columnHelper.accessor('game.name', {
    id: 'game_name',
    header: 'Game'
  }),
  columnHelper.accessor((row) => statAccessor(row, 1), {
    id: 'rushdown',
    cell: gradeCell,
    header: 'Rushdown'
  }),
  columnHelper.accessor((row) => statAccessor(row, 2), {
    id: 'zoning',
    cell: gradeCell,
    header: 'Zoning'
  }),
  columnHelper.accessor((row) => statAccessor(row, 3), {
    id: 'damage',
    cell: gradeCell,
    header: 'Damage'
  }),
  columnHelper.accessor((row) => statAccessor(row, 4), {
    id: 'footsies',
    cell: gradeCell,
    header: 'Footsies'
  }),
  columnHelper.accessor((row) => statAccessor(row, 5), {
    id: 'meter',
    cell: gradeCell,
    header: 'Meter'
  }),
  columnHelper.accessor((row) => statAccessor(row, 6), {
    id: 'defense',
    cell: gradeCell,
    header: 'Defense'
  }),
  columnHelper.accessor((row) => statAccessor(row, 7), {
    id: 'mobility',
    cell: gradeCell,
    header: 'Mobility'
  }),
  columnHelper.accessor((row) => statAccessor(row, 8), {
    id: 'easeofuse',
    cell: gradeCell,
    header: 'Ease of Use'
  }),
  columnHelper.accessor((row) => statAccessor(row, 9), {
    id: 'mixups',
    cell: gradeCell,
    header: 'Mixups'
  }),
  columnHelper.accessor((row) => statAccessor(row, 10), {
    id: 'okizeme',
    cell: gradeCell,
    header: 'Okizeme'
  })
];

function Characters() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadCharacters(dispatch);
    loadStats(dispatch);
  }, [dispatch]);
  const characters = useAppSelector((s) => s.characters);

  const table = useReactTable<Character>({
    columns,
    data: characters ? characters : [],
    getCoreRowModel: getCoreRowModel<Character>()
  });

  return (
    <MainColumn>
      <Row>
        <Col>
          <h6>
            <Link to={'/charactersrt'}>Characters (Table B)</Link>
          </h6>
          <div className="p-2">
            <Table striped bordered hover className="stats-table">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {table.getFooterGroups().map((footerGroup) => (
                  <tr key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            </Table>
          </div>
        </Col>
      </Row>
    </MainColumn>
  );
}

export default Characters;
