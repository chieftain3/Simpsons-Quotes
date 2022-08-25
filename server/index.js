const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//hacemos una session para guardar en una cookie al usuario
app.use(
    session({
        key: "userId",
        secret: "mantecol",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24 * 1000,
        },
    })
);

//creamos la conexion a la base de datos
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'loginSystem',
});

app.post('/register', (req, res) => {

    //insertamos el formulario de registro a la base de datos y lo guardamos

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    //encriptamos la password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

        db.query("INSERT INTO loginsystem.users (username, email, password) VALUES (?,?,?)",
            [username, email, hash],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    res.send("Registration complete");
                }
            }
        );
    });
});

app.get("/login", (req, res) => {
    //nos fijamos si el usuario esta registrado en la base de datos y lo pasamos como true o false  la session
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.delete('/login', (req, res) => {
    //Borrar la session 
    if (req.session) {
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                req.session = null;
                return res.send({ loggedIn: false });
            }
        });
    } 
})

app.post('/login', (req, res) => {

    //Pasar el formulario de login a la base de datos para ver si el usuario esta registrado

    const email = req.body.email
    const password = req.body.password

    db.query("SELECT * FROM loginsystem.users WHERE email = ?",
        email,
        (err, result) => {
            //si hay un error, mandamos el error
            if (err) {
                res.send({ err: err });
            }
            //si no hay un error nos fijamos que el resultado que nos trajo sea mayor a cero y comparamos
            //la contraseña encriptada con el email para saber si estan registrados con esa contraseña
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    }
                    //si el email esta, pero la contraseña no coincide 
                    else {
                        res.send({ message: "Wrong email/password combination!" });
                    }
                });
                //si el email no se encuentra
            } else {
                res.send({ message: "Email doesn't exist" });
            }
        }
    );
});

app.listen(3001, () => {
    console.log('running server');
});