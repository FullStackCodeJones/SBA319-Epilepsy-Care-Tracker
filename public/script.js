// Contact Management
document.getElementById("contact-form").addEventListener("submit", addContact);
async function addContact(event) {
  event.preventDefault();

  const name = document.getElementById("contact-name").value;
  const relationship = document.getElementById("contact-relationship").value;
  const phoneNumber = document.getElementById("contact-phone").value;

  const response = await fetch("/api/patient/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, relationship, phoneNumber }),
  });

  if (response.ok) {
    loadContacts();
  }
}

async function loadContacts() {
  const response = await fetch("/api/patient/contacts");
  const contacts = await response.json();
  const contactsList = document.getElementById("contacts-list");
  contactsList.innerHTML = "";

  contacts.forEach((contact) => {
    const li = document.createElement("li");
    li.textContent = `${contact.name} - ${contact.relationship} - ${contact.phoneNumber}`;
    contactsList.appendChild(li);
  });
}

// Seizure Tracker
document.getElementById("seizure-form").addEventListener("submit", addSeizure);
async function addSeizure(event) {
  event.preventDefault();

  const date = document.getElementById("seizure-date").value;
  const time = document.getElementById("seizure-time").value;
  const description = document.getElementById("seizure-description").value;

  const response = await fetch("/api/patient/seizures", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, time, description }),
  });

  if (response.ok) {
    loadSeizures();
  }
}

async function loadSeizures() {
  const response = await fetch("/api/patient/seizures");
  const seizures = await response.json();
  const seizuresList = document.getElementById("seizures-list");
  seizuresList.innerHTML = "";

  seizures.forEach((seizure) => {
    const li = document.createElement("li");
    li.textContent = `${seizure.date} at ${seizure.time} - ${seizure.description}`;
    seizuresList.appendChild(li);
  });
}

// Medication Reminder
document
  .getElementById("medication-form")
  .addEventListener("submit", addMedication);
async function addMedication(event) {
  event.preventDefault();

  const name = document.getElementById("medication-name").value;
  const time = document.getElementById("medication-time").value;

  const response = await fetch("/api/patient/medications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, time }),
  });

  if (response.ok) {
    loadMedications();
  }
}

async function loadMedications() {
  const response = await fetch("/api/patient/medications");
  const medications = await response.json();
  const medicationsList = document.getElementById("medications-list");
  medicationsList.innerHTML = "";

  medications.forEach((medication) => {
    const li = document.createElement("li");
    li.textContent = `${medication.name} - Take at ${medication.time}`;
    medicationsList.appendChild(li);
  });
}

// Initialize by loading data
window.onload = () => {
  loadContacts();
  loadSeizures();
  loadMedications();
};
