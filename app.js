AOS.init();
const restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
const restaurantList = document.querySelector("#restaurant-list");
if (!restaurants.length) {
    const main = document.querySelector(".main");
    main.innerHTML = "<div class='head text-center '>There are no restaurant to display!</div>";
}

for (let res of restaurants) {
    restaurantList.innerHTML += `<div class="col-lg-4 col-md-6" data-aos="fade-up">
                <div class="card restaurant-card shadow-sm">
                    <img src="${res.img}" class="card-img-top" alt="Restaurant 2">
                    <div class="card-body text-center">
                        <h5 class="card-title">${res.name}</h5>
                        <p class="text-muted">${res.desc.length > 70 ? res.desc.slice(0, 70) + "..." : res.desc}</p>
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>${res.rating}
                        </div>
                        <a href="menu.html?restaurant=${res.id}" class="btn btn-primary mt-2">View Dishes</a>
                    </div>
                </div>
            </div>`;
}