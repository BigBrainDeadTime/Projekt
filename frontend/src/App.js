import './App.css';
import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Singup from './components/SingUpForm';
import Main from './components/Main';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [Pytanie, setQuestion] = useState([]);
  const [isCorrect, setIsCorrect] = useState({});
  const [isSubmitted, setIsSubmitted] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8081/getquiz", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((item) => ({ ...item, selectedAnswer: '' }));
        setQuestion(updatedData);
        console.log(updatedData);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleLogin = (userData) => {
    setLoggedInUser(userData);
    console.log(userData);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const changeSelection = (index, value) => {
    const updatedQuestions = [...Pytanie];
    updatedQuestions[index].selectedAnswer = value;
    setQuestion(updatedQuestions);
  };

  const handleSubmit = (e, index, correctAnswer) => {
    e.preventDefault();
    const selectedAnswer = Pytanie[index].selectedAnswer;
    const updatedIsCorrect = { ...isCorrect };
    updatedIsCorrect[index] = selectedAnswer === correctAnswer;
    setIsCorrect(updatedIsCorrect);

    const updatedIsSubmitted = { ...isSubmitted };
    updatedIsSubmitted[index] = true;
    setIsSubmitted(updatedIsSubmitted);

    if (selectedAnswer === correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    console.log(selectedAnswer);
  };

  const handleFinish = () => {
    alert(`Zdobyłeś ${correctAnswers} punktów.`);
    setCorrectAnswers(0);
    setIsCorrect({});
    setIsSubmitted({});
    setQuestion(Pytanie.map((item) => ({ ...item, selectedAnswer: '' })));
  };

  return (
    <div className='main'>
      {loggedInUser ? (
        <div>
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <h3>Punkty: {correctAnswers}</h3>
          </div>
          <h3>Witaj {loggedInUser.name} {loggedInUser.surname} {loggedInUser.id}</h3>
          {Pytanie.map((data, index) => {
            const backgroundColor = isCorrect[index] === undefined ? 'white' : (isCorrect[index] ? 'lightgreen' : 'lightcoral');
            return (
              <div key={index} style={{ backgroundColor }}>
                <form onSubmit={(e) => handleSubmit(e, index, data.Odpowiedz)}>
                  <p>Pytanie: {data.Pytanie}</p>
                  <label>
                    <input
                      type="radio"
                      className="radio"
                      value="A"
                      name={`question_${index}`}
                      required
                      onChange={() => changeSelection(index, 'A')}
                      checked={data.selectedAnswer === 'A'}
                    /> Odpowiedz A: {data.A}
                  </label><br />
                  <label>
                    <input
                      type="radio"
                      className="radio"
                      value="B"
                      name={`question_${index}`}
                      required
                      onChange={() => changeSelection(index, 'B')}
                      checked={data.selectedAnswer === 'B'}
                    /> Odpowiedz B: {data.B}
                  </label><br />
                  <label>
                    <input
                      type="radio"
                      className="radio"
                      value="C"
                      name={`question_${index}`}
                      required
                      onChange={() => changeSelection(index, 'C')}
                      checked={data.selectedAnswer === 'C'}
                    /> Odpowiedz C: {data.C}
                  </label><br />
                  <label>
                    <input
                      type="radio"
                      className="radio"
                      value="D"
                      name={`question_${index}`}
                      required
                      onChange={() => changeSelection(index, 'D')}
                      checked={data.selectedAnswer === 'D'}
                    /> Odpowiedz D: {data.D}
                  </label><br />
                  <button type="submit" disabled={isSubmitted[index]}>Wynik</button>
                </form><br /><br /><br />
              </div>
            );
          })}
          <button onClick={handleFinish}>Ukończ</button>
          <button onClick={handleLogout}>Wyloguj</button>
        </div>
      ) : (
        <BrowserRouter>
           <Routes>
            <Route index element={<Main />} />
            <Route path='/loginform' element={<LoginForm onLogin={handleLogin} />} />
            <Route path='/singupform' element={<Singup />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;