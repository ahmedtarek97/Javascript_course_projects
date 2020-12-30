document.getElementById('loan-form').addEventListener('submit',function(e){
    // hide the results to dissapear if calculate is preesed again
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults ,2000)
    

    e.preventDefault();
});

function calculateResults(e){
    
    // UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    
    // calculation
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //monthly calculation
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        //show results and delete the loading icon
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
      } else {
        showError('Please check your numbers');
      }
    
    e.preventDefault();
}

function showError(error){

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')
    errorDiv.appendChild(document.createTextNode(error));

    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'none';

    // Insert error above heading
    card.insertBefore(errorDiv,heading)

    // clear error after 3 seconds
    setTimeout(clearError, 3000)
}

function clearError(){
    document.querySelector('.alert').remove();
}