document.querySelector(".sign-up-form").addEventListener('submit', function(event) {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const code = event.target.confirmationCode.value;

    if (!username || !email || !password || !confirmPassword || !code) {
        displayError('Будь ласка, заповніть усі поля');
        return;
    }

    if (password.length < 6) {
        displayError('Пароль має бути довжиною не менше 6 символів');
        return;
    }

    if (password !== confirmPassword) {
        displayError('Паролі не збігаються');
        return;
    }

    // Проверка кода подтверждения перед регистрацией
    fetch('/verify-confirmation-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            code: code
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message !== 'Code verified') {
            throw new Error('Неправильний код підтвердження');
        }
        return fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
        });
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Registration successful') {
            localStorage.setItem('isUserLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            localStorage.setItem('currentEmail', email);
            displayMessage('Реєстрація пройшла успішно', true);
        } else {
            displayError('Такий емайл вже зареєстрований!');
        }
    })
    .catch(error => {
        displayError(error.message);
    });
});

document.querySelector(".sign-in-form").addEventListener('submit', function(event) {
    event.preventDefault();

    const username = event.target.querySelector('input[type="text"]').value;
    const password = event.target.querySelector('input[type="password"]').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            localStorage.setItem('isUserLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            displayMessage('Удача!', true);
        } else {
            displayError('Помилка, перевірте ваші дані!');
        }
    })
    .catch(error => {
        console.error('Сталася помилка під час входу:', error);
    });
});
function displayError(message) {
    displayMessage(message, false);
}

function displayMessage(message, isSuccess, redirect = true) {
    var alertBox = document.createElement('div');
    alertBox.id = isSuccess ? 'success' : 'error';
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    alertBox.style.display = 'block';

    setTimeout(function() {
        alertBox.style.opacity = '1';
        alertBox.style.transform = 'translateX(-50%) translateY(0%)';
    }, 20);

    setTimeout(function() {
        alertBox.style.opacity = '0';
        alertBox.style.transform = 'translateX(-50%) translateY(-100%)';
        setTimeout(function() {
            alertBox.style.display = 'none';
            if (isSuccess && redirect) {
                window.location.href = '../index.html';
            }
        }, 500);
    }, 2000);
}

function isValidEmail(email) {
    // Регулярное выражение для проверки емейла
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}
