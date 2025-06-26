function searchProducts() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const matchesSearch = title.includes(query);
    const selectedCategory = document.getElementById("category").value;
    const cardCategory = card.getAttribute("data-category");

    const matchesCategory =
      selectedCategory === "all" || cardCategory === selectedCategory;

    card.style.display = matchesSearch && matchesCategory ? "block" : "none";
  });
}

 function addToCart(button) {
  const parent = button.parentElement;
  const productCard = parent.closest(".product-card");
  const name = productCard.querySelector("h3").textContent;
  const priceText = productCard.querySelector("p").textContent;
  const price = parseInt(priceText.replace(/[^0-9]/g, ""));

  // Get or update cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // Check if quantity controls already exist
  let quantityDiv = parent.querySelector(".quantity-controls");

  if (!quantityDiv) {
    // Create quantity controls only if not already present
    quantityDiv = document.createElement("div");
    quantityDiv.className = "quantity-controls";

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";

    const quantitySpan = document.createElement("span");
    quantitySpan.className = "quantity-number";
    quantitySpan.textContent = existingItem ? existingItem.quantity : 1;

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";

    // Add handlers
    plusBtn.addEventListener("click", () => {
      updateQuantity(quantitySpan, +1, name);
    });

    minusBtn.addEventListener("click", () => {
      updateQuantity(quantitySpan, -1, name);
    });

    quantityDiv.appendChild(minusBtn);
    quantityDiv.appendChild(quantitySpan);
    quantityDiv.appendChild(plusBtn);

    parent.replaceChild(quantityDiv, button);
  } else {
    const quantitySpan = quantityDiv.querySelector(".quantity-number");
    quantitySpan.textContent = existingItem ? existingItem.quantity : 1;
  }

  showCartButtonIfNeeded();
}


 function updateQuantity(span, delta, productName) {
  let current = parseInt(span.textContent);
  const newQuantity = current + delta;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemIndex = cart.findIndex(item => item.name === productName);

  if (itemIndex !== -1) {
    if (newQuantity <= 0) {
      // Remove item
      cart.splice(itemIndex, 1);

      const parent = span.parentElement.parentElement;
      const addBtn = document.createElement("button");
      addBtn.className = "add-to-cart-btn";
      addBtn.textContent = "Add to Cart";
      addBtn.onclick = function () {
        addToCart(addBtn);
      };
      parent.replaceChild(addBtn, span.parentElement);
    } else {
      cart[itemIndex].quantity = newQuantity;
      span.textContent = newQuantity;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
function showCartButtonIfNeeded() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const viewCartBtn = document.getElementById("viewCartBtn");
  if (cart.length > 0) {
    viewCartBtn.style.display = "block";
  }
}

function goToCart() {
  window.location.href = "cart.html";
}

// Call it when page loads (main page only)
document.addEventListener("DOMContentLoaded", () => {
  showCartButtonIfNeeded();
});


//console.log(localStorage.getItem("cart"))