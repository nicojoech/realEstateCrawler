document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const newFirstName = document.getElementById("newFirstName").value;
    const newLastName = document.getElementById("newLastName").value;
    const newEmail = document.getElementById("newEmail").value;
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
        alert("Die Passwörter stimmen nicht überein. Bitte überprüfen Sie Ihre Eingabe.");
        return;
    }

    document.getElementById("registerForm").reset();

});
