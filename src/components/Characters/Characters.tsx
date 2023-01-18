import { useEffect } from 'react';
import { Table } from 'react-bootstrap';

import { loadCharacters, loadStats } from '../../services/characters.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import MainColumn from '../MainColumn/MainColumn';
import { StatRadar } from '../StatRadar/StatRadar';

function Characters() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadCharacters(dispatch);
    loadStats(dispatch);
  }, [dispatch]);
  const characters = useAppSelector((s) => s.characters);
  const stats = useAppSelector((s) => s.stats);

  const statRadarDataOne = characters.length
    ? characters[0].character_stat.map((s) => ({ stat: s.stat.name, character: s.value }))
    : [];
  return (
    <MainColumn title={'Characters'}>
      <div className="radar-wrap">
        <StatRadar data={statRadarDataOne} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reference</th>
            {stats && stats.map((s) => <td key={s.id}>{s.name}</td>)}
          </tr>
        </thead>
        <tbody>
          {characters.map((ch) => (
            <tr key={ch.id}>
              <td>{ch.name}</td>
              <td>
                <a href={ch.reference_link}>Wiki</a>
              </td>
              {ch.character_stat.map((cs) => (
                <td key={cs.stat_id}>{cs.value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </MainColumn>
  );
}

export default Characters;
