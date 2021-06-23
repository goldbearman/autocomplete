let inputValue = document.querySelector('.drop-down_menu__input');
let myWindow = document.querySelector('.window');
let description_element__item = document.querySelector('.description_element__item');
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

let description_element = creatorAppendElement('div','description_element',myWindow);

let linkNetWorkRequest = function networkRequest() {
    if (inputValue.value.trim() !== "") {
        fetch(`https://api.github.com/search/repositories?q=${inputValue.value}&per_page=5&sort=stars`)
            .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                }
            )
            .then(data => {
                if (data !== undefined) {
                    createItem(data.items);
                }
                ;
            });
    } else searchUnits.remove();
}

inputValue.addEventListener('input', debounce(linkNetWorkRequest,500) );

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
    let descriptionElementItem = creatorAppendElement('div','description_element__item',description_element);
    let p1 = creatorAppendElement('p','p',descriptionElementItem,`Name: ${objectItem.name}`);
    let p2 = creatorAppendElement('p','p',descriptionElementItem,`Name: ${objectItem.owner.login}`);
    let p3 = creatorAppendElement('p','p',descriptionElementItem,`Name: ${objectItem.stargazers_count}`);
    let button = creatorAppendElement('button','close-button',descriptionElementItem);

    function itemRemove() {
        descriptionElementItem.remove();
        button.removeEventListener('click', itemRemove);
    }
    button.addEventListener('click', itemRemove);
    description_element.prepend(descriptionElementItem);
}

function creatorAppendElement(typeElement,elementClass,whereInsert,content) {
    let item = document.createElement(typeElement);
    item.classList.add(elementClass);
    whereInsert.append(item);
    if(content) item.innerHTML = content;
    return item;
}






