const navIcon = document.querySelector(".nav-icon");
const notyf = new Notyf({
    types: [
        {
            type: "success",
            background: "var(--primary-color)"
        }
    ]
});
// Navbar icon click handler
navIcon.addEventListener("click", function () {
    document.querySelector(".nav-items").classList.toggle("show");
    if (navIcon.classList.contains("fa-bars")) {
        navIcon.classList.replace("fa-bars", "fa-xmark");
    } else {
        navIcon.classList.replace("fa-xmark", "fa-bars");
    }
});

//logout handler
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
    document.querySelector(".login-box").innerHTML = `<button onclick="logout()" class="btn btn-danger">Logout</button>`;
}

function logout() {
    localStorage.removeItem("currentUser");
    notyf.success("logout successful.");
    setTimeout(() => {
        location = "/user/login";
    }, 1000);
}



const orders = JSON.parse(localStorage.getItem("orders"));
const userOrders = orders.filter(item => item.email === currentUser.email);

function displayOrders() {
    const orderList = document.querySelector(".order-list");
    for (let item of userOrders) {
        const totalPrice = item.orders.reduce((accumalator, current) => accumalator + Number(current.price * current.quantity), 0);
        const dishes = item.orders;
        console.log();

        orderList.innerHTML += `<div class="order-card">
            <div class="row">
                <div class="col-md-8 order-info">
                    <h5>Order Id:${item.id}</h5>
                    <p><strong>Date: </strong>${new Date(item.date).toDateString()}</p>
                    <p><strong>Items:</strong> ${dishes.map(dish => dish.name)} </p>
                    <p><strong>Total:</strong> Rs.${totalPrice + 200}</p>
                    <p>
                        <strong>Status: </strong>
                        <span class="order-status status-${item.status.toLowerCase()}">${item.status}</span>
                    </p>
                </div>
            </div>
        </div>`;
    }
}

displayOrders();