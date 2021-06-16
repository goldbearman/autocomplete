let inputValue = 'react';
fetch(`https://api.github.com/search/repositories?q=${inputValue}&per_page=5`)
    .then(response => response.json())
    .then(data => console.log(data.items));