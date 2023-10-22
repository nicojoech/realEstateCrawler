document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user1 = "admin";
    const user1pw = "admin";

    if(username !== user1 || password !== user1pw){
        alert("Ungültige Eingabe!");
        return
    }

    document.getElementById("loginForm").reset();
});
