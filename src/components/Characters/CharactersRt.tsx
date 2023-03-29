import { CellContext, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect } from 'react';
import { Col, Image, Row, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Character } from '../../models/character';
import { Game } from '../../models/game';

import { loadCharacters } from '../../services/characters.service';
import { getPublicImageUrl } from '../../services/images.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { letterGrade } from '../../utils/utils';
import MainColumn from '../MainColumn/MainColumn';

const columnHelper = createColumnHelper<Character>();

const gradeCell = (info: CellContext<Character, number>) => {
  const grade = letterGrade(info.getValue());
  return <div className={`grade-${grade.toLocaleLowerCase()}`}>{grade !== 'U' ? grade : '-'}</div>;
};

const characterLinkCell = (info: CellContext<Character, Character>) => {
  const character = info.getValue();
  const mainImage = character.character_image.find((i) => i.image_type === 'main')?.image;
  return (
    <>
      <div>
        <Link to={`/characters/${character.id}`}>{character.name}</Link>
      </div>
      {mainImage && (
        <div className="mt-2 img-fluid-wrap-sm">
          <Image fluid src={getPublicImageUrl(mainImage.path)} alt={mainImage.description} />
        </div>
      )}
    </>
  );
};

const gameLinkCell = (info: CellContext<Character, Game>) => {
  const game = info.getValue();
  return <Link to={`/games/${game.id}`}>{game.abbreviation}</Link>;
};

const statAccessor = (row: Character, stat_id: number) =>
  row.character_stat.find((cs) => cs.stat_id === stat_id)?.value;

const columns = [
  columnHelper.accessor((row) => row, {
    id: 'name',
    cell: characterLinkCell,
    header: 'Name'
  }),
  columnHelper.accessor('description', {
    id: 'description',
    header: 'Description'
  }),
  columnHelper.accessor((row) => row.game, {
    id: 'game_name',
    cell: gameLinkCell,
    header: 'Game'
  }),
  columnHelper.accessor((row) => statAccessor(row, 1), {
    id: 'rushdown',
    cell: gradeCell,
    header: 'RSH'
  }),
  columnHelper.accessor((row) => statAccessor(row, 2), {
    id: 'zoning',
    cell: gradeCell,
    header: 'ZON'
  }),
  columnHelper.accessor((row) => statAccessor(row, 3), {
    id: 'damage',
    cell: gradeCell,
    header: 'DMG'
  }),
  columnHelper.accessor((row) => statAccessor(row, 4), {
    id: 'footsies',
    cell: gradeCell,
    header: 'FTS'
  }),
  columnHelper.accessor((row) => statAccessor(row, 5), {
    id: 'meter',
    cell: gradeCell,
    header: 'MTR'
  }),
  columnHelper.accessor((row) => statAccessor(row, 6), {
    id: 'defense',
    cell: gradeCell,
    header: 'DEF'
  }),
  columnHelper.accessor((row) => statAccessor(row, 7), {
    id: 'mobility',
    cell: gradeCell,
    header: 'MOB'
  }),
  columnHelper.accessor((row) => statAccessor(row, 8), {
    id: 'easeofuse',
    cell: gradeCell,
    header: 'EAS'
  }),
  columnHelper.accessor((row) => statAccessor(row, 9), {
    id: 'mixups',
    cell: gradeCell,
    header: 'MIX'
  }),
  columnHelper.accessor((row) => statAccessor(row, 10), {
    id: 'okizeme',
    cell: gradeCell,
    header: 'OKI'
  })
];

function Characters() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadCharacters(dispatch);
  }, [dispatch]);
  const characters = useAppSelector((s) => s.characters);

  const table = useReactTable<Character>({
    columns,
    data: characters,
    getCoreRowModel: getCoreRowModel<Character>()
  });

  return (
    <MainColumn>
      <Helmet>
        <title>Character Crisis | Characters</title>
      </Helmet>
      <Row>
        <Col>
          <h6>
            <Link to={'/charactersrt'}>Characters (Table)</Link>
          </h6>
          <div className="p-2">
            <Table striped bordered hover className="stats-table">
              <thead className="sticky-top bg-black">
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
