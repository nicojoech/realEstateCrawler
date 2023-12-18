document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!validateLogin(username, password)) {
        return;
    }

    const formData = new FormData(document.getElementById('loginForm'));
    loginUser(formData)

    document.getElementById("loginForm").reset();

});


function validateLogin(username, password) {

    if (username.length === 0 || username === null) {
        alert("Username must not be empty");
        return false;
    }

    if (password.length === 0 || password === null) {
        alert("Password must not be empty");
        return false;
    }

    return true;
}

const loginUser = async (formData) => {
    try {
        const response = await fetch('http://localhost:8000/token', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            const accessToken = data.access_token;
            const username = data.username;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('username', username);
            window.location.href = '/src/index.html';
        } else {
            console.error('Server error:', response.statusText);
            alert("Login failed. Please try again.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An unexpected error occurred. Please try again.");
    }
};



