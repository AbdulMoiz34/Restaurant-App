const notyf = new Notyf();
AOS.init();

// Take restaurants from local storage.
const restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];

function Dish(name, price, desc, image) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.image = image;
    this.id = Date.now();
}

// find restaurant from restaurants by id
function findRestaurantById(id) {
    return restaurants.find(res => res.id === +id);
}

// set data in local storage
function setDataInLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

if (!restaurants.length) {
    document.querySelector(".add-dish-form").style.display = "none";
    document.querySelector(".head").classList.replace("d-none", "d-block");
}

// set restaurant names in choose a restaurant drop-down.
const restaurantSelect = document.querySelector("#restaurantSelect");
for (let res of restaurants) {
    restaurantSelect.innerHTML += `<option value="${res.id}">${res.name}</option>`;
}

// when addDish form will be submitted, it will be invoked.
function onSubmitHandler() {
    const name = document.querySelector("#dishName").value;
    const desc = document.querySelector("#dishDescription").value;
    const price = document.querySelector("#dishPrice").value;
    const imageEl = document.querySelector("#dishImage").files[0];
    const restaurantId = document.querySelector("#restaurantSelect").value;
    if (!name) {
        notyf.error("Please Enter a name of the dish.");
        return;
    } else if (!price) {
        notyf.error("Please Enter price of the dish.");
        return;
    } else if (!desc) {
        notyf.error("Please Enter description.");
    } else if (!imageEl) {
        notyf.error("Select an image.");
        return;
    } else if (!restaurantId) {
        notyf.error("Select a restaurant.");
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        const dish = new Dish(name, price, desc, e.target.result);
        const restaurant = findRestaurantById(restaurantId);
        restaurant.dishes.push(dish);
        setDataInLS("restaurants", restaurants);
        notyf.success("Dish has been added.");
    }
    reader.readAsDataURL(imageEl);
}

function logout() {
    localStorage.setItem("login", false);
    notyf.success("logout successful.");
    setTimeout(function () {
        location = "/admin/login";
    }, 1000);
}