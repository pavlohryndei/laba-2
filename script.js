let cartCounter = 0; // Initialize the cart counter
let totalQuantity = 0; // Initialize the total quantity of items in cart
let cart = []; // Array to store selected products

// const product = [
//   {
//     id: 0,
//     image: "imgs/amg.png",
//     title: "Mersedes AMG",
//     price: 120000,
//   },
//   {
//     id: 1,
//     image: "imgs/cad-cts.png",
//     title: "Cadillac-CTS",
//     price: 6000,
//   },
//   {
//     id: 2,
//     image: "imgs/camaro.png",
//     title: "Chevrolet Camaro",
//     price: 23000,
//   },
//   {
//     id: 3,
//     image: "imgs/dodge.jpg",
//     title: "Dodge",
//     price: 10000,
//   },
//   {
//     id: 4,
//     image: "imgs/duster.png",
//     title: "Renault Duster",
//     price: 2400,
//   },
//   {
//     id: 5,
//     image: "imgs/evo.png",
//     title: "Mitsu Evolution",
//     price: 100000,
//   },
//   {
//     id: 6,
//     image: "imgs/f150.png",
//     title: "Ford F-150",
//     price: 45000,
//   },
//   {
//     id: 7,
//     image: "imgs/focus-rs.jpg",
//     title: "Ford Focus-RS",
//     price: 57500,
//   },
//   {
//     id: 8,
//     image: "imgs/gtr.png",
//     title: "Nissan GTR",
//     price: 120000,
//   },
//   {
//     id: 9,
//     image: "imgs/Honda.png",
//     title: "Honda S2000",
//     price: 7800,
//   },
//   {
//     id: 10,
//     image: "imgs/i8.png",
//     title: "BMW I8",
//     price: 110000,
//   },
//   {
//     id: 11,
//     image: "imgs/matiz.jpg",
//     title: "MATIZ",
//     price: 680,
//   },
//   {
//     id: 12,
//     image: "imgs/mazda.png",
//     title: "Mazda MX5",
//     price: 9780,
//   },
//   {
//     id: 13,
//     image: "imgs/octaha.png",
//     title: "Scoda Octavia",
//     price: 1000,
//   },
//   {
//     id: 14,
//     image: "imgs/ram.png",
//     title: "Dodge RAM",
//     price: 10000,
//   },
//   {
//     id: 15,
//     image: "imgs/rs6.png",
//     title: "Audi RS^",
//     price: 54000,
//   },
//   {
//     id: 16,
//     image: "imgs/subaru.png",
//     title: "Subaru",
//     price: 30000,
//   },
//   {
//     id: 17,
//     image: "imgs/toyota.png",
//     title: "Toyota",
//     price: 5400,
//   },
// ];

// Function to render products
function renderProducts(products) {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = "";

  let rowDiv;
  products.forEach((item, index) => {
    if (index % 3 === 0) {
      rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      appContainer.appendChild(rowDiv);
    }

    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <h3>${item.title}</h3>
                    <p class="price">$${item.price}</p>
                    <button class="btn" onclick="addToCart(${item.id})">Купити</button>
                `;
    rowDiv.appendChild(productDiv);
  });
}

// Function to add a product to the cart
function addToCart(productId) {
  const selectedProduct = product.find((item) => item.id === productId);
  const existingCartItem = cart.find((item) => item.id === productId);

  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    selectedProduct.quantity = 1;
    cart.push(selectedProduct);
  }

  cartCounter++;
  totalQuantity++;
  document.getElementById("totalQuantity").textContent = totalQuantity;
  updateCart();
  updateTotal();

  localStorage.setItem("cartData", JSON.stringify(cart));
}

// Function to update the cart view
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
                    <div class="title">${item.title}</div>
                    <div class="quantity">
                        <button onclick="decrementQuantity(${item.id})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="incrementQuantity(${item.id})">+</button>
                    </div>
                `;
    cartItems.appendChild(li);
  });
}

// Function to update the total amount
function updateTotal() {
  const totalAmount = document.getElementById("totalAmount");
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalAmount.textContent = total;
}

// Function to increment quantity
function incrementQuantity(productId) {
  const selectedProduct = cart.find((item) => item.id === productId);
  selectedProduct.quantity++;
  totalQuantity++;
  document.getElementById("totalQuantity").textContent = totalQuantity;
  updateCart();
  updateTotal();
}

// Function to decrement quantity
function decrementQuantity(productId) {
  const selectedProduct = cart.find((item) => item.id === productId);
  if (selectedProduct.quantity > 1) {
    selectedProduct.quantity--;
    totalQuantity--;
    document.getElementById("totalQuantity").textContent = totalQuantity;
  } else {
    const index = cart.findIndex((item) => item.id === productId);
    cart.splice(index, 1);
    totalQuantity--;
    document.getElementById("totalQuantity").textContent = totalQuantity;
  }
  updateCart();
  updateTotal();
}

// Function to toggle the visibility of the cart window
function toggleCart() {
  const body = document.querySelector("body");
  body.classList.toggle("showCart");
}

// Call renderProducts to display initial products
renderProducts(product);

// Add event listener for the search input
const searchBar = document.getElementById("elastic");
searchBar.addEventListener("input", function () {
  const searchText = this.value;
  const filteredProducts = product.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );
  renderProducts(filteredProducts);
});

// Add event listener for the cart icon
const iconCart = document.querySelector(".icon-cart");
iconCart.addEventListener("click", toggleCart);

function toggleScrollToTopButton() {
  const scrollToTopButton = document.querySelector(".scroll-to-top");
  if (
    document.body.scrollTop > (window.innerHeight * 2) / 3 ||
    document.documentElement.scrollTop > (window.innerHeight * 2) / 3
  ) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

// Function to scroll to the top of the page
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add event listener for scrolling to toggle visibility of the scroll-to-top button
window.addEventListener("scroll", toggleScrollToTopButton);

// Функція для очищення кошика
function clearCart() {
  cart = []; // Очищення масиву кошика
  cartCounter = 0; // Скидання лічильника
  totalQuantity = 0; // Скидання загальної кількості
  document.getElementById("totalQuantity").textContent = totalQuantity; // Оновлення загальної кількості в інтерфейсі
  updateCart(); // Оновлення відображення кошика
  updateTotal(); // Оновлення загальної суми
}

// Function to filter products by price range
function filterByPrice() {
  const minPrice = parseInt(document.getElementById("minPrice").value);
  const maxPrice = parseInt(document.getElementById("maxPrice").value);

  const filteredProducts = product.filter((item) => {
    return item.price >= minPrice && item.price <= maxPrice;
  });

  renderProducts(filteredProducts);
}

// Функція для очищення кошика та локального сховища
function clearCart() {
  cart = []; // Очищення масиву кошика
  cartCounter = 0; // Скидання лічильника
  totalQuantity = 0; // Скидання загальної кількості
  document.getElementById("totalQuantity").textContent = totalQuantity; // Оновлення загальної кількості в інтерфейсі
  updateCart(); // Оновлення відображення кошика
  updateTotal(); // Оновлення загальної суми
  localStorage.removeItem("cartData"); // Видалення даних з локального сховища
}
