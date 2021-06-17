let inputValue = document.querySelector('.window__input');

let searchUnit = document.createElement('div');
searchUnit.classList.add('window__searchUnit');
inputValue.after()

fetch(`https://api.github.com/search/repositories?q=${inputValue.value}&per_page=5`)
    .then(response => response.json())
    .then(data => console.log(data.items));