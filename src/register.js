document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const newFirstName = document.getElementById("newFirstName").value;
  const newLastName = document.getElementById("newLastName").value;
  const newEmail = document.getElementById("newEmail").value;
  const newUsername = document.getElementById("newUsername").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!validateForm(newFirstName, newLastName, newEmail, newUsername, newPassword, confirmPassword)) {
    return;
  }

  document.getElementById("registerForm").reset();
  alert("Registration successful!");
});

function validateForm(firstName, lastName, email, username, password, confirmPassword) {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please check your input.");
    return false;
  }

  if (!passwordPattern.test(password)) {
    alert("Password must be at least 8 characters long and include at least one letter and one number.");
    return false;
  }

  if (!email || !username || !firstName || !lastName) {
    alert("Please fill out all fields.");
    return false;
  }

  if (!emailPattern.test(email)) {
    alert("Invalid email format. Please enter a valid email address.");
    return false;
  }

  // Additional validation rules for other fields can be added similarly.

  return true;
}
