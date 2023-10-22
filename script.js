const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('search-more');

const accessKey = 'Z19PhQV0BwsZSXZSvLCYMUojfSHEQyDEuAzaOfNOJhA';
let keyword = '';
let page = 1;

const searchImages = async () => {
    keyword = searchBox.value.trim(); 
   
    if (!keyword) {
        alert('Empty Input..!!')
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);

        if (page === 1) {
            searchResult.innerHTML = ''; // Clear previous results
        }

        let results = data.results;
        results.forEach((result) => {
            const image = document.createElement('img');
            image.src = result.urls.small;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = '_blank';

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        showMoreBtn.style.display = 'block';

    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error (e.g., display an error message to the user)
    }
};

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchImages();
});

showMoreBtn.addEventListener('click', () => {
    page++;
    searchImages();
});
