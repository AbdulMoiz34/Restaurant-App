const notyf = new Notyf();
AOS.init();

function onLoginHandler() {
    event.preventDefault();
    const adminUsername = document.querySelector("#username").value;
    const adminPass = document.querySelector("#password").value;
    const username = "12345";
    const password = "12345";
    if (adminUsername === username) {
        if (adminPass == password) {
            notyf.success("Login sucessful.");
            localStorage.setItem("login" , true);
            location = "/admin";
            return;
        } else {
            notyf.error("Kindly Enter correct key.");
            return;
        }
    } else {
        notyf.error("Enter accurate username.");
        return;
    }
}