// Function to generate a random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Function to send an email
function sendEmail(email, otp) {
    emailjs.send("service_efj2459", "template_ab8m40i", {
            to_email: email,
            message_html: "Your OTP is " + otp,
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    const generateOTPButton = document.getElementById("generate-otp");
    const registrationForm = document.getElementById("registration-form");

    generateOTPButton.addEventListener("click", function() {
        const emailInput = document.getElementById("email");
        const email = emailInput.value;
        const generatedOTP = generateOTP();
        sendEmail(email, generatedOTP); // Call sendEmail function with email and OTP
        // Optionally, you can notify the user that the OTP has been sent
        alert("OTP has been sent to your email.");
    });
    
    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const email = document.getElementById("email").value;
        const enteredOTP = document.getElementById("otp").value;
        const generatedOTP = document.getElementById("otp").getAttribute("data-generated-otp");
    
        if (enteredOTP == generatedOTP) {
            console.log("OK");
            // Handle successful OTP validation
        } else {
            console.log("Failed");
            // Handle failed OTP validation
        }
    });
    

});
