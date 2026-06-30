/**
 * 1. Handles Movie Selection on gallery.html
 */
function selectMovie(movieName, impliedAgeGroup) {
    console.log("Movie selected successfully:", movieName);
    
    // Save selection variables into temporary session memory
    localStorage.setItem("selectedMovieName", movieName);
    localStorage.setItem("selectedMovieGroup", impliedAgeGroup);
    
    // Smoothly redirect the web viewport to the ticketing checkout form page
    window.location.href = "index.html";
}

/**
 * 2. Runs automatically when index.html finishes loading to look for saved data
 */
window.onload = function() {
    console.log("Page finished loading. Checking local memory storage...");
    
    let chosenMovieInput = document.getElementById("chosenMovie");
    
    // Verify if the input field actually exists on the currently active window view
    if (chosenMovieInput) {
        let savedMovie = localStorage.getItem("selectedMovieName");
        console.log("Found movie in memory:", savedMovie);
        
        if (savedMovie) {
            chosenMovieInput.value = savedMovie;
        } else {
            chosenMovieInput.value = "None Selected - Please go back to the Catalog";
        }
    }
};

/**
 * 3. Evaluates input entries and prints out the finalized Munjiro Ticket Layout
 */
function generateTicket() {
    let nameElement = document.getElementById("userName");
    let phoneElement = document.getElementById("userPhone");
    let movieElement = document.getElementById("chosenMovie");

    if (!nameElement || !phoneElement || !movieElement) return;

    let name = nameElement.value.trim();
    let phone = phoneElement.value.trim();
    let movie = movieElement.value;

    // Safety checks: Block uninitialized fields or empty entries
    if (movie.includes("None Selected") || movie === "") {
        alert("Please visit the Gallery / Catalog page first to select your movie!");
        return;
    }
    if (name === "" || phone === "") {
        alert("Please provide both your name and phone number to complete the booking.");
        return;
    }

    // Pull configuration parameters out of local system memory
    let ageGroup = localStorage.getItem("selectedMovieGroup") || "adult";
    let contextualNotification = "";
    let ticketType = "";

    if (ageGroup === "child") {
        ticketType = "Child Admission Ticket";
        contextualNotification = "🎉 FREE POPCORN VALUE NOTICE: This ticket includes a free complimentary container of popcorn at the counter rows!";
    } else {
        ticketType = "Standard Adult Admission";
        contextualNotification = "NOTICE OF COMPLIANCE: Please maintain close supervisory coverage over any accompanying minors inside the rows.";
    }

    // Construction of the printable receipt block layout
    let ticketHTML = `
        <div class="ticket">
            <h3>🎬 MUNJIRO CINEMA TICKET</h3>
            <p><strong>FILM SELECTED:</strong> ${movie}</p>
            <p><strong>TICKET HOLDER:</strong> ${name.toUpperCase()}</p>
            <p><strong>CONTACT PHONE:</strong> ${phone}</p>
            <p><strong>TIER ASSIGNED:</strong> ${ticketType}</p>
            <div class="notice">${contextualNotification}</div>
        </div>
    `;

    document.getElementById("ticketDisplay").innerHTML = ticketHTML;
}