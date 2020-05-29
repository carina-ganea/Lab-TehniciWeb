// JavaScript source code

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser());

const fs = require("fs");

function readJSONFile() {
    return JSON.parse(fs.readFileSync("Users.json"));
}

function writeJSONFile(content1, content2) {
    fs.writeFileSync(
        "Users.json",
        JSON.stringify({ Users: content1, Articles: content2 }),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}


app.get('/Users', (req, res) => {
    var Users = readJSONFile()["Users"];
    res.send(Users);
})


app.get('/Articles', (req, res) => {
    var Articles = readJSONFile()["Articles"];
    res.send(Articles);
})

app.get('/Users/:id', (req, res) => {
    var Users = readJSONFile()["Users"];
    var user;
    var id = req.params.id;
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].id === id) {
            user = Users[i];
            break;
        }
    }
    res.send(user);
})

app.get('/Articles/:id', (req, res) => {
    var Articles = readJSONFile()["Articles"];
    var article;
    var id = req.params.id;
    for (let i = 0; i < Articles.length; i++) {
        if (Articles[i].id === id) {
            article = Articles[i];
            break;
        }
    }
    res.send(article);
})

app.post('/Users', (req, res) => {
    var user = req.body;
    user.id = uuid.v1();
    var Users = readJSONFile()["Users"];
    var Articles = readJSONFile()["Articles"];
    Users.push(user);
    writeJSONFile(Users,Articles);
    res.send(user);
})

app.post('/Articles', (req, res) => {
    var article = req.body;
    article.id = uuid.v1();
    var Articles = readJSONFile()["Articles"];
    var Users = readJSONFile()["Users"];
    Articles.push(article);
    writeJSONFile(Users, Articles);
    res.send(article);
})

app.delete('/Users/:id', (req, res) => {
    var id = req.params.id;
    var Users = readJSONFile()["Users"];
    var Articles = readJSONFile()["Articles"];
    var updatedUsers = [];
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].id !== id) {
            updatedUsers.push(Users[i]);
        }
    }
    writeJSONFile(updatedUsers, Articles);
})

app.delete('/Articles/:id', (req, res) => {
    var id = req.params.id;
    var Articles = readJSONFile()["Articles"];
    var Users = readJSONFile()["Users"];
    var updatedArticles = [];
    for (let i = 0; i < Articles.length; i++) {
        if (Articles[i].id !== id) {
            updatedArticles.push(Articles[i]);
        }
    }
    writeJSONFile(Users, updatedArticles);
})

app.put('/Users/:id', (req, res) => {
    var id = req.params.id;
    var updatedUser = req.body;

    var Users = readJSONFile()["Users"];
    var Articles = readJSONFile()["Articles"];
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].id === id) {
            Users[i] = updatedUser;
        }
    }
    writeJSONFile(Users, Articles);
    res.send(Users);
})

app.put('/Articles/:id', (req, res) => {
    var id = req.params.id;
    var updatedArticle = req.body;

    var Users = readJSONFile()["Users"];
    var Articles = readJSONFile()["Articles"];

    for (let i = 0; i < Articles.length; i++) {
        if (Articles[i].id === id) {
            Articles[i] = updatedArticle;
        }
    }
    writeJSONFile(Users, Articles);
    res.send(Articles);
})

app.listen(3000, () => { console.log("Our app is listing on port 3000") });

