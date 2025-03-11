AOS.init();

const restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
const notyf = new Notyf();

// Dish Constructor
function Dish(name, price, desc, img, id) {
    this.name = name;
    this.price = price;
    this.desc = desc;
    this.image = img;
    this.id = id;
}

function Restaurant(name, desc, location, dishes, rating, contactNo, isDelivery, img, id) {
    this.name = name;
    this.desc = desc;
    this.location = location;
    this.rating = rating;
    this.contactNumber = contactNo;
    this.isDelivery = isDelivery;
    this.img = img;
    this.id = id;
    this.dishes = dishes;
}

// set data in local storage
function setData(key, value, msg) {
    localStorage.setItem(key, JSON.stringify(value));
    notyf.success(msg);
}

// check user login or not.
const isLogin = localStorage.getItem("login");
if (!isLogin || isLogin == "false") {
    location = "/admin/login";
}

// find restaurant by id
function findRestaurantById(id) {
    return restaurants.find(res => res.id == id);
}

function DisplayRestaurants() {
    const restaurantsTable = document.querySelector(".restaurants-table");
    restaurantsTable.innerHTML = "";
    let count = 0;
    for (let res of restaurants) {
        restaurantsTable.innerHTML += `<tr>
                    <td>${++count}</td>
                    <td>${res.name}</td>
                    <td>${res.desc?.length > 15 ? res.desc.slice(0, 15) + "..." : res.desc}</td>
                    <td>${res.rating}</td>
                    <td class="action-icons">
                        <i class="fas fa-edit text-warning" data-bs-toggle="modal" onclick="openRestaurantEditModal(${res.id})" data-bs-target="#editRestaurantModal"></i>
                        <i class="fas fa-trash text-danger" onclick="deleteRestaurant(${res.id})"></i>
                    </td>
                    <td><button class="btn bg-black text-white" onclick="viewDishesHandler(${res.id})">View Dishes</button></td>
                </tr>`;
    }
}
const restaurantEditForm = document.querySelector("#editRestaurantForm");
function openRestaurantEditModal(id) {
    restaurant = findRestaurantById(id);
    const name = restaurantEditForm.querySelector("#restaurantName");
    const desc = restaurantEditForm.querySelector("#restaurantDescription");
    const location = restaurantEditForm.querySelector("#restaurantLocation");
    const rating = restaurantEditForm.querySelector("#restaurantRating");
    const contactNo = restaurantEditForm.querySelector("#restaurantContact");
    const isDelivery = restaurantEditForm.querySelector("#deliveryAvailable");
    name.value = restaurant.name;
    desc.value = restaurant.desc;
    location.value = restaurant.location;
    rating.value = restaurant.rating;
    contactNo.value = restaurant.contactNumber;
    isDelivery.checked = restaurant.isDelivery || false;
}

function editResSubmitHandler() {
    console.log(restaurant);
    event.preventDefault();
    console.log("test");

    const name = restaurantEditForm.querySelector("#restaurantName");
    const desc = restaurantEditForm.querySelector("#restaurantDescription");
    const location = restaurantEditForm.querySelector("#restaurantLocation");
    const rating = restaurantEditForm.querySelector("#restaurantRating");
    const contactNo = restaurantEditForm.querySelector("#restaurantContact");
    const isDelivery = restaurantEditForm.querySelector("#deliveryAvailable");
    let img = restaurantEditForm.querySelector("#restaurantImage");
    const restaurantIdx = restaurants.findIndex(res => res.id == restaurant.id);
    if (img.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(img.files[0]);
        reader.onload = function (e) {
            img = e.target.result;
            const EditedRestaurant = new Restaurant(name.value, desc.value, location.value, restaurant.dishes, rating.value, contactNo.value, isDelivery, img, restaurant.id);
            restaurants[restaurantIdx] = EditedRestaurant;
            setData("restaurants", restaurants, "Restaurant has been updated.");
        }
    } else {
        const EditedRestaurant = new Restaurant(name.value, desc.value, location.value, restaurant.dishes, rating.value, contactNo.value , isDelivery.checked, restaurant.img, restaurant.id);
        restaurants[restaurantIdx] = EditedRestaurant;
        setData("restaurants", restaurants, "Restaurant has been updated.");
    }
    setTimeout(DisplayRestaurants , 500);
}

