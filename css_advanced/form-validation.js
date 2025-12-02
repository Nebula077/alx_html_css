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

// Example usage
const testForm1 = {
    age: 25,
    text: 'This is a sample text for validation. It should pass because it has fewer than 100 words and less than 1000 characters.'
};

const testForm2 = {
    age: 17,
    text: 'Short text'
};

const testForm3 = {
    age: 35,
    text: 'word '.repeat(150) // 150 words, exceeds limit
};

const testForm4 = {
    age: 45,
    text: 'a'.repeat(1500) // 1500 characters, exceeds limit
};

console.log('=== Form Validation Test ===\n');

console.log('Test 1 (Should Pass):');
const result1 = validateForm(testForm1);
console.log('Valid:', result1.isValid);
if (result1.errors.length > 0) console.log('Errors:', result1.errors);
console.log(`Words: ${testForm1.text.trim().split(/\s+/).length}, Characters: ${testForm1.text.length}\n`);

console.log('Test 2 (Age too low):');
const result2 = validateForm(testForm2);
console.log('Valid:', result2.isValid);
console.log('Errors:', result2.errors);
console.log(`Words: ${testForm2.text.trim().split(/\s+/).length}, Characters: ${testForm2.text.length}\n`);

console.log('Test 3 (Too many words):');
const result3 = validateForm(testForm3);
console.log('Valid:', result3.isValid);
console.log('Errors:', result3.errors);
console.log(`Words: ${testForm3.text.trim().split(/\s+/).length}, Characters: ${testForm3.text.length}\n`);

console.log('Test 4 (Too many characters):');
const result4 = validateForm(testForm4);
console.log('Valid:', result4.isValid);
console.log('Errors:', result4.errors);
console.log(`Words: ${testForm4.text.trim().split(/\s+/).length}, Characters: ${testForm4.text.length}\n`);
