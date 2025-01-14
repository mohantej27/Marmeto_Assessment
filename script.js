const cartData = [
    {
        id: 1,
        title: 'Asgaard sofa',
        price: 25000000, // Price in paise (or smallest currency unit)
        quantity: 1,
        image: 'https://cdn.shopify.com/s/files/1/0883/2188/4479/files/Asgaardsofa3.png?v=1728384481',
        original_price: 250000,
        discounted_price: 200000,
        line_price: 200000,
        original_line_price: 250000,
        total_discount: 50000,
        sku: '',
        grams: 0,
        vendor: 'Lnd [ RISHABH ]',
        taxable: true,
        product_id: 9740132319551,
        gift_card: false,
        final_price: 250000,
        final_line_price: 250000,
        url: '/products/asgaard-sofa?variant=49839206859071',
        handle: 'asgaard-sofa',
        requires_shipping: true,
        product_type: '',
        product_title: 'Asgaard sofa',
        product_description:
            'The Asgaard sofa offers unparalleled comfort and style with its sleek design and high-quality materials. With its expert craftsmanship and attention to detail, this sofa is perfect for anyone looking to elevate their living space. Enjoy a luxurious and relaxing experience with the Asgaard sofa.',
        variant_title: null,
        variant_options: ['Default Title'],
        options_with_values: [
            {
                name: 'Title',
                value: 'Default Title',
            },
        ],
        line_level_discount_allocations: [],
        line_level_total_discount: 0,
        quantity_rule: {
            min: 1,
            max: null,
            increment: 1,
        },
        has_components: false,
    },
];

// Cart metadata
const cartMetadata = {
    original_total_price: 250000, // Assuming it's in rupees
    items: cartData,
    requires_shipping: true,
    currency: 'INR',
    items_subtotal_price: 250000, // In paise
};


// Function to format price with commas
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(price);
};



const cartItemsContainer = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const cartCountElement = document.getElementById('cart-count');
const checkoutButton = document.getElementById('checkout-btn');
const loader = document.getElementById('loader');

function renderCartItems() {
    cartItemsContainer.innerHTML = '';

    // Add the heading row (only once)
    const headingRow = document.createElement('div');
    headingRow.classList.add('cart-row', 'heading-row'); // Use shared class for layout
    headingRow.innerHTML = `
        <p class="cart-image-placeholder"></p> <!-- Placeholder for image -->
        <p>Product</p>
        <p>Price</p>
        <p>Discount</p>
        <p>Quantity</p>
        <p>Subtotal</p>
        <p></p> <!-- Placeholder for actions -->
    `;
    cartItemsContainer.appendChild(headingRow);

    // Add each cart item
    cartData.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-row'); // Use shared class for layout
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-image">
            <p>${item.title}</p>
            <p>${formatPrice(item.original_price)}</p>
            <p>${formatPrice(item.total_discount)}</p>
            <p>
                <input type="number" value="${item.quantity}" min="1" class="item-quantity curved-input" data-id="${item.id}">
            </p>
            <p>${formatPrice(item.line_price)}</p>
            <button class="remove-item" data-id="${item.id}">🗑️</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateCartSummary();
    updateCartCount();
}


function updateCartSummary() {
    const subtotal = cartMetadata.items_subtotal_price;
    const totalDiscount = cartData.reduce((sum, item) => sum + item.total_discount, 0);
    const finalTotal = subtotal - totalDiscount;

    subtotalElement.textContent = formatPrice(subtotal);
    document.getElementById('discount').textContent = formatPrice(totalDiscount); // Discount in formatted currency
    totalElement.textContent = formatPrice(finalTotal);
}


// Update cart count
function updateCartCount() {
    const cartCount = cartData.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = cartCount;
}

// Handle quantity change
cartItemsContainer.addEventListener('change', (e) => {
    if (e.target.classList.contains('item-quantity')) {
        const itemId = parseInt(e.target.dataset.id);
        const item = cartData.find(item => item.id === itemId);
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            item.quantity = newQuantity;
            renderCartItems();
        }
    }
});

// Handle item removal
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const itemId = parseInt(e.target.dataset.id);
        const confirmRemoval = confirm('Are you sure you want to remove this item from your cart?');
        if (confirmRemoval) {
            const index = cartData.findIndex(item => item.id === itemId);
            cartData.splice(index, 1);
            renderCartItems();
        }
    }
});

// Show loader on checkout
checkoutButton.addEventListener('click', () => {
    loader.style.display = 'block';
    setTimeout(() => {
        alert('Thank you for your purchase!');
        loader.style.display = 'none';
    }, 2000);
});

// Initialize cart
renderCartItems();
