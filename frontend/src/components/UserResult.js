import React, { useState, useEffect } from 'react';

const UserResults = ({ userId, refreshTrigger }) => {
  const [userResults, setUserResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8081/getuserresults/${userId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserResults(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [userId, refreshTrigger]); // Dodany refreshTrigger jako dependency

  return (
    <div className="user-results">
      <h3>Twoje poprzednie wyniki:</h3>
      {userResults.length > 0 ? (
        <div className="scrollable-container2">
          <table>
            <thead>
              <tr>
                
                <th style={{ width: '60%' }}>Wyniki</th>
              </tr>
            </thead>
            <tbody>
              {userResults.map((result) => (
                <tr key={result.Id}>
                  <td>Wynik:</td>
                  <td>{result.wynik}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Brak wyników do wyświetlenia</p>
      )}
    </div>
  );
}

export default UserResults;

