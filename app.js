AOS.init();

const navIcon = document.querySelector(".nav-icon");
const restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
const restaurantList = document.querySelector("#restaurant-list");


// Navbar icon click handler
navIcon.addEventListener("click", function () {
    document.querySelector(".nav-items").classList.toggle("show");
    if (navIcon.classList.contains("fa-bars")) {
        navIcon.classList.replace("fa-bars", "fa-xmark");
    } else {
        navIcon.classList.replace("fa-xmark", "fa-bars");
    }
});

const customerReviews = {
    "Alex Johnson": {
        img: "https://ntrepidcorp.com/wp-content/uploads/2016/06/team-1.jpg",
        review: "Fantastic experience! The platform is smooth and the recommendations are spot on.",
        rating: 5,
    },
    "Jane Smith": {
        img: "https://media.istockphoto.com/id/1664876848/photo/happy-crossed-arms-and-portrait-of-asian-man-in-studio-smile-for-career-work-and-job.jpg?s=612x612&w=0&k=20&c=2vYaOMnlmzMEmB441bTWHUyeFXRIh56wE79QAhVWYBk=",
        review: "Fantastic experience! The platform is smooth and the recommendations are spot on.",
        rating: 4.5,
    },
    "John Doe": {
        img: "https://media.istockphoto.com/id/1664876848/photo/happy-crossed-arms-and-portrait-of-asian-man-in-studio-smile-for-career-work-and-job.jpg?s=612x612&w=0&k=20&c=2vYaOMnlmzMEmB441bTWHUyeFXRIh56wE79QAhVWYBk=",
        review: "The service is amazing, and the food is even better! I always have a great dining experience.",
        rating: 4.2,
    }
};

// display reviews
function displayReviews() {
    const list = document.querySelector(".review-list");
    for (let key in customerReviews) {
        const customer = customerReviews[key];
        list.innerHTML += `<div class="testimonial-card">
                        <div class="d-flex align-items-center">
                            <div class="testimonial-avatar">
                                <img src="${customer.img}" alt="${key}">
                            </div>
                            <div class="ms-3 testimonial-content">
                                <h5 class="testimonial-name">${key}</h5>
                                <div class="testimonial-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                </div>
                            </div>
                        </div>
                        <p class="testimonial-text">"${customer.review}."</p>
                    </div>`;
    }
}

const swiper = new Swiper('.mySwiper', {
    effect: 'coverflow',         // 3D-like Coverflow effect
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    coverflowEffect: {
        rotate: 50,       // rotation angle
        stretch: 0,       // stretch space between slides
        depth: 100,       // depth offset
        modifier: 1,      // effect multipler
        slideShadows: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

function DisplayRestaurants() {
    restaurantList.innerHTML  = "";
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
            <a href="/menu/index.html?restaurant=${res.id}" class="btn btn-view mt-4">View Dishes</a>
        </div>
    </div>
</div>`;
    }
}
if (!restaurants.length) {
    restaurantList.innerHTML = "<div class='head text-center '>There are no restaurant to display!</div>";
} else {
    DisplayRestaurants();
}
displayReviews();