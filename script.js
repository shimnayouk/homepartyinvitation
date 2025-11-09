// Supabase Configuration
const SUPABASE_URL = 'https://viqkuzrksrbejvuiiqvd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcWt1enJrc3JiZWp2dWlpcXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2Nzg3MTgsImV4cCI6MjA3ODI1NDcxOH0.nPAK5Ppb2tlg4bUFqZh4KrEYZ7MXiwA1Fk0VBUVWndA';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// RSVP Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvpForm');
    const confirmMessage = document.getElementById('confirmMessage');

    form.addEventListener('submit', async function(e) {
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
            companions: parseInt(companions),
            message: message,
            created_at: new Date().toISOString()
        };

        try {
            // Save to Supabase
            const { data, error } = await supabase
                .from('rsvp')
                .insert([formData]);

            if (error) {
                console.error('Error saving RSVP:', error);
                alert('참석 여부 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
                return;
            }

            console.log('RSVP saved successfully:', data);

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

        } catch (err) {
            console.error('Unexpected error:', err);
            alert('참석 여부 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    });
});
