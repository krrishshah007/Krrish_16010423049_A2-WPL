
// --- State Variables ---
let cart = []; // Array to hold cart items { name, price, quantity }

// --- DOM Elements ---
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const pages = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav-link:not(.contact-link)'); // Exclude contact link from page navigation
const menuBtns = document.querySelectorAll('.menu-btn'); // Select all menu buttons
const contactLinks = document.querySelectorAll('.contact-link'); // Select contact links

// Menu Filter Elements
const menuTabs = document.querySelectorAll('.menu-tab');
const menuItems = document.querySelectorAll('.menu-item');

// Modal Elements
const signinLink = document.getElementById('signin-link');
const signinModal = document.getElementById('signin-modal');
const signinClose = document.getElementById('signin-close');
const signinForm = document.getElementById('signin-form');

const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const cartClose = document.getElementById('cart-close');
const cartCountElement = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotalElement = document.getElementById('cart-total');
const emptyCartMessage = document.getElementById('empty-cart-message');
const checkoutBtn = document.getElementById('checkout-btn');

// --- Functions ---

// Mobile Menu Toggle
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
}

// Page Navigation
function navigateTo(pageId) {
    if (!pageId) return; // Do nothing if pageId is null/undefined

    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update active nav link
    navItems.forEach(item => {
        // Check if item's data-page matches the target pageId
        if (item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Special handling for contact link (keep it inactive unless clicked)
    contactLinks.forEach(link => link.classList.remove('active'));


    // Scroll to top
    window.scrollTo(0, 0);

    // Close mobile menu if open
    navLinks.classList.remove('active');
}

// Smooth Scroll to Footer (Contact)
function scrollToContact(event) {
    event.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Optionally activate contact link styling (though it's not a 'page')
    // navItems.forEach(item => item.classList.remove('active'));
    // contactLinks.forEach(link => link.classList.add('active')); // Add active style

    // Close mobile menu if open
    navLinks.classList.remove('active');
}


// Menu Filtering
function filterMenu(category) {
    // Update active tab
    menuTabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`.menu-tab[data-category="${category}"]`).classList.add('active');

    // Filter menu items
    menuItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'flex'; // Use flex since items are flex containers
        } else {
            item.style.display = 'none';
        }
    });
}

// Modal Control
function openModal(modalElement) {
    if (modalElement) {
        modalElement.classList.add('active');
    }
}

function closeModal(modalElement) {
    if (modalElement) {
        modalElement.classList.remove('active');
    }
}

// Add to Cart Functionality
function addToCart(event) {
    const button = event.target;
    const menuItem = button.closest('.menu-item');
    const name = menuItem.dataset.name;
    const price = parseFloat(menuItem.dataset.price);

    if (!name || isNaN(price)) {
        console.error("Item name or price is missing or invalid.");
        return;
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.name === name);

    if (existingItemIndex > -1) {
        // Increment quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new item
        cart.push({ name, price, quantity: 1 });
    }

    // Update cart display
    updateCartDisplay();

    // Optional: Add feedback to the button
    button.textContent = 'Added!';
    setTimeout(() => {
        button.textContent = 'Add to Cart';
    }, 1000); // Revert after 1 second
}


// Update Cart Display (Icon and Modal)
function updateCartDisplay() {
    // Clear current list
    cartItemsList.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
        cartItemsList.appendChild(emptyCartMessage); // Show empty message
        emptyCartMessage.style.display = 'block';
    } else {
        emptyCartMessage.style.display = 'none'; // Hide empty message
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                        <div class="cart-item-details">
                             <span class="cart-item-name">${item.name}</span>
                             <span class="cart-item-price">₹${item.price.toFixed(2)}</span>
                        </div>
                        <span class="cart-item-quantity">Qty: ${item.quantity}</span>
                        `;
            // Future: Add buttons here to increase/decrease/remove items
            cartItemsList.appendChild(listItem);
            total += item.price * item.quantity;
            itemCount += item.quantity;
        });
    }

    // Update total price
    cartTotalElement.textContent = `Total: ₹${total.toFixed(2)}`;

    // Update cart icon count
    cartCountElement.textContent = itemCount;
    if (itemCount > 0) {
        cartCountElement.classList.add('visible');
    } else {
        cartCountElement.classList.remove('visible');
    }
}

// Simulate Sign In
function handleSignIn(event) {
    event.preventDefault(); // Prevent actual form submission
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    if (email && password) {
        // --- SIMULATION ONLY ---
        // In a real app, send data to a server here for validation
        alert(`Sign in attempt with Email: ${email}. \n(This is a simulation - no actual login occurred)`);
        closeModal(signinModal);
        signinForm.reset(); // Clear the form
        // Optional: Update UI to show logged-in state (e.g., change "Sign In" link)
        // signinLink.textContent = 'Account';
    } else {
        alert('Please enter both email and password.');
    }
}

// Simulate Checkout
function handleCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    // --- SIMULATION ONLY ---
    alert(`Proceeding to checkout with ${cart.length} item type(s). Total: ${cartTotalElement.textContent}\n(This is a simulation)`);
    // In a real app, you'd redirect to a checkout page or process payment here.
    closeModal(cartModal);
    // Optionally clear cart after "checkout"
    // cart = [];
    // updateCartDisplay();
}


// --- Event Listeners ---

// Mobile Menu
mobileMenu.addEventListener('click', toggleMobileMenu);

// Page Navigation Links
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = item.getAttribute('data-page');
        if (pageId) { // Only navigate if it's a page link
            navigateTo(pageId);
        }
    });
});

// Menu Buttons (e.g., from Hero section)
menuBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = btn.getAttribute('data-page');
        if (pageId) {
            navigateTo(pageId);
        }
    });
});

// Contact Links (Smooth Scroll)
contactLinks.forEach(link => {
    link.addEventListener('click', scrollToContact);
});


// Menu Tabs Filter
menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');
        filterMenu(category);
    });
});

// "Add to Cart" Buttons (using event delegation on the container)
const menuItemsContainer = document.querySelector('.menu-items');
if (menuItemsContainer) {
    menuItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            addToCart(event);
        }
    });
}


// Sign In Modal Control
signinLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(signinModal);
});
signinClose.addEventListener('click', () => closeModal(signinModal));
signinForm.addEventListener('submit', handleSignIn);

// Cart Modal Control
cartIcon.addEventListener('click', () => openModal(cartModal));
cartClose.addEventListener('click', () => closeModal(cartModal));
checkoutBtn.addEventListener('click', handleCheckout);


// Close modals if clicking outside the content area
window.addEventListener('click', (event) => {
    if (event.target === signinModal) {
        closeModal(signinModal);
    }
    if (event.target === cartModal) {
        closeModal(cartModal);
    }
});

// --- Initial Setup ---
navigateTo('home'); // Show home page initially
updateCartDisplay(); // Initialize cart display (shows empty message)

