document.addEventListener("DOMContentLoaded", loadEntries);

function saveEntry() {
    let title = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let entry = document.getElementById("entry").value;
    let mood = document.getElementById("mood").value;

    if (!title || !date || !entry) {
        alert("Please fill in all fields before saving.");
        return;
    }

    let journalEntry = {
        title,
        date,
        entry,
        mood
    };

    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.push(journalEntry);
    localStorage.setItem("journalEntries", JSON.stringify(entries));

    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("entry").value = "";

    loadEntries();
}

function loadEntries() {
    let entriesDiv = document.getElementById("entries");
    entriesDiv.innerHTML = "";
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    entries.forEach((entry, index) => {
        let entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        entryDiv.innerHTML = `
            <h3>${entry.title}</h3>
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Mood:</strong> ${entry.mood}</p>
            <p>${entry.entry}</p>
            <button onclick="deleteEntry(${index})">Delete</button>
        `;
        entriesDiv.appendChild(entryDiv);
    });
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.splice(index, 1);
    localStorage.setItem("journalEntries", JSON.stringify(entries));
    loadEntries();
}