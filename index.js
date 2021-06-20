let inputValue = document.querySelector('.drop-down_menu__input');
let description_element = document.querySelector('.description_element');
let description_element__item = document.querySelector('.description_element__item');
let button_close = document.querySelector('.close-button');
let searchUnits;

const debounce = (fn, debounceTime) => {
    let timeOut;
    return function () {
        const fnCall = () => {
            fn.apply(this, arguments)
        };
        clearTimeout(timeOut);
        timeOut = setTimeout(fnCall, debounceTime);
    }
};

inputValue.addEventListener('keyup', debounce(networkRequest,500) );

function networkRequest() {
    if (inputValue.value.trim() !== "") {
        console.log(inputValue.value + "  first");
        fetch(`https://api.github.com/search/repositories?q=${inputValue.value}&per_page=5&sort=stars`)
            .then(response => {
                    console.log("resp")
                    if (response.ok) {
                        return response.json();
                    }
                }
            )
            .then(data => {
                console.log("dat")
                if (data !== undefined) {
                    createItem(data.items);
                }
                ;
            });
    } else searchUnits.remove();
}

function createItem(arrItems) {
    if (searchUnits !== undefined) {
        searchUnits.remove();
    }
    if (arrItems !== undefined) {
        searchUnits = document.createElement('div');

        arrItems.forEach(item => {
            let searchUnit = document.createElement('div');
            searchUnit.classList.add('drop-down_menu__searchUnit');
            searchUnit.innerHTML = item.name;
            searchUnits.append(searchUnit);
            searchUnit.addEventListener('click', () => createDescription(item));
        });
        inputValue.after(searchUnits);
    }
}

function createDescription(objectItem) {
    inputValue.value = "";
    if (searchUnits !== undefined) {
        searchUnits.remove();
    }
    let item = description_element__item.cloneNode(true);
    item.style.display = 'block';
    let name = item.querySelector('p');
    let button = item.querySelector('button');
    name.innerHTML = `Name: ${objectItem.name} <br>
    Owner: ${objectItem.owner.login} <br>
    Stars: ${objectItem.stargazers_count}`;
    button.addEventListener('click', () => item.remove());
    description_element.prepend(item);
}




