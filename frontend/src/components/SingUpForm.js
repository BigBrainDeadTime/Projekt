import { useState} from "react";
import { Link, redirect } from "react-router-dom";
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const Singup = () => {
    const [error, setError] = useState('')
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password1, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
 
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
       
        // Wysyłamy zapytanie do bazy danych, aby sprawdzić istnienie użytkownika i pobrać imię i nazwisko
        try {
            if(password1!==password2) throw new Error("Hasła nie zgadzają się");
            if(user=="") throw new Error("Login nie może być pusty!");
            if(name=="") throw new Error("Imie nie może być puste!");
            if(surname=="") throw new Error("Nazwisko nie może być puste!");
            if(password1=="") throw new Error("Hasło nie może być puste!");
            const password = await bcrypt.hash(password1, 10); //10 koszt hashowania
            const response = await fetch('http://localhost:8081/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user, password, name, surname }),
                });
            if (response.ok) {
                const res = await response.json();
                console.log(res); 
                if(res.success){
                    alert(res.message); 
                    navigate('/');      
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
        <div className="main">

        <form onSubmit={handleSubmit}>
            <label>
                Login:<br />
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} id="user" name="user" autoComplete="on" placeholder="Login"/><br />
            </label>
            <label>
                Imię:<br />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" autoComplete="on" placeholder="Imię"/><br />
            </label>
            <label>
                Nazwisko:<br />
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} id="surname" name="surname" autoComplete="on" placeholder="Nazwisko"/><br />
            </label>
            <label>
                Hasło:<br />
                <input type="password" value={password1} onChange={(e) => setPassword(e.target.value)}  id="password1" name="password1" autoComplete="on" placeholder="Hasło"/> <br /> 
            </label>
            <label>
                Powtórz hasło:<br />
                <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)}  id="password2" name="password2" autoComplete="on" placeholder="Powtórz hasło"/> <br /><br/>
            </label>
            <button type="submit">Zarejestruj</button>
            <p className="error">{error}</p>
            <Link to="/">Strona główna</Link>
        </form>
        </div>
        
    )
};
export default Singup;