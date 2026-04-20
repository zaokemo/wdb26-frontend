//const apiUrl = "https://wdb26-exempel-deployment-testing.2.rahtiapp.fi/api/ip";
const apiUrl = "http://127.0.0.1:8080";


async function getBookings() {
    const res = await fetch(`${apiUrl}/bookings`);
    const bookings = await res.json();

    console.log(bookings)

    document.getElementById("bookings-list").innerHTML = '';
    for (b of bookings) {
        document.getElementById("bookings-list").innerHTML += `
            <li>${b.id} - ${b.datefrom} - rum ${b.room_number} - ${b.guest_name} - ${b.nights} nätter, totalt: ${b.total_price} €</li>
        `;
    }
    
}
getBookings();

async function getRooms() {
    const res = await fetch(`${apiUrl}/rooms`);
    const rooms = await res.json();

    console.log(rooms)

    for (room of rooms) {
        document.getElementById("room-list").innerHTML += `
            <option value="${room.id}">
                ${room.room_number} - 
                ${room.room_type} - 
                ${room.price} €
            </option>
        `;
    }
}
getRooms();

async function getGuests() {
    const res = await fetch(`${apiUrl}/guests`);
    const guests = await res.json();

    console.log(guests)

    for (guest of guests) {
        document.getElementById("guest-list").innerHTML += `
            <option value="${guest.id}">
                ${guest.firstname} - 
                ${guest.lastname} (${guest.prev_visits} tidigare besök)
            </option>
        `;
    }
}
getGuests();


async function saveBooking() {

    const booking = {
        room_id: document.getElementById("room-list").value,
        guest_id: document.getElementById("guest-list").value,
        datefrom: document.getElementById("datefrom").value,
        dateto: document.getElementById("dateto").value
    }
    const res = await fetch(`${apiUrl}/bookings`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(booking)
    });
    const data = await res.json();

    console.log(data);
    getBookings();
}

document.getElementById('btn-save').addEventListener('click', saveBooking);