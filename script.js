// Function to calculate Software Cost details
function calculateCost() {
    // Get input values
    const rentalIncome = getInputFloatValue('rentalIncome');
    const Units = getInputFloatValue('Units');
    const Usertype = document.getElementById('Usertype').value;
    const paymentMode = document.getElementById('paymentMode').value;

    // Validate inputs
    if (Usertype === "") {
        alert('Please select user type.');
        return;
    }

    if (paymentMode === "") {
        alert('Select mode of payment.');
        return;
    }

    // Validate inputs
    if (isNaN(rentalIncome) || isNaN(Units)) {
        alert('Please enter valid numeric inputs.');
        return;
    }

    // Calculate Software Cost details
    let Costperunit;
    if (Usertype === 'Landlord' && paymentMode === 'Monthly') {
        Costperunit = (rentalIncome / Units) * 0.03 * 1;
    } else if (Usertype === 'Landlord' && paymentMode === 'Quarterly') {
        Costperunit = (rentalIncome / Units) * 0.03 * 3;
    } else if (Usertype === 'Landlord' && paymentMode === 'Annually') {
        Costperunit = (rentalIncome / Units) * 0.03 * 12;
    } else if (Usertype === 'Property Manager' && paymentMode === 'Monthly') {
        Costperunit = (rentalIncome / Units) * 0.01 * 1;
    } else if (Usertype === 'Property Manager' && paymentMode === 'Quarterly') {
        Costperunit = (rentalIncome / Units) * 0.01 * 3;
    } else if (Usertype === 'Property Manager' && paymentMode === 'Annually') {
        Costperunit = (rentalIncome / Units) * 0.01 * 12;
    } else {
        Costperunit = 0;
        return;
    }

    // Validate discount rate
    let discount;
    if (paymentMode === 'Monthly') {
        discount = 0.00 * Costperunit;
    } else if (paymentMode === 'Quarterly') {
        discount = 0.05 * Costperunit;
    } else if (paymentMode === 'Annually') {
        discount = 0.10 * Costperunit;
    } else {
        discount = 0.00 * Costperunit;
        return;
    }

    const totalNetCost = (Costperunit - discount) * Units

    // Display results
    displayResults({
        rentalIncomes: rentalIncome,
        UnitsNo: Units,
        Costperunit: Costperunit,
        discount: discount,
        totalNetCost: totalNetCost,
    });

    // Show results and scroll to them
    const resultsElement = document.getElementById('results');
    resultsElement.style.display = 'block';
    resultsElement.scrollIntoView({ behavior: 'smooth' });
}

// Helper function to clear previous results
function clearResults() {
    const resultFields = ['rentalIncomes', 'UnitsNo', 'Costperunit', 'discount', 'totalNetCost'];
    resultFields.forEach(field => {
        document.getElementById(field).textContent = 'NaN';
    });
}

// Helper function to display results with thousands separators
function displayResults(results) {
    Object.keys(results).forEach(key => {
        const value = results[key];
        document.getElementById(key).textContent = formatCurrency(value);
    });
}

// Helper function to get float value from input
function getInputFloatValue(id) {
    return parseFloat(document.getElementById(id).value.replace(/,/g, ''));
}

// Helper function to format currency with thousands separator
function formatCurrency(amount) {
    return amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

// Apply formatting to input fields
document.addEventListener('DOMContentLoaded', function () {
    formatInputFieldWithCommas(document.getElementById('rentalIncome'));
    formatInputFieldWithCommas(document.getElementById('Units'));

    // Add event listener for User Type dropdown change
    document.getElementById('Usertype').addEventListener('change', function () {
        // Check if the inputs are valid before calculating
        const rentalIncome = getInputFloatValue('rentalIncome');
        const Units = getInputFloatValue('Units');

        if (!isNaN(rentalIncome) && !isNaN(Units)) {
            calculateCost();
        }
    });

    // Add event listener for payment mode dropdown change
    document.getElementById('paymentMode').addEventListener('change', function () {
        // Check if the inputs are valid before calculating
        const rentalIncome = getInputFloatValue('rentalIncome');
        const Units = getInputFloatValue('Units');

        if (!isNaN(rentalIncome) && !isNaN(Units)) {
            calculateCost();
        }
    });

    // Add event listener for input fields change
    document.getElementById('rentalIncome').addEventListener('input', function () {
        // Check if the inputs are valid before calculating
        const rentalIncome = getInputFloatValue('rentalIncome');
        const Units = getInputFloatValue('Units');

        if (!isNaN(rentalIncome) && !isNaN(Units)) {
            calculateCost();
        }
    });

    document.getElementById('Units').addEventListener('input', function () {
        // Check if the inputs are valid before calculating
        const rentalIncome = getInputFloatValue('rentalIncome');
        const Units = getInputFloatValue('Units');

        if (!isNaN(rentalIncome) && !isNaN(Units)) {
            calculateCost();
        }
    });
});

// Helper function to format input fields with comma separators
function formatInputFieldWithCommas(inputElement) {
    inputElement.addEventListener('input', function () {
        const value = inputElement.value.replace(/,/g, '');
        if (!isNaN(value)) {
            inputElement.value = parseFloat(value).toLocaleString('en-US');
        }
    });
}