function deleteRestaurant(id) {
    const isConfirm = confirm("Do u want to delete todo?");
    if (isConfirm) {
        const idx = restaurants.findIndex(res => res.id === id);
        restaurants.splice(idx, 1);
        localStorage.setItem("restaurants", JSON.stringify(restaurants));
        DisplayRestaurants();
        notyf.success("Restaurant Has been deleted.");
    } else {
        alert("Cancel");
    }
}

function logout() {
    localStorage.setItem("login", false);
    notyf.success("logout successful.");
    setTimeout(function () {
        location = "/admin/login";
    }, 1000);
}
let restaurant;
function viewDishesHandler(id) {
    const dishContainer = document.querySelector(".dish-container");
    const dishesTable = document.querySelector(".dishes-table");
    dishesTable.innerHTML = ``;
    restaurant = findRestaurantById(id);
    const dishes = restaurant.dishes;
    if (!dishes.length) {
        document.querySelector(".empty-dish-notify").classList.remove("d-none");
        dishContainer.classList.add("d-none");
        return;
    }
    document.querySelector(".empty-dish-notify").classList.add("d-none");
    for (let i = 0; i < dishes.length; i++) {
        const dish = dishes[i];
        dishesTable.innerHTML += `
        <tr>    
                 <td>${i + 1}</td> 
                    <td>${dish.name}</td>
                    <td>${dish.desc?.length > 20 ? dish.desc.slice(0, 20) + "..." : dish.desc}</td>
                    <td>${dish.price}</td>
                    <td>${restaurant.name}</td>
                    <td class="action-icons">
                        <i class="fas fa-edit text-warning" onclick="openEditDishModal(${dish.id})" data-bs-toggle="modal" data-bs-target="#editDishModal"></i>
                        <i class="fas fa-trash text-danger" onclick="deleteDish(${dish.id})"></i>
                        </td>
                </tr>`;
    }
    dishContainer.classList.remove("d-none");
}

function deleteDish(dishId) {
    const dishes = restaurant.dishes;
    const findIdx = dishes.findIndex(dish => dish.id == dishId);
    dishes.splice(findIdx, 1);
    localStorage.setItem("restaurants", JSON.stringify(restaurants));
    console.log(restaurant);
    event.target.closest("tr").remove();
    notyf.success("Dish has been deleted.");
}


const dishEditForm = document.querySelector("#editDishForm");
const name = dishEditForm.querySelector("#dishName");
const price = dishEditForm.querySelector("#dishPrice");
const desc = dishEditForm.querySelector("#dishDescription");
let imgInput = dishEditForm.querySelector("#dishImage");
let dishId;
function openEditDishModal(id) {
    dishId = id;
    console.log(dishId);
    const dishes = restaurant.dishes;
    let dish = dishes.find(dish => dish.id == dishId);
    name.value = dish.name;
    price.value = dish.price;
    desc.value = dish.desc;
}

function EditDishModalSubmitHandler() {
    event.preventDefault();
    const dishes = restaurant.dishes;
    let dish = dishes.find(dish => dish.id == dishId);
    const findIdx = dishes.findIndex(dish => dish.id == dishId);
    console.log(dish, findIdx);

    if (imgInput.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(imgInput.files[0]);
        reader.onload = function (e) {
            img = e.target.result;
            const newDish = new Dish(name.value, price.value, desc.value, img, dish.id);
            dishes[findIdx] = newDish;
            setData("restaurants", restaurants, "Dish has been edited.");
        }
    } else {
        const newDish = new Dish(name.value, price.value, desc.value, dish.image, dish.id);
        console.log(newDish);
        dishes[findIdx] = newDish;
        setData("restaurants", restaurants, "Dish has been edited.");
        setTimeout(() => {
            viewDishesHandler(restaurant.id);
        }, 500);
    }
}
dishEditForm.addEventListener("submit", () => EditDishModalSubmitHandler());
restaurantEditForm.addEventListener("submit", () => editResSubmitHandler());
DisplayRestaurants();
