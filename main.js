const list = document.querySelectorAll('.list');
const megamenuTrigger = document.querySelector('.megamenu-trigger');
const megamenu = document.querySelector('.megamenu');

function activeLink() {
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
}

list.forEach((item) => item.addEventListener('click', activeLink));

// Close megamenu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInside = megamenuTrigger.contains(event.target) || megamenu.contains(event.target);
    
    if (!isClickInside) {
        megamenu.style.opacity = '0';
        megamenu.style.visibility = 'hidden';
    }
});

// Toggle megamenu on click
megamenuTrigger.addEventListener('click', (event) => {
    event.preventDefault();
    if (megamenu.style.opacity === '1') {
        megamenu.style.opacity = '0';
        megamenu.style.visibility = 'hidden';
    } else {
        megamenu.style.opacity = '1';
        megamenu.style.visibility = 'visible';
    }
});

// Prevent megamenu from closing when clicking inside it
megamenu.addEventListener('click', (event) => {
    event.stopPropagation();
});

