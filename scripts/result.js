(function () {
    const Result = {
        // watchAnswersElement: null,

        init() {
            // const url = new URL(location.href);
            // document.getElementById('result-score').innerText = url.searchParams.get('score') + '/' + url.searchParams.get('total');

            // переделка на sessionStorage
            document.getElementById('result-score').innerText = sessionStorage.getItem('score') + '/' + sessionStorage.getItem('total');

            document.getElementById('watch').onclick = function() {
                this.setAttribute('href', 'answers.html')
            }
            // this.watchAnswers();
        },
       /* watchAnswers() {
            const url = new URL(location.href);
            const userChosenAnswers = url.searchParams.get('userChosenAnswers');
            this.watchAnswersElement = document.getElementById('watch');
            this.watchAnswersElement.onclick = () => {
                location.href = 'answers.html?userChosenAnswers=' + userChosenAnswers;

                /!*sessionStorage.setItem('userChosenAnswers', userChosenAnswers);
                location.href = 'answers.html';*!/
            }
        }*/
    }

    Result.init();
})();