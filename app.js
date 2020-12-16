const preloader = document.querySelector('.preloader-wrap');
const list = document.querySelector('.list');
const photos = document.querySelector('.photos');
const todos = document.querySelector('.todos');
const blockWrap = document.querySelector('.block-wrap');
let dataArr = [];

// const hidePreloader = () => {
//   preloader.classList.add('preloader-wrap_hidden');
// }

// setInterval(hidePreloader, 5000);

const renderListCard = (arr) => {
  arr.map(item => {
    const card = document.createElement('li');
    card.classList.add('list__card');

    const cardCloseBtn = document.createElement('button');
    cardCloseBtn.classList.add('block__close-btn');


    const cardId = document.createElement('p');
    cardId.classList.add('list__id');

    const cardName = document.createElement('p');
    cardName.classList.add('list__name');

    const cardAddress = document.createElement('p');
    cardAddress.classList.add('list__address');

    cardId.innerText += `ID: ${item.id}`;
    cardName.innerText += `Name: ${item.name}`;
    cardAddress.innerText += `Address: City: ${item.address.city} ,Street: ${item.address.street}`;
    cardCloseBtn.innerHTML = '&#215;';
    card.append(cardId, cardName, cardAddress, cardCloseBtn)
    list.append(card);
  });
}

const renderPhotosCard = (arr) => {
  arr.map(item => {
    const card = document.createElement('div');
    card.classList.add('photos__card');
    //
    const cardCloseBtn = document.createElement('button');
    cardCloseBtn.classList.add('block__close-btn');
    //
    const cardPict = document.createElement('img');
    cardPict.classList.add('photos__pict');
    //
    if (Math.random() <= 1 && Math.random() >= 0.5) {
      cardPict.src = item.thumbnailUrl;
      cardPict.alt += `ID: ${item.id}`;
      cardCloseBtn.innerHTML = '&#215;';
    } else if (Math.random() < 0.5) {
      cardPict.src = item.url;
      cardPict.alt += `ID: ${item.id}`;
      cardCloseBtn.innerHTML = '&#215;';
    }
    //
    card.append(cardPict, cardCloseBtn);
    photos.appendChild(card);
  });
}

const renderToDosCard = (arr) => {
  arr.map(item => {
    const card = document.createElement('li');
    card.classList.add('list__card');
    //
    const cardUserId = document.createElement('p');
    cardUserId.classList.add('list__user-id');
    //
    const cardId = document.createElement('p');
    cardId.classList.add('list__id');
    //
    const cardTilte = document.createElement('p');
    cardTilte.classList.add('list__title');
    //
    const cardCompleted = document.createElement('p');
    cardCompleted.classList.add('list__completed');
    //
    const cardCloseBtn = document.createElement('button');
    cardCloseBtn.classList.add('block__close-btn');
    //
    cardUserId.innerText += `User ID: ${item.userId}`
    cardId.innerText += `ID: ${item.id}`;
    cardTilte.innerText += `Title: ${item.title}`;
    if (item.completed)
      cardCompleted.innerText += 'Completed: ✔️';

    else
      cardCompleted.innerText += 'Completed: ❌'

    cardCloseBtn.innerHTML = '&#215;';
    //
    card.append(cardUserId, cardId, cardTilte, cardCompleted, cardCloseBtn);
    todos.appendChild(card);
  });
}

const ckeckEvent = (e) => {
  e.stopPropagation();
  const item = e.target;
  // console.log(e);

  if (item.classList[0] === 'block__close-btn') {
    const elem = item.parentElement;
    elem.remove();
  }

  if (item.classList[0] === 'block') {
    item.classList.add('block_hidden');
  }

  if (item.classList[0] === 'block-wrap') {
    const elem = document.querySelector('.block');
    elem.classList.remove('block_hidden');
  }
}

const getData = async (data) => {
  const getData = await fetch(`https://jsonplaceholder.typicode.com/${data}`);
  dataArr = await getData.json();
  return dataArr;
};

getData('users').then(val => {
  renderListCard(val);
});

getData('todos').then(val => {
  renderToDosCard(val);
});

getData('photos').then(val => {
  renderPhotosCard(val);
});

list.addEventListener('click', ckeckEvent);
photos.addEventListener('click', ckeckEvent);
blockWrap.addEventListener('click', ckeckEvent);