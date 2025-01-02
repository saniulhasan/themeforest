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

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    // Here you would typically send the email to your server
    console.log(`Subscribed with email: ${email}`);
    alert('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
});

// Search functionality
const searchForm = document.querySelector('.search-container');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchForm.querySelector('input[type="text"]').value;
    // Here you would typically perform a search operation
    console.log(`Searching for: ${searchTerm}`);
    alert(`Searching for: ${searchTerm}`);
});

// Tag click functionality
const tags = document.querySelectorAll('.tag');
tags.forEach(tag => {
    tag.addEventListener('click', () => {
        const tagText = tag.textContent;
        // Here you would typically filter or search based on the tag
        console.log(`Filtering by tag: ${tagText}`);
        alert(`Filtering by tag: ${tagText}`);
    });
});
const videoElement = document.querySelector('.video-container video');

if (videoElement) {
    // Lazy loading for video
    videoElement.addEventListener('loadedmetadata', function() {
        if (window.innerHeight > videoElement.getBoundingClientRect().top) {
            videoElement.play();
        }
    });

    // Play video when it comes into view
    window.addEventListener('scroll', function() {
        if (window.innerHeight > videoElement.getBoundingClientRect().top) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
    });
}
const applyFiltersBtn = document.getElementById('apply-filters');
const productCards = document.querySelectorAll('.product-card');

applyFiltersBtn.addEventListener('click', () => {
    const selectedLikes = Array.from(document.querySelectorAll('input[name="likes"]:checked')).map(el => el.value);
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(el => el.value);
    const selectedCollections = Array.from(document.querySelectorAll('input[name="collection"]:checked')).map(el => el.value);
    const selectedSaleTypes = Array.from(document.querySelectorAll('input[name="sale-type"]:checked')).map(el => el.value);
    const minPrice = document.getElementById('price-min').value;
    const maxPrice = document.getElementById('price-max').value;
    const currency = document.getElementById('price-currency').value;

    // In a real application, you would send these filters to your backend or filter the data on the client-side
    console.log('Applied Filters:', {
        likes: selectedLikes,
        categories: selectedCategories,
        collections: selectedCollections,
        saleTypes: selectedSaleTypes,
        priceRange: { min: minPrice, max: maxPrice, currency: currency }
    });

    // For demonstration, let's hide some cards randomly
    productCards.forEach(card => {
        card.style.display = Math.random() > 0.5 ? 'block' : 'none';
    });

    alert('Filters applied! In a real application, this would update the product list.');
});
document.addEventListener('DOMContentLoaded', function() {
    const nftCards = document.querySelectorAll('.nft-card');
    const bidButtons = document.querySelectorAll('.btn-bid');

    // Add hover effect to NFT cards
    nftCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effect to bid buttons
    bidButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.textContent = 'Bid Placed!';
            this.style.backgroundColor = '#27ae60';
            this.disabled = true;

            // Reset button after 3 seconds
            setTimeout(() => {
                this.textContent = 'Place Bid';
                this.style.backgroundColor = '#3498db';
                this.disabled = false;
            }, 3000);
        });
    });

    // Simulate loading more NFTs
    const nftGrid = document.querySelector('.nft-grid');
    let loadCount = 0;

    function loadMoreNFTs() {
        if (loadCount < 2) { // Limit to loading 2 more sets
            for (let i = 0; i < 3; i++) {
                const newCard = nftCards[0].cloneNode(true);
                newCard.querySelector('h3').textContent = `New NFT #${loadCount * 3 + i + 1}`;
                newCard.querySelector('.price').textContent = `${(Math.random() * 5).toFixed(2)} ETH`;
                newCard.querySelector('.likes').textContent = `❤️ ${Math.floor(Math.random() * 300)}`;
                nftGrid.appendChild(newCard);
            }
            loadCount++;
        }
        if (loadCount === 2) {
            window.removeEventListener('scroll', scrollHandler);
        }
    }

    function scrollHandler() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            loadMoreNFTs();
        }
    }

    window.addEventListener('scroll', scrollHandler);
});
// Existing code...

// Explore Product Filters


