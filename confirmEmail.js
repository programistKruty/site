document.getElementById("confirmEmailBtn").addEventListener('click', function() {
    const email = document.querySelector("input[name='email']").value;
    if (!email) {
        displayError('Будь ласка, введіть емейл');
        return;
    }

    fetch('/send-confirmation-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Code sent') {
            displayMessage('Код був відправлен', true, false)
            document.getElementById('confirmEmailBtn').classList.add('hidden');
            document.getElementById('confirmationCodeField').classList.remove('hidden');
        } else {
            displayError('Помилка при відправці коду');
        }
    })
    .catch(error => {
        console.error('Сталася помилка:', error);
    });
});
