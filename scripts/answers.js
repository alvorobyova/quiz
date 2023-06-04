(function () {
    const Answers = {
        quiz: null,
        correctAnswers: [],
        chosenAnswerIndexes: [],
        correctAnswerIndexes: [],


        init() {
            const testId = sessionStorage.getItem('testId');

            if (testId) {
                this.quiz = this.getData(testId, 'https://testologia.site/get-quiz?id=');
                this.correctAnswers = this.getData(testId, 'https://testologia.site/get-quiz-right?id=');
            } else {
                location.href = 'index.html';
            }
            this.showTestTitle();
            this.showUserSession();

            let answersId = [];

            if(this.correctAnswers && this.correctAnswers.length > 0) {
                this.correctAnswers = this.correctAnswers.map(item => item.toString());
                for (let i = 0; i< this.correctAnswers.length; i++) {
                    answersId = sessionStorage.getItem(i);
                    if(answersId) {
                        answersId = answersId.split(',').map(item =>{
                            return (item) ? item : null;
                        });
                    } else {
                        answersId = [];
                    }
                    let chosenAnswer = answersId.pop();
                    let correctAnswer = this.correctAnswers[i];

                    if(correctAnswer) {
                        let correctAnswerIndex = answersId.findIndex(answer => answer === correctAnswer);
                        if(correctAnswerIndex > -1) {
                            this.correctAnswerIndexes.push(correctAnswerIndex);
                        }
                    } else {
                        this.correctAnswerIndexes.push(null);
                    } if(chosenAnswer) {
                        let chosenAnswerIndex = answersId.findIndex(answer => answer === chosenAnswer);
                        if(chosenAnswer >-1) {
                            this.chosenAnswerIndexes.push(chosenAnswerIndex);
                        }
                    } else {
                        this.chosenAnswerIndexes.push(null);
                    }
                }
            }

            if(this.quiz && this.quiz.questions.length > 0) {
                const questions = document.getElementById('questions');
                questions.innerHTML = '';
                let chosenAnswerIndex;
                let correctAnswerIndex;
                this.quiz.questions.forEach((questionItem, questionIndex) => {
                    const question = document.createElement('div');
                    question.className = 'test-question';
                    const questionTitle = document.createElement('div');
                    questionTitle.className = 'test-question-title';
                    questionTitle.innerHTML=`<span>Вопрос ${questionIndex + 1}:</span> ${questionItem.question}`;

                    const questionOptions = document.createElement('div');
                    questionOptions.className = 'test-question-options';
                    question.appendChild(questionTitle);
                    question.appendChild(questionOptions);
                    questions.appendChild(question);

                    chosenAnswerIndex = this.chosenAnswerIndexes[questionIndex];
                    correctAnswerIndex = this.correctAnswerIndexes[questionIndex];
                    questionItem.answers.forEach((answerItem, answerIndex) => {
                        const optionElement = document.createElement('div');
                        optionElement.className = 'test-question-option';
                        if(answerIndex === chosenAnswerIndex) {
                            optionElement.classList.add(answerIndex === correctAnswerIndex ? 'correct' : 'wrong');
                        }
                        const answerElement = document.createElement('div');
                        answerElement.className = 'option-answer';
                        optionElement.appendChild(answerElement);
                        optionElement.append(answerItem.answer);
                        questionOptions.appendChild(optionElement);
                    })
                })
            }
        },
        showTestTitle() {
            document.getElementById('pre-title').innerText = this.quiz.name;
        },
        showUserSession() {
            const name = sessionStorage.getItem('name');
            const lastName = sessionStorage.getItem('lastName');
            const email = sessionStorage.getItem('email');

            document.getElementById('user-info').innerText = name + ' ' + lastName + ', ' + email;
        },
        getData(testId, url) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url + testId, false);
            xhr.send();

            if (xhr.status === 200 && xhr.responseText) {
                try {
                    return JSON.parse(xhr.responseText);
                } catch (e) {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }
        },
    }

    Answers.init();
})();