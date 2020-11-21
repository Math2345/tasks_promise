
// Программа для подгрузки картинок с интервалом 1000 mc
function loadImage(path) {
     return new Promise((resolve, reject) => {
          if (path) {
               const image = document.createElement("img");
               image.src = path;

               const frame = document.createElement('div');
               frame.className = 'frame';

               frame.appendChild(image);
               resolve(frame);
          } else {
               reject('Картинка не найдена')
          }
     })
}

const images = [
     'images/001_t.jpg',
     'images/002_t.jpg',
     'images/003_t.jpg',
     'images/004_t.jpg',
     'images/005_t.jpg',
     'images/006_t.jpg'
]

Promise.all(images.map(loadImage)).then(
    frames => {
         const gallery = document.querySelector('.gallery');
         for (let i = 0; i < frames.length; i++) {
              setTimeout(() => {
                   gallery.appendChild(frames[i]);
              }, i * 1000)
         }
    }
).catch(error => console.log(error));


