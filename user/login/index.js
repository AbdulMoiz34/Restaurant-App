// Create an instance of Notyf
let notyf = new Notyf({
    types: [
        {
            type: "success",
            background: "var(--primary-color)"
        }
    ]
});
const loginForm = document.getElementById("login-form");
const users = JSON.parse(localStorage.getItem("users")) || [];
const isLogin = localStorage.getItem("currentUser") || false;

if (isLogin) {
    location = "/";
}

// find user by email.
function findUserByEmail(email) {
    return users.find(user => user.email === email);
}

function loginFormHandler() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = findUserByEmail(email);
    if (!user) {
        notyf.error("User not found");
        return;
    }
    if (password !== user.password) {
        notyf.error("Password is not matched.");
        return;
    }
    notyf.success("Login Succesfull.");
    localStorage.setItem("currentUser", JSON.stringify(user));
    setTimeout(function () {
        location = `/`;
    }, 1000);
}

// loginform submit listener
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    loginFormHandler();
});