
const accessToken = localStorage.getItem('accessToken');
const username = localStorage.getItem('username');
const navigationDiv = document.getElementById('accountOptions');
console.log(accessToken)

if (!accessToken) {
    // Wenn kein access_token vorhanden ist, rendere die Login- und Sign-Up-Buttons
    document.addEventListener('DOMContentLoaded', function () {
        renderLoginButtons(navigationDiv);
    });
} else {
    // Wenn ein access_token vorhanden ist, rendere die Logout- und Benutzer-Buttons
    console.log("hello")
    document.addEventListener('DOMContentLoaded', function () {
        renderLogoutButtons(navigationDiv, username);
    });
}

function renderLoginButtons(parentElement) {
    // Erstelle den Login-Button
    const loginButton = createButton('Log in', 'login.html');
    parentElement.appendChild(loginButton);

    // Erstelle den Sign-Up-Button
    const signUpButton = createButton('Sign up', 'register.html');
    parentElement.appendChild(signUpButton);
}

function renderLogoutButtons(parentElement, username) {
    // Erstelle den Logout-Button
    const logoutButton = createButton('Logout', '#', handleLogout);
    parentElement.appendChild(logoutButton);

    // Erstelle den Benutzer-Button
    const userButton = createButton(username || 'User', '#', handleUserPage);
    parentElement.appendChild(userButton);
}

function createButton(text, href, clickHandler) {
    const button = document.createElement('a');
    button.href = href;
    button.classList.add('btn', 'text-primary', 'ml-2', 'border-primary', 'border-2', 'hover:bg-primary', 'hover:text-white', 't-ease');
    button.textContent = text;

    if (clickHandler) {
        button.addEventListener('click', clickHandler);
    }

    return button;
}

function handleLogout() {
    // Füge hier die Logik für den Logout hinzu, z.B. das Löschen des access_token und des Benutzernamens aus dem localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    // Optional: Weiterleitung zur Login-Seite oder eine andere gewünschte Seite
    window.location.href = 'login.html';
}

function handleUserPage() {
    // Füge hier die Logik für die Benutzer-Seite hinzu, z.B. eine Weiterleitung zur Benutzerprofil-Seite
    console.log('Navigate to user page');
    // Hier die entsprechende Weiterleitung
}
