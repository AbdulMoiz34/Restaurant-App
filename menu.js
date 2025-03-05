const restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
const list = document.querySelector(".dishes");
function getIdfromURL() {
    const params = new URLSearchParams(location.search);
    return params.get("restaurant");
}
function getRestaurantById(id) {
    return restaurants.find(res => res.id == id);
}
const id = getIdfromURL();

if (!id) {
    document.body.innerHTML = `<div class="d-flex justify-content-center align-items-center fs-1"><span>Error 404</span></div>`;
}

function displayDishes() {
    const restaurant = getRestaurantById(id);
    console.log(restaurant);
    debugger;
    const dishes = restaurant.dishes;
    if (!dishes.length) {
        list.innerHTML = "<div>Currently, we don't have any dishes.</div>";
        return;
    }

    for (let dish of dishes) {
        list.innerHTML += ` <div class="col-md-4">
                <div class="card dish-card">
                    <div class="position-relative">
                        <img src="${dish.image}" class="card-img-top" alt="Dish 3">
                        <div class="img-overlay">
                            <h5>${dish.name}</h5>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="dish-desc">${dish.desc}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="dish-price">${dish.price}</span>
                            <a href="#" class="btn btn-order">Order Now</a>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}

displayDishes();
