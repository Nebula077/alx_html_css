function getBoredActivity() {
    fetch('https://bored-api.appbrewery.com/random')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching activity: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const activity = data.activity;
            console.log('Suggested activity:', activity);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}

// Call once, then wait 5 seconds before calling again
getBoredActivity();
setTimeout(() => getBoredActivity(), 5000);

const mainHeading = document.getElementById('heading');
mainHeading.style.color = 'blue';
mainHeading.style.fontSize = '48px';
mainHeading.style.textAlign = 'center';
mainHeading.style.textDecoration = 'underline';
mainHeading.innerText = 'Welcome to the Boredom Buster!';

// Form validation function
function validateForm(formData) {
    const errors = [];

    // Validate age (must be between 18-99)
    if (!formData.age || formData.age < 18 || formData.age > 99) {
        errors.push('Age must be between 18 and 99');
    }

    // Validate form text (word count and character limit)
    if (!formData.text || formData.text.trim() === '') {
        errors.push('Form text cannot be empty');
    } else {
        const charCount = formData.text.length;
        const wordCount = formData.text.trim().split(/\s+/).length;

        if (charCount > 1000) {
            errors.push(`Character limit exceeded: ${charCount}/1000 characters`);
        }

        if (wordCount > 100) {
            errors.push(`Word limit exceeded: ${wordCount}/100 words`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

const feedbackForm = document.getElementById('feedback-form');  
feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    if (!email.includes('@')) {
        emailInput.style.borderColor = 'red';
        emailError.style.display = 'block';
        return;
    }
    emailInput.style.borderColor = '';
    emailError.style.display = 'none';
    const feedback = document.getElementById('feedback').value;
    const feedbackInput = document.getElementById('feedback');
    const feedbackError = document.getElementById('feedback-error');
    if (feedback.length < 10) {
        feedbackInput.style.borderColor = 'red';
        feedbackError.style.display = 'block';
        return;
    }
    feedbackInput.style.borderColor = '';
    feedbackError.style.display = 'none';
    const age = document.getElementById('age').value;
    if (!age || age < 18 || age > 99) {
        alert('Age must be between 18 and 99');
        return;
    }
    
    // Validate form with new validation function
    const validation = validateForm({
        age: parseInt(age),
        text: feedback
    });

    if (!validation.isValid) {
        console.error('Validation errors:', validation.errors);
        return;
    }

    console.log(`Feedback received from ${email}, age ${age}: ${feedback}`);
})