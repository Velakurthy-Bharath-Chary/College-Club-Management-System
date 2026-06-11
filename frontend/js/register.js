const registerForm = document.getElementById("registerForm");

const showRegisterMessage = (message, isError = true) => {
    let messageBox = document.getElementById("registerMessage");

    if (!messageBox) {
        messageBox = document.createElement("p");
        messageBox.id = "registerMessage";
        messageBox.className = "form-message";
        registerForm.appendChild(messageBox);
    }

    messageBox.textContent = message;
    messageBox.classList.toggle("success", !isError);
};

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(
            "http://localhost:5000/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }

        showRegisterMessage("Registration successful. Please login.", false);
        registerForm.reset();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 800);
    } catch (error) {
        showRegisterMessage(error.message);
    }
});
