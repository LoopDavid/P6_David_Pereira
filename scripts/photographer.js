let params = new URLSearchParams(window.location.search);
const idPhotographer = parseInt(params.get('id'));
const headerDetails = document.getElementById("header-details");
const priceDetails = document.getElementById('bot-container');
const likeTotal = document.getElementById('total-like');
var response = null;


function afficherDetails(photographer) {
               
    const detailsElement = document.getElementById('page-loc');

    // afficher les détails du photographe
    const photographerName = document.getElementById('name');
    photographerName.textContent = photographer.name;
    headerDetails.appendChild(photographerName);

    // afficher details 
    const photographerCity = document.getElementById('city');
    photographerCity.textContent = photographer.city;
    detailsElement.appendChild(photographerCity);

    const photographerTagline = document.getElementById('tagline');
    photographerTagline.textContent = photographer.tagline;
    detailsElement.appendChild(photographerTagline);

    const containerImg = document.getElementById('header-page_img');
    const photographerImg = document.createElement('img');
    photographerImg.className = "header_img";
    photographerImg.src = "/Sample Photos/Photographers ID Photos/" + photographer.portrait;
    containerImg.appendChild(photographerImg);

    const containerPriceLike = document.createElement('div');
    containerPriceLike.className = "botContainer_counter";
    priceDetails.appendChild(containerPriceLike);

    // const likeTotal = document.getElementById('total-like');
    // likeTotal.innerHTML = "22222";
    // containerPriceLike.appendChild(likeTotal);

    const heartTotal = document.getElementById('like_counter');
    containerPriceLike.appendChild(heartTotal);

    const photographerPrice = document.getElementById('photographer_price');
    photographerPrice.innerHTML = photographer.price + "€ / jour";
    priceDetails.appendChild(photographerPrice);

}

function buildCards(data, photographer) {
    data.media.filter(media => media.photographerId === idPhotographer ).forEach(media => {
        const cardContent = document.getElementById('page-content-photo');
            
            // creation de la card
            const card = document.createElement('div');
            card.className = "page-card";
            cardContent.appendChild(card);
            
            const cardImg = document.createElement('img');
            cardImg.className = "page-card_img";
                if(media.image) { cardImg.src = "/Sample Photos/" + photographer.name + "/" + media.image}
                else {cardImg.src = "/Sample Photos/" + photographer.name + "/" + media.video};
                
                
            card.appendChild(cardImg);

            const cardLike = document.createElement('div');
            cardLike.className = 'page-card_like';
            card.appendChild(cardLike);

            const cardName = document.createElement('p');
            cardName.className = "page-card_name";
            cardName.innerHTML = media.title;
            cardLike.appendChild(cardName);

            const cardLikeCounter = document.createElement('div');
            cardLikeCounter.className = "page-card_counter";
            cardLike.appendChild(cardLikeCounter);

            const cardLikeCounterNumber = document.createElement('p');
            cardLikeCounterNumber.className = "like_numbers";
            cardLikeCounterNumber.id = "number-like-media-" + media.id;
            cardLikeCounterNumber.innerHTML = media.likes;
            cardLikeCounter.appendChild(cardLikeCounterNumber);

            const cardLikeCounterLike = document.createElement('i');
            cardLikeCounterLike.className = "fas fa-heart";
            cardLikeCounterLike.id= "like_counter";
            cardLikeCounterLike.setAttribute("data-media-id", media.id);
            cardLikeCounter.appendChild(cardLikeCounterLike);
            
            cardLikeCounter.addEventListener("click", function(event){
                const likeElement = document.getElementById("number-like-media-" + media.id)
                likeElement.textContent = Number(likeElement.textContent) + 1;
                updateTotalCount(1);
            });
            updateTotalCount(media.likes);
        });
}

function updateTotalCount(nbLikes) {
    let totalCount = Number(likeTotal.textContent);
    totalCount = totalCount + nbLikes;
    likeTotal.textContent = totalCount;
}

const dataFetch = async() => {
    await fetch('https://raw.githubusercontent.com/OpenClassrooms-Student-Center/Front-End-Fisheye/main/data/photographers.json')
        .then(res => res.json())
        .then(data => { 
            response = data;
            const photographer = data.photographers.find(photographer => photographer.id === idPhotographer)
            afficherDetails(photographer)
            buildCards(data, photographer)
            
            
    });
};
dataFetch();


