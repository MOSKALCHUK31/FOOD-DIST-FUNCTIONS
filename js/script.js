//Tabs
//

const tabs = document.querySelectorAll('.tabcontent'),
      parent = document.querySelector('.tabcontainer'),
      items = document.querySelectorAll('.tabheader__item');

function hideTab() {
    tabs.forEach(function(item) {
        item.style.display = 'none';
    });

    items.forEach(function(item){
        item.classList.remove('tabheader__item_active');
    });
}

function showTab(i = 0) {
    tabs[i].style.display = 'block';
    items[i].classList.add('tabheader__item_active');
}

parent.addEventListener ('click', (event) => {
    const target = event.target;
    if(target && target.classList.contains('tabheader__item')) {
        items.forEach(function (item, i) {
            if(target == item) {
                hideTab();
                showTab(i);
            } 
        });
    }
});

hideTab();
showTab();

//Timer
//

const deadline = '2021-07-30';

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );
          
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZero(num) {
    if (num >= 0 && num < 10)
        return `0${num}`;
    else
        return num;
}

function setClock(selector, endtime) {
    const timer = document.querySelector('.timer'),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) 
            clearInterval(timeInterval);
    }
}

setClock('.timer', deadline);

//Modal
//

const modal = document.querySelector('.modal'),
      btnModal = document.querySelectorAll('[modal__dialog]'),
      triggerModal = document.querySelector('[modal__close]');

function fnOpenModal () {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    clearInterval(modalTimer);
}

function fnCloseModal () {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

btnModal.forEach(el => {
    el.addEventListener('click', fnOpenModal);
});

triggerModal.addEventListener('click',fnCloseModal);

modal.addEventListener('click', (e) => {
    if (e.target == modal)
        fnCloseModal();
});

document.addEventListener ('keydown', (e) => {
    if (e.code == "Escape")
        fnCloseModal();
});

//Modal modification
//

const modalTimer = setInterval(fnOpenModal, 3000);

function showModalByScroll () {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        fnOpenModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);
