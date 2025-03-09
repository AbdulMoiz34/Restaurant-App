const orders = JSON.parse(localStorage.getItem("orders")) || [];
const orderList = document.querySelector(".order-list");

function displayOrders() {
    orderList.innerHTML = "";
    for (let i = orders?.length - 1; i >= 0; i--) {
        let item = orders[i];
        const totalPrice = item.orders.reduce((accumalator, current) => accumalator + Number(current.price), 0);
        const dishes = item.orders;
        orderList.innerHTML += `<div class="order-card">
            <h5>Order #${item.id}</h5>
            <p><strong>User:</strong> ${item.user}</p>
            <p><strong>Email:</strong> ${item.email}</p>
            <p><strong>Items:</strong>${dishes.map(dish => dish.name).join(", ")}</p>
            <p><strong>Date:</strong> ${new Date(item.date).toDateString()}</p>
            <p><strong>Time:</strong> ${new Date(item.date).toLocaleTimeString()}</p>
            <p>
                <strong>Status:</strong>
                <span class="order-badge status-pending" id="status-${item.id}">${item.status}</span>
            </p>
            <p><strong>Total:</strong> Rs.${totalPrice + 200}</p>
            <div class="mb-3">
                <label for="statusSelect-${item.id}" class="form-label">Update Status:</label>
                <select id="statusSelect-${item.id}" class="form-select">
                    <option value="Pending" selected>Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>
            <button class="btn btn-update" onclick="handleUpdateStatus(${item.id})">Update Status</button>
        </div>`;
    }
}

if (!orders.length) {
    orderList.innerHTML = `<div class="text-center">No Orders are available.</div>`;
} else {
    displayOrders();

}


function handleUpdateStatus(orderId) {
    const newStatus = document.getElementById(`statusSelect-${orderId}`).value;
    const statusBadge = document.getElementById(`status-${orderId}`);
    const currentOrder = orders.find(item => item.id == orderId);
    setTimeout(() => {
        statusBadge.textContent = newStatus;
        statusBadge.className = 'order-badge';
        if (newStatus === 'Pending') {
            statusBadge.classList.add('status-pending');
        } else if (newStatus === 'Confirmed') {
            statusBadge.classList.add('status-confirmed');
        } else if (newStatus === 'Delivered') {
            statusBadge.classList.add('status-delivered');
        } else if (newStatus === 'Cancelled') {
            statusBadge.classList.add('status-cancelled');
        }
        alert(`Order ${orderId} updated to ${newStatus}`);
        currentOrder.status = newStatus;
        localStorage.setItem("orders", JSON.stringify(orders));
        console.log();
        console.log(currentOrder);
    }, 500); // Simulate network delay (500ms)
}


function filterOrders(type) {
    if (type == "all") {
        return displayOrders();
    }
    orderList.innerHTML = "";
    const filteredOrders = orders.filter(item => item.status.toLowerCase() == type);
    console.log(filteredOrders);
    const navItems = document.querySelectorAll(".order-filter-nav .nav-link");
    navItems.forEach(el => el.classList.remove("active"));
    event.target.classList.add("active");

    if (!filteredOrders.length) {
        return orderList.innerHTML = `<div class="text-center">No Orders are available.</div>`;
    }

    for (let i = filteredOrders?.length - 1; i >= 0; i--) {
        let item = filteredOrders[i];

        const totalPrice = item.orders.reduce((accumalator, current) => accumalator + Number(current.price), 0);
        const dishes = item.orders;
        orderList.innerHTML += `<div class="order-card">
            <h5>Order #${item.id}</h5>
            <p><strong>User:</strong> ${item.user}</p>
            <p><strong>Email:</strong> ${item.email}</p>
            <p><strong>Items:</strong>${dishes.map(dish => dish.name).join(", ")}</p>
            <p><strong>Date:</strong> ${new Date(item.date).toDateString()}</p>
            <p><strong>Time:</strong> ${new Date(item.date).toLocaleTimeString()}</p>
            <p>
                <strong>Status:</strong>
                <span class="order-badge status-${item.status.toLowerCase()}" id="status-${item.id}">${item.status}</span>
            </p>
            <p><strong>Total:</strong> Rs.${totalPrice + 200}</p>
            <div class="mb-3">
                <label for="statusSelect-${item.id}" class="form-label">Update Status:</label>
                <select id="statusSelect-${item.id}" class="form-select">
                    <option value="Pending" selected>Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>
            <button class="btn btn-update" onclick="handleUpdateStatus(${item.id})">Update Status</button>
        </div>`;
    }
}