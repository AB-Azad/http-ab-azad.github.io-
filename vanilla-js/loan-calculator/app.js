// formaula applied from https://emicalculator.net/
let elLoanAmount = document.querySelector('#amount');
let elLoanInterest = document.querySelector('#interest');
let elPaybackYears = document.querySelector('#years');
let elForm = document.querySelector('#loan-form');
let elLoading = document.querySelector('#loading');
let elResult = document.querySelector('#results');

let elMonthlyPayment = document.querySelector('#monthly-payment');
let elTotalPayment = document.querySelector('#total-payment');
let elTotalInterest = document.querySelector('#total-interest');

// Add event listeners
addEventListeners();
function addEventListeners(){
	elForm.addEventListener('submit', calculateResult);
}

function calculateResult(e){
	e.preventDefault();

	let inputAmount  = parseFloat(elLoanAmount.value); // p
	let interestRate = parseFloat(elLoanInterest.value);
	let duration     = parseFloat(elPaybackYears.value) * 12; // n
	
	let calculatedInterest         = interestRate / 12 / 100; // r
	let x                          = Math.pow(1 + calculatedInterest, duration); 
	let monthlyPaymentWithInterest = (inputAmount*x*calculatedInterest)/(x-1);  // e

	// Clear values
	// elLoanAmount.value = '';
	// elLoanInterest.value = '';
	// elPaybackYears.value = '';

	elLoading.style.display = 'block';

	if(isFinite(monthlyPaymentWithInterest)){
		let totalAmountsToPay = monthlyPaymentWithInterest * duration,
		totalInterest = totalAmountsToPay - inputAmount;

		setTimeout(function(){
			elLoading.style.display = 'none';
			elResult.style.display = 'block';
		}, 300);

		elMonthlyPayment.value = monthlyPaymentWithInterest.toFixed(2);
		elTotalPayment.value   = totalAmountsToPay.toFixed(2);
		elTotalInterest.value  = totalInterest.toFixed(2);
	} else {
		elResult.style.display = 'none';
		elLoading.style.display = 'none';
		showMessage('Something wrong! Please check your numbers.');
	}
}

function showMessage(message){

	// Create message element
	let messageDiv = document.createElement('div');
	messageDiv.className = 'alert alert-danger';
	messageDiv.appendChild(document.createTextNode(message));

	let cardEl = document.querySelector('.card');
	let headingEl = document.querySelector('.heading');
	cardEl.insertBefore(messageDiv, headingEl);

	setTimeout(function(){
		messageDiv.remove();
	}, 3000);
}