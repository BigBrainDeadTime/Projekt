const  express = require('express');
const mysql  = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'logowanie_01_react'
})

app.post("/login", (req, res) => {
    const sql = "SELECT id, user, password, name, surname FROM data WHERE user=?";
    db.query(sql, [req.body.user], (err, data) => {
      if (err) return res.json({ success: false, message: "Błąd logowania" });
      if (data.length > 0) {
        console.log(data);
        console.log(req.body.password);
        console.log(data[0].password);
        bcrypt.compare(req.body.password, data[0].password, (err, result) => {
          if (err) {
              // console.error('Błąd porównywania haseł:', err);
              return res.json({ success: false, message: "Błąd porównywania haseł" });
          }
          if (result)
            return res.json({
              success: true,
              name: data[0].name,
              surname: data[0].surname,
              id: data[0].id
            });
          else return res.json({ success: false, message: "Błędne hasło!" });
        });
      } else return res.json({ success: false, message: "Błędny login!" });
    });
  });
app.post("/register", (req, res) => {
    let sql = "SELECT user FROM data WHERE user=?";
    db.query(sql, [req.body.user], (err, data) => {
      if (err) return res.json({ success: false, message: "Wystapił błąd" });
      if (data.length > 0)
        return res.json({
          success: false,
          message: "Taki użytkownik już istnieje!",
        });
      else {
        sql =
          "INSERT INTO data (user, password, name, surname) VALUES (?, ?, ?, ?)";
        db.query(
          sql,
          [req.body.user, req.body.password, req.body.name, req.body.surname],
          (err) => {
            if (err)
              return res.json({ success: false, message: "Wystapił błąd" });
            else
              return res.json({
                success: true,
                message: "Rejestracja powiodła się",
              });
          }
        );
      }
    });
  });
  app.get('/getquiz',(req,res)=>{
    const sql='SELECT * from pytania';
    db.query(sql,(err,data)=>{
            if(err) return res.json({Error:"Nie pobrano danych"});
            if(data.length>0){
                if(res){
                    return res.json(data);
                }
                else{
                    return res.json({Error:"Coś poszło nie tak..."})
                }
            }
    })
  });



app.post('/savequizresult', (req, res) => {
  const { Id_zdajacego, wynik } = req.body;

  if (!Id_zdajacego || !wynik) {
    return res.status(400).json({ error: 'Brakujące Id_zdajacego lub wynik' });
  }

  const query = "INSERT INTO wyniki(Id_zdajacego, wynik) VALUES ('?','?')";
  db.query(query, [Id_zdajacego, wynik], (err, results) => {
    if (err) {
      console.error('Błąd zapisu wyniku w bazie danych: ', err);
      return res.status(500).json({ error: 'Błąd serwera' });
    }

    res.status(200).json({ message: 'Wynik quizu został zapisany', results });
  });
});

app.get('/getuserresults/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT * FROM wyniki WHERE Id_zdajacego = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Błąd pobierania wyników z bazy danych: ', err);
      return res.status(500).json({ error: 'Błąd serwera' });
    }

    res.status(200).json(results);
  });
});

  
app.listen(8081, () => {
    console.log('Nasłuchuję na porcie 8081...');
});
