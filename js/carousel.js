const track = document.querySelector('.track');
const images = Array.from(track.children);
const imageWidth = images[0].getBoundingClientRect().width + 10;
let currentIndex = 0;
let slideInterval;

function moveToNextImage() {
    currentIndex++;
    track.style.transform = `translateX(${-imageWidth * currentIndex}px)`;

    if (currentIndex === images.length / 2) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = 0;
            track.style.transform = `translateX(0)`;
            setTimeout(() => track.style.transition = 'transform 0.5s ease-in-out', 50);
        }, 500); // 0.5s
    }
}

function startCarousel () {
    slideInterval = setInterval(moveToNextImage, 2000);
}

function stopCarousel() {
    clearInterval(slideInterval);
}

startCarousel();

images.forEach(image => {
    image.addEventListener('mouseenter', () => {
        stopCarousel();
        image.classList.add('hover-effect');
    });

    image.addEventListener('mouseleave', () => {
        startCarousel();
        image.classList.remove('hover-effect');
    });
});
