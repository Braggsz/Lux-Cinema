<?php
// Подключение к SQLite базе данных
$db = new SQLite3('user_data.db');

// Получаем реферальный ID из URL
$ref = $_GET['ref'] ?? null;

if ($ref) {
    // Ищем пользователя по ID
    $stmt = $db->prepare('SELECT chat_id, referral_link FROM users WHERE chat_id = :ref');
    $stmt->bindValue(':ref', $ref, SQLITE3_INTEGER);
    $result = $stmt->execute()->fetchArray(SQLITE3_ASSOC);

    if ($result) {
        // Данные пользователя найдены
        $chat_id = $result['chat_id'];
        
        // Токен вашего бота
        $token = '7039961825:AAGmyb-lFESj2INpi81JWQAV9kgZwPBtJSU';
        
        // Сообщение для отправки
        $message = "По вашей реферальной ссылке кто-то перешёл на сайт!";
        
        // Отправка сообщения владельцу ссылки
        $url = "https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=" . urlencode($message);
        
        // Выполнение запроса
        file_get_contents($url);
        
        echo "Переход засчитан!";
    } else {
        echo "Неверный реферальный ID";
    }
} else {
    echo "Реферальный ID не найден";
}
?>
