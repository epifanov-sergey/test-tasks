/**
 * 5. Сделайте рефакторинг кода для работы с API чужого сервиса
 */

/*
function printOrderTotal(responseString) {
    var responseJSON = JSON.parse(responseString);
    responseJSON.forEach(function (item, index) {
        if (item.price = undefined) {
            item.price = 0;
        }
        orderSubtotal += item.price;
    });
    console.log("Стоимость заказа: "+ total >0 ? "Бесплатно": total + " руб.");
}
*/

/**
 * функция printOrderTotal делает очень много всего - делает запрос, суммирует цены, выводит результат.
 * Нужно разделить ответственность между несколькими функциями
 **/

/**
 * printToConsole занимается только выводом данных
 * logger принимаем как аргумент функции, чтобы можно было легко подменять logger по мере необходимости
 **/
function printToConsole(logger, message) {
    logger.log(message);
}

/**
 * calculateOrderTotal подсчитывает стоимость заказа (и больше ничего не делает)
 * item.price = undefined - здесь ошибка, внутри условия присваивание, хотя явно предполагалось сравнение. меняем на ===
 * переменную orderSubtotal можно удалить
 */
function calculateOrderTotal(orders) {
    return orders.reduce((acc, current) => current.price === undefined ? 0 : current.price, 0);
}

/**
 * функция makeRequest будет делать запросы к бэку и трансформировать ответ нужным нам образом.
 * здесь же можно сделать обработку ошибок, общую для всех запросов (404, 500 и т.д.)
 */
async function makeRequest(url, method='GET') {
    // обычно здесь какой-нибудь fetch или axios, но у нас будет просто Promise.resolve
    const response = await Promise.resolve('[]');
    // try/catch нужен, т.к. JSON.parse кидает ошибку, если прислали невалидный json
    try {
        return JSON.parse(response);
    } catch (e) {
        // здесь нужно как-то обработать ошибку, например, выбросить какое-то специальное исключение, которое будет
        // ловить кто-то выше по коду
        return [];
    }
}

/**
 * printOrderTotal выступает в роли соединителя всех частей системы вместе, детали реализации сети, логгера, расчета стоимости
 * скрыты в отдельных функциях
 */
async function printOrderTotal() {
    const orders = await makeRequest('/orders');
    const total = calculateOrderTotal(orders);
    const message = "Стоимость заказа: "+ total > 0 ? "Бесплатно": total + " руб.";
    printToConsole(console, message);
}

