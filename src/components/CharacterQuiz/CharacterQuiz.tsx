import React, { useCallback, useEffect, useState } from 'react';
import { Form, Col, Row, Dropdown } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import MainColumn from '../MainColumn/MainColumn';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { stringToRGBA } from '../../utils/utils';
import { Stat, Weight, questions, tagQuestions } from './quizQuestions';
import { Character, CharacterWithRelevance } from '../../models';
import { useAppSelector } from '../../utils/hooks';
import CharacterItem from '../Characters/CharacterItem';
import { loadCharacters } from '../../services/characters.service';
import { useDispatch } from 'react-redux';
import { loadGames } from '../../services/games.service';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const initialWeights: Record<Stat, Weight> = {
  Rushdown: 0,
  Zoning: 0,
  Damage: 0,
  Footsies: 0,
  Meter: 0,
  Defense: 0,
  Mobility: 0,
  'Ease Of Use': 0,
  Mixups: 0,
  Okizeme: 0
};

type WeightEffects = Partial<Record<Stat, Weight>>;

const CharacterQuiz: React.FC = () => {
  const [totalWeights, setTotalWeights] = useState(initialWeights);
  const [individualWeights, setIndividualWeights] = useState<WeightEffects[]>([]);
  const [relevantCharacters, setRelevantCharacters] = useState<CharacterWithRelevance[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const dispatch = useDispatch();
  const characters = useAppSelector((s) => s.characters);
  const games = useAppSelector((s) => s.games);

  useEffect(() => {
    loadCharacters(dispatch);
    loadGames(dispatch);
  }, [dispatch]);

  function calculateRelevance(character: Character, weightEffects: WeightEffects) {
    let relevance = 0;

    character.character_stat.forEach((characterStat) => {
      const matchingWeightEffect = weightEffects[characterStat.stat.name];

      if (matchingWeightEffect) {
        relevance += characterStat.value * matchingWeightEffect;
      }
    });

    return relevance;
  }

  const findRelevantCharacters = useCallback(
    (weights: WeightEffects) => {
      if (characters) {
        const relevants = characters
          .filter((c) => (selectedGameId ? c.game_id === selectedGameId : true))
          .map((c) => {
            const relevance = calculateRelevance(c, weights);
            return { ...c, relevance } as CharacterWithRelevance;
          })
          .sort((a, b) => b.relevance - a.relevance)
          .slice(0, 10);
        setRelevantCharacters(relevants);
      }
    },
    [characters, selectedGameId]
  );

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    weightEffects: WeightEffects
  ) => {
    if (event.target.checked) {
      const newIndividualWeights = [...individualWeights];

      // Update the weights for the current question
      newIndividualWeights[questionIndex] = weightEffects;
      setIndividualWeights(newIndividualWeights);

      // Calculate the new total weights
      const newWeights: Record<Stat, Weight> = { ...initialWeights };

      for (const questionWeights of newIndividualWeights) {
        if (questionWeights) {
          for (const stat in questionWeights) {
            newWeights[stat] += questionWeights[stat];
            newWeights[stat] = Math.max(-100, Math.min(100, newWeights[stat]));
          }
        }
      }

      setTotalWeights(newWeights);
    }
  };

  useEffect(() => {
    findRelevantCharacters(totalWeights);
  }, [findRelevantCharacters, totalWeights, selectedGameId]);

  const data = {
    labels: Object.keys(totalWeights),
    datasets: [
      {
        label: 'Weight',
        data: Object.values(totalWeights),
        backgroundColor: Object.keys(initialWeights).map((k) => stringToRGBA(k, 0.9)),
        borderColor: Object.keys(initialWeights).map((k) => stringToRGBA(k, 0.9)),
        borderWidth: 1
      }
    ]
  };

  return (
    <MainColumn className={`character-quiz compact-ui`}>
      <Helmet>
        <title>Character Crisis | Character Quiz</title>
      </Helmet>
      <Row>
        <Col>
          <h6>
            <Link to={'/characters'}>Characters</Link>
            {' > '}
            <Link to={`/characterquiz`}>Character Quiz</Link>
          </h6>
          <div className="fw-bold ms-1">
            Take this quiz to find out which stats you should focus on! Note: I'm still tuning the quiz, your answers
            may not guarantee the suggested characters have a specific trait or ability. There are also outlier
            Characters, both top (ex. Shiki Tohno and Aoko) and bottom tier (ex. Neco-arc), that I will be manually
            adjusting over time to improve suggestions.
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="6" className="scrollable-col scrollable-col-taller">
          <Form>
            {questions.map((question, questionIndex) => (
              <Form.Group className="quiz-question p-3 mt-2" key={`question-${questionIndex}`}>
                <Form.Label>
                  {questionIndex + 1}. {question.questionText}
                </Form.Label>
                {question.answers.map((answer, answerIndex) => (
                  <div className="d-flex" key={`answer-${answerIndex}`}>
                    <Form.Check
                      type="radio"
                      name={`question-${questionIndex}`}
                      id={`question-${questionIndex}_answer-${answerIndex}`}
                      onChange={(event) => handleAnswerChange(event, questionIndex, answer.weightEffects)}
                    />
                    <Form.Label className="ms-2" htmlFor={`question-${questionIndex}_answer-${answerIndex}`}>
                      {answer.text}
                    </Form.Label>
                  </div>
                ))}
              </Form.Group>
            ))}
            {tagQuestions.map((question, questionIndex) => (
              <Form.Group className="quiz-question p-3 mt-2" key={`tag-question-${questionIndex}`}>
                <Form.Label>
                  {questionIndex + questions.length + 1}. {question.questionText}
                </Form.Label>
                {question.answers.map((answer, answerIndex) => (
                  <div className="d-flex" key={`tag-answer-${answerIndex}`}>
                    <Form.Check
                      type="radio"
                      name={`tag-question-${questionIndex}`}
                      id={`tag-question-${questionIndex}_answer-${answerIndex}`}
                      onChange={(event) =>
                        handleAnswerChange(event, questionIndex + questions.length, answer.weightEffects)
                      }
                    />
                    <Form.Label className="ms-2" htmlFor={`tag-question-${questionIndex}_answer-${answerIndex}`}>
                      {answer.text}
                    </Form.Label>
                  </div>
                ))}
              </Form.Group>
            ))}
          </Form>
        </Col>
        <Col sm="6" className="sticky-col">
          <div className="quiz-chart-wrap">
            <Bar
              data={data}
              options={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                    position: 'top' as const
                  },
                  title: {
                    display: false,
                    text: 'Character Quiz'
                  }
                }
              }}
            />
          </div>
          <Row className="mt-3">
            <Col>
              <div className="d-flex align-items-center">
                <div className="fw-bold me-2">Your Top 10 Characters from</div>
                <Dropdown
                  className="text-end"
                  onSelect={(e: string | null) => setSelectedGameId(e ? parseInt(e) : null)}
                >
                  <Dropdown.Toggle variant="secondary" id="filter-dropdown">
                    {selectedGameId
                      ? games.find((game) => game.id === selectedGameId)?.name || 'All Games'
                      : 'All Games'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item key={'All Games'} eventKey={null}>
                      All Games
                    </Dropdown.Item>
                    {games
                      .filter((g) => g.character.length > 0)
                      .map((game) => (
                        <Dropdown.Item key={game.name} eventKey={game.id.toString()}>
                          {game.name}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col>
              {relevantCharacters.some((rc) => rc.relevance !== 0)
                ? relevantCharacters.map((rc) => (
                    <CharacterItem key={rc.id} character={rc} isComparing relevance={rc.relevance} />
                  ))
                : 'Answer questions to find your matches...'}
            </Col>
          </Row>
        </Col>
      </Row>
    </MainColumn>
  );
};

export default CharacterQuiz;
