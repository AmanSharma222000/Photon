function logSubmit(event) {
    log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    event.preventDefault();
    console.log("hello");
  }
  
const form = document.getElementById('form');
const log = document.getElementById('log');
form.addEventListener('submit', logSubmit);