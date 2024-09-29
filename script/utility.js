let selectedSeats = 0; // Global variable to track selected seats
const maxSeats = 4;    // Maximum allowed selections
const seatPrice = 550; // Price per seat
let selectedSeatNumbers = []; // Array to hold selected seat numbers
let totalPrice = 0; // Global variable to hold the total price

function buttonClick(elementId) {
    const button = document.getElementById(elementId);
    button.addEventListener('click', function () {
        // Check if the seat is already selected (unselect if clicked again)
        if (button.classList.contains('selected')) {
            // Unselect the seat by removing the 'selected' class
            button.classList.remove('selected');
            button.style.backgroundColor = ''; // Reset the button background color

            // Remove the seat from the selected list
            selectedSeatNumbers = selectedSeatNumbers.filter(seat => seat !== elementId);
            updateSelectedSeatList(); // Update seat display

            // Increment the seat number back (because a seat is unselected)
            let seat = seatNum();
            seat += 1; // Increment seat count by 1

            // Update seat count in the DOM
            updateSeatNumber(seat);

            // Decrease the selectedSeats counter
            selectedSeats -= 1;

            return; // Exit the function after unselecting the seat
        }

        // Check if the number of selected seats has reached the limit
        if (selectedSeats >= maxSeats) {
            alert(`You can only select up to ${maxSeats} seats.`);
            return;
        }

        // Mark the seat as selected
        button.classList.add('selected');

        // Change button background color to indicate selection
        button.style.backgroundColor = '#1DD100';

        // Decrement the seat number
        let seat = seatNum();
        seat -= 1; // Decrement seat count by 1

        // Update seat count in the DOM
        updateSeatNumber(seat);

        // Add the selected seat to the array and update display
        selectedSeatNumbers.push(elementId);
        updateSelectedSeatList();

        // Increase the selectedSeats counter
        selectedSeats += 1;
    });
}

function seatNum() {
    // Get the button element that contains the seat number and text
    const seatNumber = document.getElementById('seat-number').innerText;

    // Extract only the numeric part using regex to find digits
    const seat = seatNumber.match(/\d+/)[0];

    return parseInt(seat); // Return the numeric part as an integer
}

function updateSeatNumber(newSeatCount) {
    const seatButton = document.getElementById('seat-number');
    seatButton.innerHTML = `${newSeatCount} <span>Seats left</span>`;
}

function updateSelectedSeatList() {
    // Update the seat number in the element with id="SeatNo"
    const seatNoElement = document.getElementById('SeatNo');
    seatNoElement.innerHTML = ''; // Clear previous content

    // Reset total price
    totalPrice = 0; // Reset total price

    // Append each seat number in a table row
    selectedSeatNumbers.forEach(seat => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${seat}</td>
            <td>Economy</td>
            <td>${seatPrice} TK</td>
        `;
        seatNoElement.appendChild(row);

        // Increment total price
        totalPrice += seatPrice;
    });

    // Update total price in the DOM
    document.getElementById('TotalPrice').innerText = `BDT ${totalPrice}`;
}

const applyBtn = document.getElementById('apply-button');
applyBtn.addEventListener('click', function () {
    const discountInput = document.getElementById('couponInput');
    const discount = discountInput.value;
    console.log(discount);

    if (discount === 'NEW15' || discount === 'new15') {
        const discountAmount = totalPrice * 0.15; // Calculate 15% discount
        const discountedPrice = totalPrice - discountAmount; // Apply discount

        console.log('Valid Code', `Discounted Price: BDT ${discountedPrice}`);
        // Update the total price display with the discounted price
        document.getElementById('discount-price').innerText = `BDT ${discountedPrice}`;
    } else {
        const Amount = totalPrice;
        document.getElementById('discount-price').innerText = `BDT ${Amount}`;
    }
});
