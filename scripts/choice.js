(function () {

    const Choice = {

        // сюда будут попадать данные в процессе парсинга
        quizzes: [],


        init() {
            // проверка данных пользователя (то, что в строке адреса)
            checkUserData();

            // запрос на сервер

            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://testologia.site/get-quizzes', false);
            xhr.send();

            if (xhr.status === 200 && xhr.responseText) {
                try {
                    this.quizzes = JSON.parse(xhr.responseText);
                } catch (e) {
                    location.href = 'index.html';
                }
                // результаты, полученные с бэкенда, отображаем на странице
                this.processQuizzes();
            } else {
                location.href = 'index.html';
            }
        },
        processQuizzes() {
            console.log(this.quizzes);
            const choiceOptionsElement = document.getElementById('choice-options');

            if (this.quizzes && this.quizzes.length > 0) {
                this.quizzes.forEach(quiz => {
                    const that = this;

                    const choiceOptionElement = document.createElement('div');
                    choiceOptionElement.className = 'choice-option';
                    choiceOptionElement.setAttribute('data-id', quiz.id);

                    // выбор теста
                    choiceOptionElement.onclick = function () {
                        that.chooseQuiz(this)
                    }

                    const choiceOptionTextElement = document.createElement('div');
                    choiceOptionTextElement.className = 'choice-option-text';
                    choiceOptionTextElement.innerText = quiz.name;

                    const choiceOptionArrowElement = document.createElement('div');
                    choiceOptionArrowElement.className = 'choice-option-arrow';
                    const choiceOptionImageElement = document.createElement('img');
                    choiceOptionImageElement.setAttribute('src', 'img/arrow.png');
                    choiceOptionImageElement.setAttribute('alt', 'Стрелка');

                    //перемещение объектов
                    choiceOptionArrowElement.appendChild(choiceOptionImageElement);
                    choiceOptionElement.appendChild(choiceOptionArrowElement);
                    choiceOptionElement.appendChild(choiceOptionTextElement);

                    choiceOptionsElement.appendChild(choiceOptionElement);


                })
            }


        },
        chooseQuiz(element) {
            const dataId = element.getAttribute('data-id');
            if(dataId) {
                // location.href='test.html' + location.search + '&id=' + dataId;

                sessionStorage.setItem('testId', dataId);
                location.href = 'test.html' + location.search;
            }
            // console.log(element);
        }
    }
    Choice.init();

})();