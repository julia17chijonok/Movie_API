const poster = document.querySelector('.movie__poster'),
      title = document.querySelector('.movie__title'),
      year = document.querySelector('.movie__year'),
      btn = document.querySelector('.loupe'),
      input = document.querySelector('#input-id'),
      parent = document.querySelector('.container');   

let num = 0;
let isEmpty = false;
let request = 'her';

 
class CardMovie{        
  constructor(src, title, year) {
    this.src = src;
    this.title = title;
    this.year = year;
  }
  render() {
    const element = document.createElement('div');
    element.innerHTML = `
      <div class="movie__poster-cover">
        <img class="movie__poster" src=${this.src} alt="">                   
      </div>
      <div class="info">
      <span class="movie__title">${this.title}</span>
      <span class="movie__year">${this.year}</span>
      </div>`;
      element.classList.add('movie');
      parent.append(element);
  }
}   

async function getData() {
  const res = await fetch(`https://www.omdbapi.com/?s=${request}&apikey=841a117d&page=1`);
  const data = await res.json();
  let movies = data['Search'];
  function showData(){
    for (let i = 0; i < movies.length; i++){
      const div = new CardMovie(`${(movies[i])['Poster']}`, `${(movies[i])['Title']}`, `${(movies[i])['Year']}`);
      div.render();
    }
  }
  showData();
}

getData();

input.addEventListener('input', () => {
    request = input.value;
    if (input.value == ''){
      isEmpty = false;
      btn.src = './assets/svg/loupe-search-svgrepo-com.svg';
    }
});

function makeSearch(){
    num++;
    let movies = document.querySelectorAll('.movie');
            movies.forEach(i => {
            i.remove();  
            });
    getData();
    isEmpty = true;
    btn.src = './assets/svg/cross-svgrepo-com.svg';
}
  
btn.addEventListener('click', (e) => {
if (!isEmpty){
    e.preventDefault();
    makeSearch();
} else {
    input.value = '';
    isEmpty = false;
    btn.src = './assets/svg/loupe-search-svgrepo-com.svg';
}
});
   
document.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        e.preventDefault();
        if (input.value){
        makeSearch();
        }
    }
});

console.log('60/60 \n\
1. Hа странице есть несколько карточек фильмов и строка поиска. На каждой карточке фильма есть постер и название фильма; \n\
2. В футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс; \n\
3. При загрузке приложения на странице отображаются карточки фильмов с полученными от API данными; \n\
4. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово; \n\
5. Поле поиска соответствует требованиям \n\
6. Дополнительный функционал: отображение даты выхода фильма');