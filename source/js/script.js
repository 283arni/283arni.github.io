
'use strict';

(function () {
  var buttons = document.querySelectorAll('.subscriptions__list-buttons button');
  var prices = document.querySelectorAll('.subscriptions__price span');
  var lessons = document.querySelector('#lessons');
  var lessonsValue = parseInt(lessons.textContent, 10);

  function cleareActive() {
    buttons.forEach(function (button) {
      button.classList.remove('active');
    });
  }

  function changePrices(money, amountMoths) {
    money.forEach(function (price) {
      var priceValue = +price.dataset.value;
      var newPrice = priceValue * amountMoths;
      price.textContent = newPrice;
    });
  }

  buttons.forEach(function (button) {
    var buttonValue = +button.dataset.value;

    button.addEventListener('click', function () {
      cleareActive();

      button.classList.add('active');


      lessons.textContent = (lessonsValue * buttonValue) + ' занятий';
      changePrices(prices, buttonValue);
    });
  });
})();
