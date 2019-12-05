run command
-----------
node app.js

api get all questions(through browser)
----------------------
http://localhost:5200/questions

api get question by name(through browser)
------------------------
http://localhost:5200/questions?question="What is JavaScript?"


api post question(through postman)
-----------------
method:post
url:http://localhost:5200/questions
body:
{
    question:'test question'
    answer:'test answer
}

