const express = require("express");
const app = express();
const cors = require('cors');
const fs = require('fs');
const bodyParser = require("body-parser");
const port = process.env.PORT || 5200;


// CORS Middleware
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//get questions and question by name
app.get('/questions', (request, response) => {
    const questions = loadQuestions()
    if (request.query && request.query.question) {
        const query_question = JSON.parse(request.query.question)
        const filteredQuestion = questions.filter((ques) => {
            if (ques.question == query_question) {
                return ques
            }
        })
        if (filteredQuestion.length === 0) {
            response.send([])
        } else {
            response.send(filteredQuestion)
        }
    } else {
        try {
            const dataBuffer = fs.readFileSync('questions.json');
            const dataJson = dataBuffer.toString();
            response.send(JSON.parse(dataJson))
        }
        catch (e) {
            response.send([])
        }
    }
})

//post questions
app.post('/questions', (request, response) => {
    const questions = loadQuestions()
    const question = request.body.question;
    const answer = request.body.answer;
    const duplicateQuestions = questions.filter((ques) => {
        return ques.question === question
    })
    if (duplicateQuestions.length === 0) {
        questions.push({
            question: question,
            answer: answer
        })
        saveQuestion(questions)
        response.send('new question added')
    } else {
        response.send('question already exist')
    }
});

app.get('/questions')


app.listen(port, function () {
    console.log("Started on PORT " + port);
})

const loadQuestions = () => {
    try {
        const dataBuffer = fs.readFileSync('questions.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson)
    }
    catch (e) {
        return []
    }
}

const saveQuestion = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('questions.json', dataJson)
}