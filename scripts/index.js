function createItem(item) {
    // creation de l'element parent (Card)
    const cardElement = document.createElement("div");
    cardElement.className = "card";

    // Création du lien (<a>)
    const cardLink = document.createElement("a");
    cardLink.className = "card_link";
    cardLink.setAttribute('href', '/photographer.html?id=' + item.id);
    cardElement.appendChild(cardLink);
    

    // creation image mise en avant
    const imgElement = document.createElement('img');
    imgElement.className = "card_img";
    imgElement.src = "/Sample Photos/Photographers ID Photos/" + item.portrait;
    cardLink.appendChild(imgElement);
    
    // creation nom de photographe
    const photographersNameElement = document.createElement('h2');
    photographersNameElement.className = "card_name";
    photographersNameElement.textContent = item.name;
    cardLink.appendChild(photographersNameElement);

    // creation card details
    const cardDetails = document.createElement('div');
    cardDetails.className = "card_txt";
    cardElement.appendChild(cardDetails);
    
    // creation element localisation 
    const locElement = document.createElement("div");
    locElement.className = "card_loc";
    locElement.textContent = item.city + ", " + item.country;
    cardDetails.appendChild(locElement);

    // creation element slogan
    const taglineElement = document.createElement("div");
    taglineElement.className = "card_tagline";
    taglineElement.textContent = item.tagline;
    cardDetails.appendChild(taglineElement);
    
    // creation element prix
    const priceElement = document.createElement("div");
    priceElement.className = "card_price";
    priceElement.textContent = item.price + "€/jour";
    cardDetails.appendChild(priceElement);

    return cardElement;
} 

fetch('https://raw.githubusercontent.com/OpenClassrooms-Student-Center/Front-End-Fisheye/main/data/photographers.json')
    .then(res => res.json())
    .then(data => {
        const containerElement = document.getElementById('container_id');

        for (i in data.photographers) {
            const item = data.photographers[i];
            const cardElement = createItem(item);
            containerElement.appendChild(cardElement); 
        }
    })
    .catch(console.error);
    



