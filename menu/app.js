const navIcon = document.querySelector(".nav-icon");
const restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
const list = document.querySelector(".dishes");
const checkoutBtn = document.querySelector(".check-out-btn");
let notyf = new Notyf({
    types: [
        {
            type: "success",
            background: "var(--primary-color)"
        }
    ]
});
let shoppingCart = JSON.parse(localStorage.getItem("shoppingCarts")) || [];
const id = getIdfromURL();
const restaurant = getRestaurantById(id);
const isLogin = localStorage.getItem("currentUser") || false;
if (isLogin) {
    document.querySelector(".login-box").innerHTML = `<button onclick="logout()" class="btn btn-danger">Logout</button>`;
}

function logout() {
    localStorage.removeItem("currentUser");
    notyf.success("logout successful.");
    setTimeout(() => {
        location = "/user/login";
    }, 1000);
}

function getUserByEmail(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(user => user.email == email);
}

// helper function (It'll set data in LS).
function setData(key, value, msg) {
    localStorage.setItem(key, JSON.stringify(value));
    return notyf.success(msg);
}

// Navbar icon click handler
navIcon.addEventListener("click", function () {
    document.querySelector(".nav-items").classList.toggle("show");
    if (navIcon.classList.contains("fa-bars")) {
        navIcon.classList.replace("fa-bars", "fa-xmark");
    } else {
        navIcon.classList.replace("fa-xmark", "fa-bars");
    }
});

function getIdfromURL() {
    const params = new URLSearchParams(location.search);
    return params.get("restaurant");
}

function getRestaurantById(id) {
    return restaurants.find(res => res.id == id);
}


if (!id || !restaurant) {
    document.body.innerHTML = `<div class="d-flex justify-content-center align-items-center fs-1"><span>Error 404</span></div>`;
}

// It will display restaurant information
function displayRestaurantData() {
    const restaurantImg = document.querySelector(".img-restaurant");
    const restaurantName = document.querySelector(".restaurant-name");
    const restaurantDesc = document.querySelector(".description");
    const restaurantLocation = document.querySelector(".location");
    const restaurantRating = document.querySelector(".restaurant-rating");
    const contactNumber = document.querySelector(".contact-number");
    restaurantImg.src = restaurant.img;
    restaurantName.textContent = restaurant.name;
    restaurantDesc.textContent = restaurant.desc;
    restaurantLocation.innerHTML = `<strong>Location:</strong> ${restaurant.location}`;
    restaurantRating.textContent = restaurant.rating;
    contactNumber.innerHTML = `<strong>Contact:</strong> ${restaurant.contactNumber}`;
}

// call initially
displayRestaurantData();

// It will display all the dishes of that restuarant
function displayDishes() {
    const dishesList = document.querySelector(".dishes-list");
    const dishes = restaurant.dishes;
    if (!dishes.length) {
        dishesList.innerHTML = `<div class="text-center">No dishes are available.</div>`;
        return;
    }
    for (let dish of dishes) {
        console.log(dish);
        dishesList.innerHTML += ` <div class="col-md-4">
                    <div class="card dish-card">
                        <img src="${dish.image}" class="card-img-top" alt="Dish 1">
                        <div class="card-body">
                            <p class="price">Rs. <span class="fw-bold">${dish.price}</span></p>
                            <h5 class="card-title"> ${dish.name}</h5>
                            <p class="card-text">${dish.desc}</p>
                            <button class="btn btn-primary" onclick="addToCartHandler('${dish.id}')">Add to cart</button>
                        </div>
                    </div>
                </div>`;
    }
}

// call initially
displayDishes();

// check out btn
checkoutBtn.addEventListener("click", function () {
    const shoppingCart = document.querySelector(".shopping-cart-container");
    if (shoppingCart.classList.contains("d-none")) {
        displayShopingCarts();
    }
    shoppingCart.classList.toggle("d-none");
});

function increment(id) {
    const input = event.target.previousSibling.previousSibling;
    input.value++;
    input.value = input.value;
    if (input.value > 0) {
        input.previousSibling.previousSibling.disabled = false;
    }
    const item = shoppingCart.find(item => item.id == id);
    item.quantity = input.value;
    orderHandler();
    localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCart));
}

