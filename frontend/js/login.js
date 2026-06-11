const form = document.getElementById("loginForm");

const showLoginMessage = (message) => {
    let messageBox = document.getElementById("loginMessage");

    if (!messageBox) {
        messageBox = document.createElement("p");
        messageBox.id = "loginMessage";
        messageBox.className = "form-message";
        form.appendChild(messageBox);
    }

    messageBox.textContent = message;
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    try {
        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        if (data.role === "head") {
            window.location.href = "head-dashboard.html";
            return;
        }

        if (data.role === "admin") {
            window.location.href = "admin-dashboard.html";
            return;
        }

        window.location.href = "dashboard.html";
    } catch (error) {
        showLoginMessage(error.message);
    }
});
