import { useEffect } from 'react';
import { Table } from 'react-bootstrap';

import { loadCharacters } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import MainColumn from '../MainColumn/MainColumn';

function Characters() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadCharacters(dispatch);
  }, [dispatch]);
  const characters = useAppSelector((s) => s.character);

  return (
    <MainColumn title={'Characters'}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reference</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>
                <a href={d.reference_link}>Wiki</a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainColumn>
  );
}

export default Characters;
