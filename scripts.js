document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const message = document.getElementById('message').value;
    const statusElement = document.getElementById('status');

    // Simple validation
    if (name === '' || email === '' || message === '') {
        statusElement.textContent = 'Please fill out all fields.';
        statusElement.style.color = 'red';
        return;
    }

    // If validation passes, submit the form
    const form = this;
    fetch('contact.php', {
        method: 'POST',
        body: new FormData(form),
    })
    .then(response => response.text())
    .then(data => {
        statusElement.textContent = data;
        form.reset(); // Reset form on success
        statusElement.style.color = 'green';
    })
    .catch(error => {
        statusElement.textContent = 'Something went wrong. Please try again later.';
        statusElement.style.color = 'red';
    });
});
