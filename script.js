document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';

    const payload = {
        instructorName: document.getElementById('instructorName').value,
        email: document.getElementById('email').value,
        room: document.getElementById('room').value,
        startTime: document.getElementById('startTime').value,
        endTime: document.getElementById('endTime').value
    };

    // FIXED: Correct single URL path
    const n8nWebhookUrl = 'https://parasatropa.app.n8n.cloud/webhook/classroom-scheduler-trigger';

    fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            statusMessage.style.color = 'green';
            statusMessage.innerText = 'Request submitted successfully!';
            document.getElementById('bookingForm').reset();
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
        submitBtn.innerText = 'Submit Request';
    });
});
