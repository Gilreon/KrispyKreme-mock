let currentIndex = 0;
let startX;
let isDragging = false;
const carousel = document.querySelector('.carousel');

carousel.addEventListener('mousedown', startDrag);
carousel.addEventListener('touchstart', startDrag);

carousel.addEventListener('mousemove', drag);
carousel.addEventListener('touchmove', drag);

carousel.addEventListener('mouseup', endDrag);
carousel.addEventListener('mouseleave', endDrag);
carousel.addEventListener('touchend', endDrag);

function startDrag(event) {
    startX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
    isDragging = true;
    carousel.style.transition = 'none';
}

function drag(event) {
    if (!isDragging) return;

    const x = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    const delta = x - startX;
    const offsetPercentage = (delta / carousel.offsetWidth) * 100;
    const currentTransform = -currentIndex * 100;
    carousel.style.transform = `translateX(${currentTransform + offsetPercentage}%)`;
}

function endDrag(event) {
    if (!isDragging) return;
    isDragging = false;

    const x = event.type === 'touchend' ? event.changedTouches[0].clientX : event.clientX;
    const delta = x - startX;

    if (Math.abs(delta) > carousel.offsetWidth / 4) {
        if (delta < 0) {
            moveCarousel(1);
        } else {
            moveCarousel(-1);
        }
    } else {
        moveCarousel(0);
    }

    carousel.style.transition = 'transform 0.5s ease-in-out';
}

function moveCarousel(direction) {
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const itemsToShow = 2;
    const totalVisibleItems = Math.ceil(totalItems / itemsToShow);

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalVisibleItems - 1;
    } else if (currentIndex >= totalVisibleItems) {
        currentIndex = 0;
    }

    const newTransform = -currentIndex * 100;
    carousel.style.transform = `translateX(${newTransform}%)`;
}
