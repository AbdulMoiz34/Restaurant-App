const notyf = new Notyf();
AOS.init();
const restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
function getIdfromURL () {
    const params = new URLSearchParams(location.search);
    return params.get("id");
}

function findRestaurantById (id) {

}
if(getIdfromURL()) {
    console.log("true");
}

// set data in local storage.
    function Restaurant(name, desc, location, rating, img, contactNumber, isDelivery) {
        this.name = name;
        this.desc = desc;
        this.location = location;
        this.rating = rating;
        this.img = img;
        this.contactNumber = contactNumber;
        this.isDelivery = isDelivery;
        this.id = Date.now();
        this.dishes = [];
    }

// set data in local storage
function setDataInLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// find restaurant by name.
function findRestaurantByName(name) {
    return restaurants.find(res => res.name.toLowerCase() === name.toLowerCase());
}

// when addRestaurant form will be submitted, it will be invoked.
function onSubmitHandler() {
    const name = document.querySelector("#restaurantName").value;
    const desc = document.querySelector("#restaurantDescription").value;
    const location = document.querySelector("#restaurantLocation").value;
    const rating = document.querySelector("#restaurantRating").value;
    const imgFile = document.querySelector("#restaurantImage").files[0];
    const contactNumber = document.querySelector("#restaurantContact").value;
    const isDelivery = document.querySelector("#deliveryAvailable").checked;
    const isNameFound = findRestaurantByName(name);
    if (isNameFound) {
        notyf.error(`${name} is already existed`);
        return;
    }
    if (!name) {
        notyf.error("Enter Restaurant Name");
        return;
    }
    if (!desc) {
        notyf.error("Enter Restaurant Description")
        return;
    }
    if (!location) {
        notyf.error("Enter Restaurant Location.");
        return;
    }

    if (!rating) {
        notyf.error("Enter Restaurant Rating.");
        return;
    }

    if (+rating < 1 || +rating > 5) {
        notyf.error("must be between 1 and 5.");
        return;
    }
    if (!imgFile) {
        notyf.error("Please Select an image.");
        return;
    }
    if (!contactNumber) {
        notyf.error("Enter Restaurant no.");
        return;
    }
    const img = URL.createObjectURL(imgFile);
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = function (e) {
        const url = e.target.result;
        const restaurant = new Restaurant(name, desc, location, rating, url, contactNumber, isDelivery);
        console.log(restaurant);
        restaurants.push(restaurant);
        setDataInLS("restaurants", restaurants);
        notyf.success("Restaurant has been added.");
        setTimeout(function () {
            window.location.href = "/admin/addDish/";
        }, 1000);
    }
}