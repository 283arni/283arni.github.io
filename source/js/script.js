
'use strict';

(function () {
  var buttons = document.querySelectorAll('.subscriptions__list-buttons button');
  var prices = document.querySelectorAll('.subscriptions__price span');
  var lessons = document.querySelector('#lessons');

  if (lessons) {
    var lessonsValue = parseInt(lessons.textContent, 10);
  }


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

    if (!selector) {
      return;
    }

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

(function () {
  var CHANGE_DAY_WEEK = 1;
  var timetable = document.querySelector('.timetable__wrapper');

  if (!timetable) {
    return;
  }

  var lessons = timetable.querySelector('.timetable__lessons');
  var trainings = lessons.querySelectorAll('div');
  var wrapper = timetable.querySelector('.timetable__shadow');
  var button = timetable.querySelector('button');
  var items = lessons.querySelectorAll('li');
  var timeZone = timetable.querySelectorAll('.timetable__time li');
  var dayZone = timetable.querySelectorAll('.timetable__week li');

  function addClassActive(elements, data) {
    elements.forEach(function (item, i) {
      if (i === data) {
        item.classList.add('active');
      }
    });
  }

  function removeClassActive(elements) {
    elements.forEach(function (item) {
      item.classList.remove('active');
    });
  }

  function openListClick() {
    dayZone.forEach(function (day) {
      day.classList.add('open');
      day.classList.remove('main-day');
      button.classList.add('active');
      wrapper.classList.add('open');
    });

    removeClassActive(trainings);
    button.addEventListener('click', closeListClick);
  }

  function closeListClick() {
    dayZone.forEach(function (day) {
      day.classList.remove('open');
      wrapper.classList.remove('open');
      button.classList.remove('active');
    });

    button.removeEventListener('click', closeListClick);
  }

  lessons.addEventListener('mouseover', function (evt) {
    if (evt.target.tagName !== 'LI') {
      return;
    }

    var time = +evt.target.dataset.time;
    var day = +evt.target.parentElement.dataset.day - CHANGE_DAY_WEEK;

    evt.target.classList.add('active');

    addClassActive(dayZone, day);
    addClassActive(timeZone, time);

  });

  lessons.addEventListener('mouseout', function (evt) {

    if (evt.target.tagName !== 'LI') {
      return;
    }

    evt.target.classList.remove('active');

    removeClassActive(timeZone);
    removeClassActive(dayZone);

  });


  items.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      evt.target.classList.toggle('choosed');
    });
  });


  dayZone.forEach(function (day, i) {
    trainings[0].classList.add('active');

    day.addEventListener('click', function () {
      addClassActive(trainings, i);
      day.classList.add('main-day');
      closeListClick();
    });
  });

  button.addEventListener('click', openListClick);
})();
