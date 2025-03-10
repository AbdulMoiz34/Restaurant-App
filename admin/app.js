AOS.init();

const restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
const notyf = new Notyf();

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
                        <i class="fas fa-edit text-warning" onclick="editRestaurant(${res.id})"></i>
                        <i class="fas fa-trash text-danger" onclick="deleteRestaurant(${res.id})"></i>
                    </td>
                    <td><button class="btn bg-black text-white" onclick="viewDishesHandler(${res.id})">View Dishes</button></td>
                </tr>`;
    }
}

function editRestaurant(id) {
    const restaurant = findRestaurantById(id);
    Swal.fire({
        title: 'Edit Restaurant',
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Restaurant Name" value="${restaurant.name}">
          <input id="swal-input2" class="swal2-input" placeholder="Location" value="${restaurant.location}">
          <div style="text-align: left; margin: 10px 0;">
            <label for="swal-input3" style="font-weight: 500; display:block; margin-bottom: 5px;">Restaurant Image</label>
            <label for="swal-input3" class="custom-file-upload" style="cursor: pointer; padding: 8px 12px; background: #007bff; color: #fff; border-radius: 4px; display: inline-block;">Choose File</label>
            <input type="file" id="swal-input3" style="display: none;">
          </div>
          <input id="swal-input4" class="swal2-input" placeholder="Rating" value="${restaurant.rating}">
          <textarea id="swal-input5" class="swal2-textarea" placeholder="Description">${restaurant.desc}</textarea>
          <div style="text-align: left; margin: 10px 0;">
            <label style="display: block; color: #555; margin-bottom: 5px;">Delivery Available</label>
            <input type="checkbox" id="swal-input6" style="width: 20px; height: 20px;" ${restaurant.isDelivery ? "checked" : ""}>
          </div>
          <input id="swal-input7" type="number" class="swal2-input" placeholder="Contact Number" value="${restaurant.contactNumber}">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Update',
        preConfirm: () => {
            const fileInput = document.getElementById('swal-input3');
            return {
                name: document.getElementById('swal-input1').value,
                location: document.getElementById('swal-input2').value,
                img: fileInput.files.length > 0 ? fileInput.files[0] : restaurant.img,
                rating: document.getElementById('swal-input4').value,
                desc: document.getElementById('swal-input5').value,
                isDelivery: document.getElementById('swal-input6').checked,
                contactNumber: document.getElementById('swal-input7').value,
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const updatedRestaurant = { ...restaurant, ...result.value };
            const idx = restaurants.findIndex(res => res.id == id);
            restaurants.splice(idx, 1, updatedRestaurant);
            localStorage.setItem("restaurants", JSON.stringify(restaurants));
            console.log('Updated restaurant details:', result.value);
            notyf.success("Restaurant has been updated.");
        }
    });
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
                        <i class="fas fa-edit text-warning" onclick=""></i>
                        <i class="fas fa-trash text-danger" onclick="deleteDish(${dish.id})"></i>
                        </td>
                </tr>`;
    }
    dishContainer.classList.remove("d-none");
}

function deleteDish(dishId) {
    const dishes = restaurant.dishes;
    console.log(dishes);
    const findIdx = dishes.findIndex(dish => dish.id == dishId);
    dishes.splice(findIdx, 1);
    localStorage.setItem("restaurants", JSON.stringify(restaurants));
    console.log(restaurant);
    event.target.closest("tr").remove();
    notyf.success("Dish has been deleted.");
}
DisplayRestaurants();