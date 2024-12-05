document.addEventListener('DOMContentLoaded', () => {

    const products = [
        { id: 1, name: 'Product1', price: 29.99 },
        { id: 2, name: 'Product3', price: 93.99 },
        { id: 3, name: 'Product3', price: 21.99 },
        { id: 4, name: 'Product4', price: 82.99 },
    ];

    const cart = [];
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById("cart-items");
    const emptyCartMsg = document.getElementById("empty-cart");
    const cartTotalMsg = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    let total = 0;

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)} </span>
            <button data-id = "${product.id}"> Add to cart </button>
        `
        productList.appendChild(productDiv);
    });

    productList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            total += product.price;
            addToCart(product);
            displayCart(cart);
        }
    });


    function addToCart(product) {
        cart.push(product);
        console.log(cart);
    }

    function displayCart(items) {
        const cartDiv = document.createElement('div');
        emptyCartMsg.classList.add('hidden');
        cartTotalMsg.classList.remove('hidden');
        items.forEach((item) => {
            cartDiv.innerHTML = `<span> ${item.name} : $${item.price}</span> `;
            cartItems.appendChild(cartDiv);
        });

        totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
        console.log(total);
    }


});