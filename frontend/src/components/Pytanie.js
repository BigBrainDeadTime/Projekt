import { useState} from "react";

const Zapytanie = ({ onDownload }) => {
    const [error, setError] = useState('')
    const [Id, setId] = useState('')
    
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Wysyłamy zapytanie do bazy danych, aby sprawdzić istnienie użytkownika i pobrać imię i nazwisko
        try {
            const response = await fetch('http://localhost:8081/Pytania',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({Id}),
                });
            if (response.ok) {
                const res = await response.json();
                console.log(res); 
                if(res.success){
                    onDownload({ Pytanie: res.data[0].Pytanie, Odpowiedz: res.data[0].Odpowiedz, A: res.data[0].A, B: res.data[0].B, C: res.data[0].C, D: res.data[0].D, })              
                }
                else{
                    setError(res.message);
                }
            }
        }
        catch (err) {
            setError('Wystąpił błąd: \n'+ err);
        }

    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Login:<br />
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} id="name" name="name" autoComplete="on" placeholder="Login"/><br />
            </label>
            <label>
                Hasło:<br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  id="surname" name="surname" autoComplete="on" placeholder="Hasło"/> <br /> <br />
            </label>
            <button type="submit">Zaloguj</button>
            <p className="error">{error}</p>
        </form>
    )

}
export default Zapytanie;