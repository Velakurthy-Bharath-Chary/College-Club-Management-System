const apiBaseUrl = "http://localhost:5000/api";
const token = localStorage.getItem("token");

const joinedClubs = document.getElementById("joinedClubs");
const upcomingEvents = document.getElementById("upcomingEvents");
const notifications = document.getElementById("notifications");

const renderList = (element, items, emptyMessage) => {
    element.innerHTML = "";

    if (!items.length) {
        element.innerHTML = `<li>${emptyMessage}</li>`;
        return;
    }

    items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        element.appendChild(li);
    });
};

const loadDashboard = async () => {
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const profileResponse = await fetch(`${apiBaseUrl}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const profile = await profileResponse.json();

        if (!profileResponse.ok) {
            throw new Error(profile.message || "Please login again.");
        }

        const [membershipResponse, eventResponse] = await Promise.all([
            fetch(`${apiBaseUrl}/memberships`),
            fetch(`${apiBaseUrl}/events`)
        ]);

        const memberships = await membershipResponse.json();
        const events = await eventResponse.json();

        if (!membershipResponse.ok) {
            throw new Error(memberships.message || "Could not load memberships.");
        }

        if (!eventResponse.ok) {
            throw new Error(events.message || "Could not load events.");
        }

        const myMemberships = memberships.filter((membership) => {
            return membership.student && membership.student._id === profile._id;
        });

        const approvedClubs = myMemberships
            .filter((membership) => membership.status === "approved")
            .map((membership) => membership.club ? membership.club.name : "Unknown club");

        const eventItems = events.map((event) => {
            const eventDate = new Date(event.date).toLocaleDateString();
            const clubName = event.club ? ` - ${event.club.name}` : "";

            return `${event.title}${clubName} (${eventDate})`;
        });

        const notificationItems = myMemberships.map((membership) => {
            const clubName = membership.club ? membership.club.name : "a club";
            return `${clubName} membership is ${membership.status}`;
        });

        renderList(joinedClubs, approvedClubs, "No approved clubs yet.");
        renderList(upcomingEvents, eventItems, "No upcoming events found.");
        renderList(notifications, notificationItems, "No notifications yet.");
    } catch (error) {
        renderList(joinedClubs, [], error.message);
        renderList(upcomingEvents, [], "Could not load events.");
        renderList(notifications, [], "Could not load notifications.");

        if (error.message.toLowerCase().includes("login")) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "login.html";
        }
    }
};

loadDashboard();
