// DOM Elements
const list = document.querySelectorAll('.list');
const settingsMenu = document.getElementById('settings-menu');
const megamenu = document.querySelector('.megamenu');
const profileToggle = document.getElementById('profile-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Functions
function activeLink() {
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
}

function showMegamenu() {
    const navRect = document.querySelector('.mainnav').getBoundingClientRect();
    megamenu.style.top = `${navRect.bottom}px`;
    megamenu.style.display = 'block';
}

function hideMegamenu(e) {
    if (!e.relatedTarget || !megamenu.contains(e.relatedTarget)) {
        megamenu.style.display = 'none';
    }
}

function toggleProfileDropdown(e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
    profileToggle.setAttribute('aria-expanded', dropdownMenu.classList.contains('show'));
}

function closeDropdowns(e) {
 
    if (!profileToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        profileToggle.setAttribute('aria-expanded', 'false');
    }
}

function handleKeyboardNavigation(e) {
    if (e.key === 'Escape') {
        megamenu.style.display = 'none';
        settingsMenu.classList.remove('active');
        dropdownMenu.classList.remove('show');
        profileToggle.setAttribute('aria-expanded', 'false');
    }
}

function handleDropdownKeyboardNavigation(e) {
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
}

// Event Listeners
list.forEach((item) => item.addEventListener('click', activeLink));

settingsMenu.addEventListener('mouseenter', showMegamenu);
settingsMenu.addEventListener('mouseleave', hideMegamenu);
megamenu.addEventListener('mouseleave', hideMegamenu);

megamenu.addEventListener('click', (e) => e.stopPropagation());

profileToggle.addEventListener('click', toggleProfileDropdown);

document.addEventListener('click', closeDropdowns);
document.addEventListener('keydown', handleKeyboardNavigation);
dropdownMenu.addEventListener('keydown', handleDropdownKeyboardNavigation);

// Initialize
// Add any initialization code here if needed

const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});