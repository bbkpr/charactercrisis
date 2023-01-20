import { useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { loadGames } from '../../services/games.service';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import MainColumn from '../MainColumn/MainColumn';

function Games() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadGames(dispatch);
  }, [dispatch]);
  const games = useAppSelector((s) => s.games);
  return (
    <MainColumn>
      <Row>
        <Col>
          <h5>
            <Link to={'/games'}>Games</Link>
          </h5>
          <Table striped bordered hover className="games-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Characters</th>
              </tr>
            </thead>
            <tbody>
              {games &&
                games.map((game) => {
                  return (
                    <tr key={game.id}>
                      <td className="game-name-column">{game.name}</td>
                      <td className="game-description-column">{game.description}</td>
                      <td className="game-description-characters">
                        <ul>
                          {game.character.map((ch) => (
                            <li key={ch.id}>
                              <Link to={`/characters/${ch.id}`}>{ch.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </MainColumn>
  );
}

export default Games;
