document.addEventListener('DOMContentLoaded', function() {
    // Создаем элемент для сообщения "Адрес скопирован"
    var alertBox = document.createElement('div');
    alertBox.id = 'regSuccessfull';
    alertBox.textContent = 'Регистрация прошла успешна';
    document.body.appendChild(alertBox);


    // переменная для хранения таймаута
    var hideTimeout;

    // Добавляем слушатель события click
    e.preventDefault(); // Отменяем действие по умолчанию (переход по ссылке)

        // Останавливаем текущий таймаут (если он существует)

        // Показываем сообщение
    clearTimeout(hideTimeout);

        // Копирование адреса в буфер обмена
    alertBox.style.display = 'block';
        // небольшая задержка перед началом анимации
    setTimeout(function() {
        alertBox.style.opacity = '1';
        alertBox.style.transform = 'translateX(-50%) translateY(0%)';
    }, 20);

        // Скрываем сообщение через 2 секунды
    hideTimeout = setTimeout(function() {
        alertBox.style.opacity = '0';
        alertBox.style.transform = 'translateX(-50%) translateY(-100%)';
        setTimeout(function() {
            alertBox.style.display = 'none';
            }, 500);
        }, 2000);
    });
});
