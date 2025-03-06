const restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
const list = document.querySelector(".dishes");
const checkoutBtn = document.querySelector(".check-out-btn");
// Navbar icon click handler
const navIcon = document.querySelector(".nav-icon");
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

const id = getIdfromURL();
const restaurant = getRestaurantById(id);

if (!id || !restaurant) {
    document.body.innerHTML = `<div class="d-flex justify-content-center align-items-center fs-1"><span>Error 404</span></div>`;
}

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

displayRestaurantData();

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
                            <button class="btn btn-primary" onclick="addCart('${dish.name}')">Add to cart</button>
                        </div>
                    </div>
                </div>`;
    }
}

displayDishes();


// check out btn
checkoutBtn.addEventListener("click", function () {
    const shoppingCart = document.querySelector(".shopping-cart-container");
    if (shoppingCart.classList.contains("d-none")) {
       shoppingCartHandler();
    }
    shoppingCart.classList.toggle("d-none");
});

function increment() {
    const input = event.target.previousSibling.previousSibling;
    input.value++;
    input.value = input.value;
}
function decrement() {
    const input = event.target.nextSibling.nextSibling;
    input.value--;
    input.value = input.value;
}


const shoppingCart = JSON.parse(localStorage.getItem("shoppingCarts")) || [];
function addCart(name) {
    const selectedDish = restaurant.dishes.find(dish => dish.name == name);
    shoppingCart.push(selectedDish);
    localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCart));
    console.log(shoppingCart);
}


function shoppingCartHandler() {
    const list = document.querySelector(".product-list");
    list.innerHTML = "";
    for (let res of shoppingCart) {
        list.innerHTML += ` <div class="product mb-3">
                    <div class="d-flex gap-3 align-items-center">
                        <div class="d-flex align-items-center flex-fill">
                            <img src="${res.image}"
                                width="80" height="80" alt="">
                        </div>
                        <div class="d-flex flex-column justify-content-center flex-fill">
                            <div class="name fw-bold">${res.name}</div>
                            <div class="desc">${res.desc}</div>
                        </div>
                        <div class="d-flex flex-column">
                            <div class="price text-decoration text-center">
                              ${res.price}
                            </div>
                            <div class="d-flex">
                                <button onclick="decrement()">&minus;</button>
                                <input disabled type="number" value="1" />
                                <button onclick="increment()">&plus;</button>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
}