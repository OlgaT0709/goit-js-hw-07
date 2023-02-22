import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
let lightbox = null;
galleryContainer.insertAdjacentHTML('beforeend', createGalary(galleryItems))
galleryContainer.addEventListener('click', onPreviewClick);


function createGalary(items) {
    return items.map(({ preview, original, description }) => {
        return `
            <div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                        loading = "lazy"
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </div>
            `;
    }).join('');
};


function onPreviewClick(event) {

    event.preventDefault();

    if (!event.target === galleryContainer.querySelector('.gallery__image')) {
        return;
    };

    const originalUrl = event.target.dataset.source;

    lightbox = basicLightbox.create(`
  <div class="modal">
      <p>
           <img src="${originalUrl}">
      </p>
  </div>`,
        {
  onShow: () => {
    window.addEventListener('keydown', onEscapePress);
  },
  onClose: () => {
    window.removeEventListener('keydown', onEscapePress);
  }
});
    
       lightbox.show();

    //  window.addEventListener('keydown', onEscapePress);
    // 
    // if (lightbox) {
    //     lightbox.element().addEventListener('keydown', onEscapePress);
    // }
    // 
    // lightbox?.element()?.addEventListener('keydown', onEscapePress);
    
}

function onEscapePress(event) {
  
  if (event.code === "Escape" && lightbox !== null) {
    lightbox.close();
  }
}



