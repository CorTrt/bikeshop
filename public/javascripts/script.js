var stripe = Stripe('pk_test_51GyDjgKFvi617IjsDMYvHMq3vAV8a6Am2eS07Am0Bxr0w0XeTFqT7pFTYSlkLxmrvQM6fgSLc3EoR7xGvHXrz4TX0067gTlfYm');
var checkoutButton = $("#checkout-button");

// checkoutButton.click(
//     function(){

//         fetch('/create-checkout-session', {
//             method: 'POST',
//           })
//           .then(function(response) {
//             return response.json();
//           })
//           .then(function(session) {
//             return stripe.redirectToCheckout({ sessionId: checkoutButton[0].dataset.id });
//           })
//           .then(function(result) {
//             // If `redirectToCheckout` fails due to a browser or network
//             // error, you should display the localized error message to your
//             // customer using `error.message`.
//             if (result.error) {
//               alert(result.error.message);
//             }
//           })
//           .catch(function(error) {
//             console.error('Error:', error);
//           });

//     });