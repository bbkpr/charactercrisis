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
  const ui = useAppSelector((s) => s.ui);

  return (
    <MainColumn title={'Characters'}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Stats</th>
            <th>Graph</th>
            <th>Reference</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((ch) => {
            const statsData = ch.character_stat.map((s) => ({
              stat: s.stat.name,
              [ch.name]: s.value
            }));
            return (
              <tr key={ch.id}>
                <td>{ch.name}</td>
                <td>
                  <ul>
                    {ch.character_stat.map((cs) => (
                      <li key={cs.stat_id}>
                        {cs.stat.name}: {cs.value}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  {ui.openStatGraphs[ch.id] ? (
                    <div className="radar-wrap">
                      <StatRadar character_name={ch.name} data={statsData} />
                    </div>
                  ) : null}
                </td>
                <td>
                  <a href={ch.reference_link}>Wiki</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </MainColumn>
  );
}

export default Characters;
