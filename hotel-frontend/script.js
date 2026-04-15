//const apiUrl = "https://wdb26-exempel-deployment-testing.2.rahtiapp.fi/api/ip";
const apiUrl = "http://127.0.0.1:8080";

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

async function saveBooking() {

    const booking = {
        room_id: document.getElementById("room-list").value,
        guest_id: 1, // TEMP hardcoded
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
}

document.getElementById('btn-save').addEventListener('click', saveBooking);