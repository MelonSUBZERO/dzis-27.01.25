const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
 
const app = express()
app.use(cors())
 
const port = 3001
 
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "library"
})
 
con.connect((err) => {
    if (err) {
        console.log("Nie połączono z bazą danych")
    } else {
        console.log("Połączono z bazą danych")
    }
})
 
app.get('/add-book/:title/:author', (req, res) => {
    const title = req.params.title
    const author = req.params.author
    const sql = "INSERT INTO books (title, author) VALUES (?, ?)"
    con.query(sql, [title, author], (err, result) => {
        if (err) {
            console.log(err)
            res.send("Nie udało się dodać książki")
        } else {
            res.send("Książka dodana pomyślnie")
            console.log("Dodano książkę")
        }
    })
})
 
app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books"
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            res.send("Nie udało się pobrać danych")
        } else {
            res.send(data)
            console.log("Pobrano dane")
        }
    })
})
 
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`)
})