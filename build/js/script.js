'use strict';

(function () {
  var START_BUTTON = 0;

  var buttons = document.querySelectorAll('.subscriptions__list-buttons button');
  var items = document.querySelectorAll('.subscriptions__items');

  if (!buttons || !items) {
    return;
  }

  function cleanClassActive() {
    buttons.forEach(function (button, i) {
      button.classList.remove('active');
      items[i].classList.remove('active');
    });
  }

  buttons.forEach(function (button, i) {

    if (i === START_BUTTON) {
      button.classList.add('active');
    }

    button.addEventListener('click', function () {
      cleanClassActive();

      button.classList.add('active');
      items[i].classList.add('active');
    });
  });
})();

(function () {
  var Numeral = {
    START: 0,
    CORRECTOR: 1,
    DIVIDE: 100
  };

  var Control = {
    PREV: 'prev',
    NEXT: 'next'
  };

  var Swipe = {
    RIGHT: 'right',
    LEFT: 'left'
  };


  var jquery = window.jQuery;
  var isMobile = new window.MobileDetect(window.navigator.userAgent).mobile();
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
    var currentItem = Numeral.START;
    var steps = (parseInt(getComputedStyle(item).minWidth, 10) * items.length) / Numeral.DIVIDE;

    if (isMobile) {
      jquery(sliderList).swipe({
        swipe: function (event, direction) {
          switch (direction) {
            case Swipe.RIGHT:
              sliderGo(Control.PREV);
              break;
            case Swipe.LEFT:
              sliderGo(Control.NEXT);
              break;
          }
        }
      });
    }

    btnLeft.addEventListener('click', function (e) {
      e.preventDefault();
      sliderGo(Control.PREV);

    });

    btnRight.addEventListener('click', function (e) {
      e.preventDefault();
      sliderGo(Control.NEXT);

    });


    function sliderGo(way) {
      if (way === Control.NEXT) {
        currentItem++;
      }

      if (way === Control.PREV) {
        currentItem--;
      }

      if (currentItem === steps) {
        currentItem = Numeral.START;
      }

      if (currentItem < Numeral.START) {
        currentItem = steps - Numeral.CORRECTOR;
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

(function () {
  var links = document.querySelectorAll('[href^="#"]');
  var speed = 0.5;

  if (!links) {
    return;
  }

  links.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      evt.preventDefault();

      var anchor = document.querySelector(item.getAttribute('href'));
      var coordAnchor = anchor.getBoundingClientRect().top;
      var windowY = window.pageYOffset;

      var start = null;

      requestAnimationFrame(step);

      function step(time) {
        if (start === null) {
          start = time;
        }
        var progress = time - start;

        var coordY =
          coordAnchor < 0
            ? Math.max(windowY - progress / speed, windowY + coordAnchor)
            : Math.min(windowY + progress / speed, windowY + coordAnchor);

        window.scrollTo(0, coordY);
        if (coordY !== windowY + coordAnchor) {
          requestAnimationFrame(step);
        }
      }
    });
  });
})();
