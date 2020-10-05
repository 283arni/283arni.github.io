
'use strict';

(function () {
  var buttons = document.querySelectorAll('.subscriptions__list-buttons button');
  var prices = document.querySelectorAll('.subscriptions__price span');
  var lessons = document.querySelector('#lessons');
  var lessonsValue = parseInt(lessons.textContent, 10);

  function cleanClassActive() {
    buttons.forEach(function (button) {
      button.classList.remove('active');
    });
  }

  function changePrices(money, amountMoths) {
    money.forEach(function (price) {
      var priceValue = +price.dataset.value;
      price.textContent = priceValue * amountMoths;
    });
  }

  buttons.forEach(function (button) {
    var buttonValue = +button.dataset.value;

    button.addEventListener('click', function () {
      cleanClassActive();

      button.classList.add('active');


      lessons.textContent = (lessonsValue * buttonValue) + ' занятий';
      changePrices(prices, buttonValue);
    });
  });
})();

(function () {

  var Numbers = {
    START: 0,
    СORRECTER: 1,
    DEVIDE: 100
  };

  var Controls = {
    PREV: 'prev',
    NEXT: 'next'
  };

  var sliderReviews = document.querySelector('#slider-reviews');
  var slider = document.querySelector('#slider');

  function createSlider(selector) {
    var items = selector.querySelectorAll('.slider-wrapper>ul>li');
    var item = items[0];
    var sliderList = selector.querySelector('.slider-wrapper ul');
    var btnLeft = selector.querySelector('button:first-of-type');
    var btnRight = selector.querySelector('button:last-of-type');
    var currentItem = Numbers.START;
    var steps = (parseInt(getComputedStyle(item).minWidth, 10) * items.length) / Numbers.DEVIDE;

    btnLeft.addEventListener('click', function (e) {
      e.preventDefault();
      sliderGo(Controls.PREV);
    });

    btnRight.addEventListener('click', function (e) {
      e.preventDefault();
      sliderGo(Controls.NEXT);
    });


    function sliderGo(way) {
      if (way === Controls.NEXT) {
        currentItem++;
      }

      if (way === Controls.PREV) {
        currentItem--;
      }

      if (currentItem === steps) {
        currentItem = Numbers.START;
      }

      if (currentItem < Numbers.START) {
        currentItem = steps - Numbers.СORRECTER;
      }

      translate();
    }

    function translate() {
      sliderList.style.transform = 'translateX(-' + currentItem + '00%)';
    }
  }

  createSlider(slider);
  createSlider(sliderReviews);
})();
