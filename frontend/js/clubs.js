const clubsContainer =
document.getElementById("clubContainer");

const apiBaseUrl = "http://localhost:5000/api";

const getProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Please login before joining a club.");
    }

    const response = await fetch(`${apiBaseUrl}/auth/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Please login again.");
    }

    return data;
};

const joinClub = async (clubId) => {
    try {
        const profile = await getProfile();
        const response = await fetch(`${apiBaseUrl}/memberships`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                student: profile._id,
                club: clubId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Could not send join request");
        }

        alert("Join request sent successfully.");
    } catch (error) {
        alert(error.message);

        if (error.message.toLowerCase().includes("login")) {
            window.location.href = "login.html";
        }
    }
};

fetch(`${apiBaseUrl}/clubs`)
.then(res => res.json())
.then(data => {

    clubsContainer.innerHTML = "";

    if (!data.length) {
        clubsContainer.innerHTML = "<p>No clubs found.</p>";
        return;
    }

    data.forEach(club => {

        clubsContainer.innerHTML += `
            <div class="club-card">
                <h3>${club.name}</h3>
                <p>${club.description}</p>
                <button type="button" data-club-id="${club._id}">Join Club</button>
            </div>
        `;

    });

    clubsContainer.querySelectorAll("button[data-club-id]").forEach((button) => {
        button.addEventListener("click", () => joinClub(button.dataset.clubId));
    });
})
.catch(error => {
    clubsContainer.innerHTML = `<p>${error.message}</p>`;
});
