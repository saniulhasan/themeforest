const list = document.querySelectorAll('.list');
const settingsMenu = document.getElementById('settings-menu');
const megamenu = document.querySelector('.megamenu');
const profileToggle = document.getElementById('profile-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

function activeLink() {
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
}

list.forEach((item) => item.addEventListener('click', activeLink));

// Show megamenu on hover
settingsMenu.addEventListener('mouseenter', () => {
    const navRect = document.querySelector('.mainnav').getBoundingClientRect();
    megamenu.style.top = `${navRect.bottom}px`;
    megamenu.style.display = 'block';
});

// Hide megamenu when mouse leaves the settings menu or megamenu
settingsMenu.addEventListener('mouseleave', (e) => {
    if (!e.relatedTarget || !megamenu.contains(e.relatedTarget)) {
        megamenu.style.display = 'none';
    }
});

megamenu.addEventListener('mouseleave', () => {
    megamenu.style.display = 'none';
});

// Prevent the settings menu from closing when clicking inside the megamenu
megamenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Toggle profile dropdown
profileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
    profileToggle.setAttribute('aria-expanded', dropdownMenu.classList.contains('show'));
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!settingsMenu.contains(e.target) && !megamenu.contains(e.target)) {
        megamenu.style.display = 'none';
        settingsMenu.classList.remove('active');
    }
    if (!profileToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        profileToggle.setAttribute('aria-expanded', 'false');
    }
});

// Close dropdowns on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        megamenu.style.display = 'none';
        settingsMenu.classList.remove('active');
        dropdownMenu.classList.remove('show');
        profileToggle.setAttribute('aria-expanded', 'false');
    }
});

// Enable keyboard navigation for dropdown menu
dropdownMenu.addEventListener('keydown', (e) => {
    const items = dropdownMenu.querySelectorAll('.dropdown-item');
    const currentIndex = Array.from(items).indexOf(document.activeElement);

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        items[prevIndex].focus();
    }
});