function decrement(id) {
    const input = event.target.nextSibling.nextSibling;
    if (input.value == 1) {
        event.target.disabled = true;
    } else {
        input.value--;
        input.value = input.value;
        const item = shoppingCart.find(item => item.id == id);
        item.quantity = input.value;
        localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCart));
        orderHandler();
    }
    input.value = input.value;
}

function addToCartHandler(id) {
    const isFound = shoppingCart.find(res => res.id == id);
    notyf.success("Dish has been added.");
    if (isFound) {
        isFound.quantity++;
        isFound.quantity = isFound.quantity;
        localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCart));
        shoppingCartTitle();
        return;
    }
    const selectedDish = restaurant.dishes.find(dish => dish.id == id);
    shoppingCart.push({ ...selectedDish, quantity: 1 });
    localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCart));
    shoppingCartTitle();
}


function displayShopingCarts() {
    const quantity = document.querySelector(".shopping-cart-quantity");
    quantity.innerHTML = `<b>${shoppingCart.length}</b>`;
    const list = document.querySelector(".product-list");
    list.innerHTML = "";
    if (!shoppingCart.length) {
        list.innerHTML = `<div class="text-center">Currently, your checkout is empty.</div>`;
        list.previousElementSibling.style.display = "none";
        return;
    }
    for (let item of shoppingCart) {
        list.previousElementSibling.style.display = "block";
        list.innerHTML += ` <div class="product mb-3">
                    <div class="d-flex gap-3 align-items-center">
                    <button class="bg-transparent border-0" onclick="deleteCart('${item.id}')">
                            <i class="fa-solid fa-trash"></i>
                    </button>
                        <div class="d-flex align-items-center flex-fill">
                            <img src="${item.image}"
                                width="80" height="80" alt="">
                        </div>
                        <div class="d-flex flex-column justify-content-center flex-fill">
                            <div class="name fw-bold">${item.name}</div>
                            <div class="desc">${item.desc}</div>
                        </div>
                        <div class="d-flex flex-column">
                            <div class="price text-decoration text-center">
                              ${item.price}
                            </div>
                            <div class="d-flex">
                                <button onclick="decrement('${item.id}')">&minus;</button>
                                <input disabled type="number" value="${item.quantity}" />
                                <button onclick="increment('${item.id}')">&plus;</button>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
    orderHandler();
}

// Order handler
function orderHandler() {
    const dc = 200;
    const totalDishesPrice = shoppingCart.reduce((accumulator, current) => accumulator + (current.price * current.quantity), 0);
    document.querySelector(".total-items-price").innerHTML = `Dishes Price:<span class="fw-bolder">${totalDishesPrice}</span>`;
    document.querySelector(".delivery-price").innerHTML = `Delivery Charges: <span class="fw-bolder">${dc}</span>`;
    document.querySelector(".total-price").innerHTML = `Total Price: <span class="fw-bolder">${totalDishesPrice + dc}</span>`;
    document.querySelector(".order-now-btn").classList.remove("d-none");
}

// orderNow button handler=> confirm order
const orders = JSON.parse(localStorage.getItem("orders")) || [];
document.querySelector(".order-now-btn").addEventListener("click", function () {
    if (!isLogin) {
        return notyf.error("Login required.");
    }
    const isConfirm = confirm("Confirm Order.");
    if (isConfirm) {
        const email = JSON.parse(localStorage.getItem("currentUser")).email;
        const user = getUserByEmail(email);
        notyf.success("Thank you for ordering.");
        const order = {
            user: user.name,
            email,
            id: Date.now(),
            orders: [...shoppingCart],
            date: new Date(),
            status: "pending",
        };
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        setTimeout(() => location = "/checkout", 500);
    }
})
function emptyShoppingCart() {
    const isConfirm = confirm("Empty shopping cart?");
    if (isConfirm) {
        shoppingCart = [];
        localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCart));
    }
}

function shoppingCartTitle() {
    const result = shoppingCart.reduce((initial, current) => Number(initial) + Number(current.quantity), 0);
    document.querySelector("#cart-counter").innerText = result;
}

function deleteCart(id) {
    let findIdx = shoppingCart.findIndex(item => item.id == id);
    shoppingCart.splice(findIdx, 1);
    setData("shoppingCarts", shoppingCart, "Item has been deleted.");
}
shoppingCartTitle();