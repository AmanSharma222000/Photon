const auth = "563492ad6f91700001000001922087f48256421ab1f84b3c55942ba0";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
  const form = document.getElementById('form');
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let currentSearch;


function logSubmit(event) {
    event.preventDefault();
    console.log("working");
}
function updateInput(e){
    console.log("update " + e.target.value);
    searchValue = e.target.value;
}


//Event Listeners
searchInput.addEventListener('input', updateInput);
form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("working");
    currentSearch = searchValue;
    searchPhotos(searchValue);
})

more.addEventListener('click', loadMore);


async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await dataFetch.json();
    return data;
}

function generatPictures(data){
    console.log(data.photos);
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src=${photo.src.large}>
            <div class="gallery-info">
                <p>${photo.photographer}</p>
                <a href=${photo.src.original}>Download</a>
            </div>
            `;
        gallery.appendChild(galleryImg);
        
    })

}
async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15"
    const data = await fetchApi(fetchLink);
    generatPictures(data);
}

async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=10`;
    const data = await fetchApi(fetchLink);
    generatPictures(data);
}

function clear(){
    gallery.innerHTML="";
    searchInput.value="";
}

async function loadMore() {
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=10&page=${page}`;
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatPictures(data);
}
curatedPhotos();

