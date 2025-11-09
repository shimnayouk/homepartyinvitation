// RSVP Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvpForm');
    const confirmMessage = document.getElementById('confirmMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const attendance = document.querySelector('input[name="attendance"]:checked');
        const companions = document.getElementById('companions').value;
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name) {
            alert('이름을 입력해주세요.');
            return;
        }

        if (!attendance) {
            alert('참석 여부를 선택해주세요.');
            return;
        }

        // Prepare data
        const formData = {
            name: name,
            attendance: attendance.value,
            companions: companions,
            message: message,
            timestamp: new Date().toISOString()
        };

        // Log to console (for now - later can connect to Google Forms or backend)
        console.log('RSVP Submitted:', formData);

        // Show confirmation message
        confirmMessage.classList.add('show');

        // Reset form
        form.reset();

        // Hide confirmation after 5 seconds
        setTimeout(function() {
            confirmMessage.classList.remove('show');
        }, 5000);

        // Scroll to confirmation message
        confirmMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});
