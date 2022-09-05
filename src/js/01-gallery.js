// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Change code below this line

console.log(galleryItems);

const createGallery = images => images.reduce((acc, { preview, original, description }) => {
  return acc += `<a class="gallery__item" href="${original}">
			  <img class="gallery__image" src="${preview}" alt="${description}" />
			</a>`
}, '');

const galleryEl = document.querySelector('.gallery');
galleryEl.insertAdjacentHTML('beforeend', createGallery(galleryItems));

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250
});