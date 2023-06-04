// самовызывющаяся функция – для того, чтобы объекты не были доступны как глобальные

(function () {
    const Form = {
        agreeElement: null, //чекбокс
        processElement: null, //кнопка
        // работа с полями (для валидации, все текстовые инпуты, кроме чекбокса)
        fields: [
            {
                name: 'name',
                id: 'name',
                element: null,
                regex: /^[А-Я][a-я]+\s*$/,
                valid: false,
            },
            {
                name: 'lastName',
                id: 'last-name',
                element: null,
                regex: /^[А-Я][a-я]+\s*$/,
                valid: false,
            },
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            },
        ],


        // функция первичной настройки страницы (инициализация, какие-то определенные действия для запуска процесса функционала, чтобы мы могли пользоваться страницей)
        init() {
            const that = this; // здесь помещаем текущий контекст(ссылка на объект Form) в эту переменную, c помощью этого мы можем обращаться к this в любом месте, будет работать замыкание

            // проход по каждому элементу массива. в результате в свойство element разместится нужный элемент, который будет найден по id
            this.fields.forEach(item => {
                item.element = document.getElementById(item.id);
                item.element.onchange = function () {
                    // that.validateField.call(); // <- таким образом контекст теряется, поэтому ввели переменную that
                    that.validateField.call(that, item, this); //
                }
            });

            this.processElement = document.getElementById('process');
            this.processElement.onclick = function () {
                that.processForm();
            };

            this.agreeElement = document.getElementById('agree');
            this.agreeElement.onchange = function () {
                that.validateForm();
            }
        },
        // при изменения значения в каждом инпуте будет вызываться функция
        validateField(field, element) {
            if (!element.value || !element.value.match(field.regex)) {
                element.parentNode.style.borderColor = 'red';
                field.valid = false;
            } else {
                element.parentNode.removeAttribute('style');
                field.valid = true;
            }
            this.validateForm();
        },
        // функция, которая будет активировать нажатие кнопки, когда все поля валидны
        validateForm() {
            const validForm = this.fields.every(item => item.valid);
            const isValid = this.agreeElement.checked && validForm;
            if (isValid) {
                this.processElement.removeAttribute('disabled');
            } else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
            return isValid;
        },
        processForm() {
            if (this.validateForm()) {

                let paramString = '';
                this.fields.forEach( item => {
                    paramString += (!paramString ? '?' : '&') + item.name + '=' + item.element.value;
                })
                location.href='choice.html' + paramString;

                /*this.fields.forEach(item => {
                    sessionStorage.setItem(item.name, item.element.value);
                });
                location.href = 'choice.html';*/

                sessionStorage.setItem('name', this.fields[0].element.value);
                sessionStorage.setItem('lastName', this.fields[1].element.value);
                sessionStorage.setItem('email', this.fields[2].element.value);


            }
        }
    };

    Form.init();
})(); // закрытая область видимости, к которой у пользователя никогда не будет доступа
// !!не получится получить доступ к коду в этом файле из другого файла