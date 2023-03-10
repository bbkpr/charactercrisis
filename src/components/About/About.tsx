import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import MainColumn from '../MainColumn/MainColumn';

export function AboutBlurb() {
  return (
    <div className="blurb">
      <p>
        Character Crisis is a utility to help you pick your next Fighting Game character! Right now, it is in{' '}
        <strong>Alpha 1</strong>, please be patient as I continue to add features and data for more characters and
        games. Alpha 1 features include Lists, Descriptions, and Stat details of Characters from various games. Alpha 2
        will expand upon this by allowing selection of a character, showing their detailed profile next to a list of all
        other characters from selected game(s), ordered by a selected score similarity. Future alphas will expand upon
        stat comparisons, and Beta will focus on design and UX improvements.
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
