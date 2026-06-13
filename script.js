document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';

    const payload = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        plateNumber: document.getElementById('plateNumber').value,
        category: document.getElementById('category').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value
    };

    const n8nWebhookUrl = 'https://parasatropa.app.n8n.cloud/webhook/biyahe-feedback-report';

    fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            statusMessage.style.color = 'green';
            statusMessage.innerText = 'Report submitted successfully!';
            document.getElementById('feedbackForm').reset();
        } else {
            throw new Error('Server error');
        }
    })
    .catch(error => {
        statusMessage.style.color = 'red';
        statusMessage.innerText = 'Failed to submit.';
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Submit Report';
    });
});