import {enableBodyScroll, disableBodyScroll} from './body-scroll-lock.js';

/**
 * @property {HTMLElement} element 
 * @property {string[]} images chemin des images de la lightbox
 * @property {string} src images actuellement affiché
*/

class Lightbox {

    static init() {

        const links = Array.from(document.querySelectorAll('#page-content-photo img'));
        const gallery = links.map(link => link.getAttribute('src'));
        links.forEach(img =>{ 
                img.addEventListener('click', e => {
                e.preventDefault()
                new Lightbox(e.currentTarget.getAttribute('src'), gallery);
            })});
    };

    /**
     * @param {string} url url de l'image
     * @param {string[]} images chemin des images de la lightbox
     */

    constructor(url, images, videos) {
        this.element = this.buildDOM(url);
        this.images = (url) => {
            if(url === images) {
                images
            } else {
                videos
            }
        };
        // TODO : If img = img // else video = Mp4
        this.loadImage(url);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.body.appendChild(this.element);
        disableBodyScroll(this.element);
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    };

    loadImage (url) {
        this.url = null;
        const image = new Image();
        const container = this.element.querySelector('.lightbox_container');
        const loader = document.createElement('div');
        loader.className = 'lightbox_loader';
        container.innerHTML = "";
        container.appendChild(loader);
        image.onload = () =>  {
            container.removeChild(loader);
            container.appendChild(image);
            this.url = url;
        }
        image.src = url;
    };

    // close modal echap
    onKeyUp(e){
        if(e.key === 'Escape') {
            this.close(e);
        } else if(e.key === 'ArrowLeft') {
            this.prev(e);
        }
        else if(e.key === 'ArrowRight') {
            this.next(e);
        };
    };

    // ferme la lightbox 
    close(e) {
        e.preventDefault();
        this.element.className = 'fadeout';
        enableBodyScroll(this.element);
        window.setTimeout(() => {
            this.element.remove();
        }, 200);
        document.removeEventListener('keyup', this.onKeyUp);
    };
   
    /**
     * @param {MouseEvent || keyboradEvent} e 
     */

    prev(e) {
        e.preventDefault();
        let i = this.images.findIndex(image => image === this.url);
        if(i === 0) {
            i = this.images.length;
        };
        this.loadImage(this.images[i -1]);
    };

    /**
     * @param {MouseEvent || keyboradEvent} e 
     */

    next(e) {
        e.preventDefault();
        let i = this.images.findIndex(image => image === this.url);
        if(i === this.images.lenght -1) {
            i = -1;;
        }
        this.loadImage(this.images[i +1]);
    };
    
    buildDOM(url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `<div class="lightbox">
        <button class="lightbox_close">Fermer</button>
        <button class="lightbox_prev lightbox_arrow">Suivant</button>
        <button class="lightbox_next lightbox_arrow">Précédent</button>
        <div class="lightbox_container">
            <img src="${url}" alt="">
        </div>
    </div>`
    dom.querySelector('.lightbox_close').addEventListener('click',
    this.close.bind(this));
    dom.querySelector('.lightbox_prev').addEventListener('click',
    this.prev.bind(this));
    dom.querySelector('.lightbox_next').addEventListener('click',
    this.next.bind(this));
    return dom;
    };
};
export default Lightbox;
