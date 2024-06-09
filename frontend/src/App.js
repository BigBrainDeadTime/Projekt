import './App.css';
import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Singup from './components/SingUpForm';
import Main from './components/Main';
import UserResults from './components/UserResult';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [Pytanie, setQuestion] = useState([]);
  const [isCorrect, setIsCorrect] = useState({});
  const [isSubmitted, setIsSubmitted] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

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
  }, [refreshTrigger]); // Dodany refreshTrigger jako dependency

  // Obsługa procesu logowania użytkownika
  const handleLogin = (userData) => {
    setLoggedInUser(userData);
    console.log(userData);
  };

  // Obsługa procesu wylogowania użytkownika
  const handleLogout = () => {
    setLoggedInUser(null);
  };

  // Aktualizacja wybranej odpowiedzi dla danego pytania w quizie
  const changeSelection = (index, value) => {
    const updatedQuestions = [...Pytanie];
    updatedQuestions[index].selectedAnswer = value;
    setQuestion(updatedQuestions);
  };

  // Obsługa procesu przesyłania odpowiedzi na pytanie w quizie
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

  // Zakończenie quizu i wyświetlenie wyniku
  const handleFinish = () => {
    alert(`Twój wynik to: ${correctAnswers}`);
    if (loggedInUser != null) {
      saveQuizResult(correctAnswers, loggedInUser.id);
    }
    setCorrectAnswers(0);
    setIsCorrect({});
    setIsSubmitted({});
    setQuestion(Pytanie.map((item) => ({ ...item, selectedAnswer: '' })));
    setRefreshTrigger(!refreshTrigger);
  };

  const saveQuizResult = (score, userId) => {
    const quizResult = {
      Id_zdajacego: userId,
      wynik: score
    };

    fetch("http://localhost:8081/savequizresult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizResult),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Wynik quizu został zapisany w bazie danych:", data);
        setRefreshTrigger(!refreshTrigger);
      })
      .catch((error) => {
        console.error("Wystąpił błąd podczas zapisywania wyniku quizu:", error);
      });
  };

  return (
    <div className='main'>
      {loggedInUser ? (
        <div>
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <h3>Punkty: {correctAnswers}</h3>
          </div>
          <h3>Witaj {loggedInUser.name} {loggedInUser.surname}</h3>
          <div className="scrollable-container">
            {Pytanie.map((data, index) => {
              const backgroundColor = isCorrect[index] === undefined ? 'white' : (isCorrect[index] ? 'lightgreen' : 'lightcoral');
              return (
                <form key={index} onSubmit={(e) => handleSubmit(e, index, data.Odpowiedz)} className="quiz-form" style={{ backgroundColor }}>
                  <p>Pytanie {data.Id}: {data.Pytanie}</p>
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
                </form>
              );
            })}
          </div>
          <button onClick={handleFinish}>Ukończ</button>
          <button onClick={handleLogout}>Wyloguj</button>
          <UserResults userId={loggedInUser.id} refreshTrigger={refreshTrigger} />
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