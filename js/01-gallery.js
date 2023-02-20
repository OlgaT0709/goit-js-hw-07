import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
let lightbox = null;
galleryContainer.insertAdjacentHTML('beforeend', createGalary(galleryItems))
galleryContainer.addEventListener('click', onPreviewClick);


// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
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

// Реалізація делегування на div.gallery і отримання url великого зображення.
// Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням користувач буде перенаправлений на іншу сторінку. Заборони цю поведінку за замовчуванням.
// Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.

function onPreviewClick(event) {
    event.preventDefault();
   
    if (!event.target === galleryContainer.querySelector('.gallery__image')) {
        return;
    };

    const imageUrl = event.target.dataset.source;
    
    lightbox = basicLightbox.create(`
      <img src="${imageUrl}">
    `);
    lightbox.show();

    window.addEventListener('keydown', onEscaprPress);
        
};

// Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно. Бібліотека basicLightbox містить метод для програмного закриття модального вікна.

function onEscaprPress(event) {
    if (event.code === "Escape" && lightbox !== null) {
        lightbox.close();
        window.removeEventListener('keydown', onEscaprPress);
    }
}


