import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import MainColumn from '../MainColumn/MainColumn';

export function AboutBlurb() {
  return (
    <div className="blurb">
      <p>
        Character Crisis is a utility to help you pick your next Fighting Game character! Right now, it is in{' '}
        <strong>Beta</strong>, last updated April 4, 2023. Please be patient as I continue to add features and data for
        more characters and games. This project is open source, everything can be found on{' '}
        <a href="https://github.com/bbkpr/charactercrisis">our Github!</a>
      </p>
      <p>
        <strong>
          I'm actively looking for people to help fill in stats and descriptions of more characters. I can pay a cash
          bounty for each completed character. Please contact me at Bob's Beekeeping Emporium#2471 on Discord if you can
          help!
        </strong>
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <MainColumn>
      <Helmet>
        <title>Character Crisis | About</title>
      </Helmet>
      <Row>
        <Col>
          <h6>
            <Link to={'/about'}>About</Link>
          </h6>
          <AboutBlurb />
        </Col>
      </Row>
    </MainColumn>
  );
}
