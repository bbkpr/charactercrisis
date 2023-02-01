import { useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { loadGames } from '../../services/games.service';
import { getPublicImageUrl } from '../../services/images.service';
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
      <Helmet>
        <title>Character Crisis | Games</title>
      </Helmet>
      <Row>
        <Col>
          <h6>
            <Link to={'/games'}>Games</Link>
          </h6>
          {games
            .filter((g) => g.character.length)
            .map((game) => {
              return (
                <Row key={game.id} className="my-4 px-2 py-2 character-row">
                  <Col sm="4" md="3" className="text-center">
                    <>
                      <div>
                        <Link to={`/games/${game.id}`} className="fs-5 fw-bold">
                          {game.name} ({game.abbreviation})
                        </Link>
                      </div>
                      <div className="fs-6">{game.description}</div>
                    </>
                  </Col>
                  <Col sm="8" md="9">
                    <Row className="justify-content-around">
                      {game.character.map((ch) => {
                        const mainImage = ch.character_image?.find((i) => i.image_type === 'main')?.image;
                        return (
                          <Col xs="6" md="4" xl="3" key={ch.id}>
                            <div className="game-character-block text-center py-2 px-2 my-2">
                              <h6 className="fw-bold fs-6">{ch.name}</h6>
                              {mainImage && (
                                <div className="mt-2 mx-auto img-fluid-wrap-sm">
                                  <Image fluid src={getPublicImageUrl(mainImage.path)} alt={mainImage.description} />
                                </div>
                              )}
                              <div className="game-character-block-value">{ch.description}</div>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </Col>
                </Row>
              );
            })}
        </Col>
      </Row>
    </MainColumn>
  );
}

export default Games;
