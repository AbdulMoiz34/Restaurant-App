let notyf = new Notyf();
const signupForm = document.getElementById("signup-form");
const users = JSON.parse(localStorage.getItem("users")) || [];
// password validation
function isValidPassword(password) {
    let hasLower = false;
    let hasNumber = false;
    let hasSpecial = false;
    for (let char of password) {
        if (char >= "a" && char <= "z") hasLower = true;
        else if (char >= 0 && char <= 9) hasNumber = true;
        else if ("!@#$".includes(char)) hasSpecial = true;
        if (hasLower && hasNumber && hasSpecial) return true;
    }
}

// find user by email.
function findUserByEmail(email) {
    return users.find(function (user) {
        return user.email.toLowerCase() === email.toLowerCase();
    });
}

// signup form handler
function signUpFormHandler() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const emailFound = findUserByEmail(email);
    if (emailFound) {
        notyf.error("User has already been registered");
        return;
    }
    if (!isValidPassword(password)) {
        notyf.error("should be included numbers & special chars.");
        return;
    }
    users.push({ email, name, password });
    localStorage.setItem("users", JSON.stringify(users));
    notyf.success("signup successful.");
    setTimeout(function () {
        location = "/user/login";
    }, 1000);
}

// signupform submit listener
signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    signUpFormHandler();
});