applyFiltersBtn.addEventListener('click', () => {
    const selectedLikes = Array.from(document.querySelectorAll('input[name="likes"]:checked')).map(el => el.value);
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(el => el.value);
    const selectedCollections = Array.from(document.querySelectorAll('input[name="collection"]:checked')).map(el => el.value);
    const selectedSaleTypes = Array.from(document.querySelectorAll('input[name="sale-type"]:checked')).map(el => el.value);
    const minPrice = document.getElementById('price-min').value;
    const maxPrice = document.getElementById('price-max').value;
    const currency = document.getElementById('price-currency').value;

    // In a real application, you would send these filters to your backend or filter the data on the client-side
    console.log('Applied Filters:', {
        likes: selectedLikes,
        categories: selectedCategories,
        collections: selectedCollections,
        saleTypes: selectedSaleTypes,
        priceRange: { min: minPrice, max: maxPrice, currency: currency }
    });

    // For demonstration, let's hide some cards randomly
    productCards.forEach(card => {
        card.style.display = Math.random() > 0.5 ? 'block' : 'none';
    });

    alert('Filters applied! In a real application, this would update the product list.');
});

document.addEventListener('DOMContentLoaded', function() {
    // Discover Items Section
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');
    const searchButton = document.getElementById('search-button');
    const itemsGrid = document.getElementById('items-grid');
    const loadMoreButton = document.getElementById('load-more');

    let currentPage = 1;
    const itemsPerPage = 8;

    // Simulated item data
    const items = [
        { id: 1, name: 'Cosmic Dreams #42', category: 'art', price: '0.5 ETH', creator: 'StardustArtist' },
        { id: 2, name: 'Neon Nights', category: 'photography', price: '0.3 ETH', creator: 'UrbanLens' },
        { id: 3, name: 'Melodic Waves', category: 'music', price: '0.2 ETH', creator: 'SoundScaper' },
        { id: 4, name: 'Golden Goal Moment', category: 'sports', price: '1.0 ETH', creator: 'SportsMaster' },
        { id: 5, name: 'Pixel Perfection', category: 'art', price: '0.4 ETH', creator: 'DigitalBrush' },
        { id: 6, name: 'Vintage Vibes', category: 'collectibles', price: '0.6 ETH', creator: 'RetroCollector' },
        { id: 7, name: 'Abstract Thoughts', category: 'art', price: '0.7 ETH', creator: 'MindfulCreator' },
        { id: 8, name: 'Serene Landscapes', category: 'photography', price: '0.5 ETH', creator: 'NatureLens' },
        { id: 9, name: 'Funky Beats', category: 'music', price: '0.3 ETH', creator: 'RhythmMaker' },
        { id: 10, name: 'Slam Dunk Collection', category: 'sports', price: '0.8 ETH', creator: 'CourtKing' },
        // Add more items as needed
    ];

    function renderItems(page, filterCategory = '', searchTerm = '') {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const filteredItems = items.filter(item => {
            const categoryMatch = !filterCategory || item.category === filterCategory;
            const searchMatch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());
            return categoryMatch && searchMatch;
        });

        const itemsToRender = filteredItems.slice(startIndex, endIndex);

        itemsToRender.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <img src="/placeholder.svg?height=200&width=200" alt="${item.name}" class="item-image">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <h3>${item.name}</h3>
                    <p>Category: ${item.category}</p>
                    <p>Price: ${item.price}</p>
                    <p>Creator: ${item.creator}</p>
                </div>
            `;
            itemsGrid.appendChild(itemCard);
        });

        loadMoreButton.style.display = endIndex < filteredItems.length ? 'block' : 'none';
    }

    function clearItems() {
        itemsGrid.innerHTML = '';
    }

    searchButton.addEventListener('click', function() {
        clearItems();
        currentPage = 1;
        renderItems(currentPage, categorySelect.value, searchInput.value);
    });

    loadMoreButton.addEventListener('click', function() {
        currentPage++;
        renderItems(currentPage, categorySelect.value, searchInput.value);
    });

    // Initial render
    renderItems(currentPage);

    // Top Collections Section
    const collectionCards = document.querySelectorAll('.collection-card');

    collectionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f0f0';
        });

        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#fff';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect
    const typewriterElement = document.querySelector('.typewriter');
    const words = ['Extraordinary NFTs', 'Digital Art', 'Rare Collectibles'];
    let wordIndex = 0;
    let charIndex = 0;
  
    function typeWriter() {
      if (charIndex < words[wordIndex].length) {
        typewriterElement.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(eraseText, 2000);
      }
    }
  
    function eraseText() {
      if (charIndex > 0) {
        typewriterElement.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 50);
      } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeWriter, 500);
      }
    }
  
    typeWriter();
  
    // Particle background
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        move: { enable: true, speed: 2, direction: 'none', random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
      }
    });
  
    // Animate NFT cards on scroll
    const nftCards = document.querySelectorAll('.nft-card');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    nftCards.forEach(card => {
      card.style.animationPlayState = 'paused';
      observer.observe(card);
    });
  });
