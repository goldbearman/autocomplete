let inputValue = document.querySelector('.drop-down_menu__input');
let myWindow = document.querySelector('.window');
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

let descriptionElement = creatorAppendElement('div', 'description_element', myWindow);

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
    }
}

inputValue.addEventListener('input', debounce(linkNetWorkRequest, 500));

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

            function searchUnitsRemove() {
                createDescription(item);
                searchUnit.removeEventListener('click', searchUnitsRemove);
                searchUnits.remove();
            }

        searchUnit.addEventListener('click', searchUnitsRemove);
        });
        inputValue.after(searchUnits);
    }
}

function createDescription(objectItem) {
    inputValue.value = "";
    let repository = creatorAppendElement('div', 'repository', descriptionElement);
    let repositoryName = creatorAppendElement('p', 'repository__name', repository, `Name: ${objectItem.name}`);
    let repositoryOwner = creatorAppendElement('p', 'repository__owner', repository, `Owner: ${objectItem.owner.login}`);
    let repositoryStars = creatorAppendElement('p', 'repository__stars', repository, `Stars: ${objectItem.stargazers_count}`);
    let button = creatorAppendElement('button', 'repository__button', repository);

    function itemRemove() {
        repository.remove();
        button.removeEventListener('click', itemRemove);
    }

    button.addEventListener('click', itemRemove);
    descriptionElement.prepend(repository);
}

function creatorAppendElement(typeElement, elementClass, whereInsert, content) {
    let item = document.createElement(typeElement);
    item.classList.add(elementClass);
    whereInsert.append(item);
    if (content) item.innerHTML = content;
    return item;
}






