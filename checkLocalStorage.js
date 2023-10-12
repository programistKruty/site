window.addEventListener('DOMContentLoaded', (event) => {
    // Проверяем, залогинен ли пользователь
    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');

    if (isUserLoggedIn === 'true') {
        // Если пользователь уже залогинен, перенаправляем его на главную страницу
        window.location.href = '../account/account.html';
    }
});
