import React, { useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import MainColumn from '../MainColumn/MainColumn';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { stringToRGBA } from '../../utils/utils';
import { Stat, Weight, questions, tagQuestions } from './quizQuestions';
//import { Character, Tag } from '../../models';

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

const CharacterQuiz: React.FC = () => {
  const [totalWeights, setTotalWeights] = useState(initialWeights);
  const [individualWeights, setIndividualWeights] = useState<Partial<Record<Stat, Weight>>[]>([]);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    weightEffects: Partial<Record<Stat, Weight>>
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
    <MainColumn className={`character-quiz`}>
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
          <div className="fw-bold ms-1">Take this quiz to find out which stats you should focus on!</div>
        </Col>
      </Row>
      <Row>
        <Col sm="7" className="scrollable-col scrollable-col-taller">
          <Form>
            {questions.map((question, questionIndex) => (
              <Form.Group className="quiz-question p-3 mt-2" key={`question-${questionIndex}`}>
                <Form.Label>
                  {questionIndex + 1}. {question.questionText}
                </Form.Label>
                {question.answers.map((answer, answerIndex) => (
                  <div className="d-flex">
                    <Form.Check
                      key={`answer-${answerIndex}`}
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
                  <div className="d-flex">
                    <Form.Check
                      key={`tag-answer-${answerIndex}`}
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
        <Col sm="5" className="sticky-col">
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
          <div className="fw-bold mt-2">
            Try sorting Characters by your top stat to find characters that fit your play style!
          </div>
        </Col>
      </Row>
    </MainColumn>
  );
};

export default CharacterQuiz;
