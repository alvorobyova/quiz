// функция берет значения из адресной строки
function checkUserData() {
    const url = new URL(location.href);
    const name = url.searchParams.get('name');
    const lastName = url.searchParams.get('lastName');
    const email = url.searchParams.get('email');

    // если значений нет(хотя бы одного), то отправляет на главную страницу
    if (!name || !lastName || !email) {
        location.href = 'index.html';
    }

}