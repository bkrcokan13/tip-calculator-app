// Tip Rate Select Percent Function
document.addEventListener('DOMContentLoaded', () => {
    var selectedIndex = null;
    const tipRateButtons = document.querySelectorAll('.tip-rate-button');

    tipRateButtons.forEach((button, idx) => {
        button.addEventListener('click', () => {
           if(selectedIndex === idx) {
                button.classList.remove('tip-button-selected');
                selectedIndex = null;
           }
           else {
            tipRateButtons.forEach(
                btn => btn.classList.remove('tip-button-selected')
            );
            button.classList.add('tip-button-selected');
            selectedIndex = idx;
           }

        });
    });
});

// Clear all inputs and errorStates
document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById("reset-tip-btn");
    const billInput = document.getElementById("bill-input-box");
    const personInput = document.getElementById("person-input-box");
    const tipAmountDisplay = document.getElementById("tip-amount-result");
    const totalAmountDisplay = document.getElementById("tip-total-result");
    const tipButtons = document.querySelectorAll('.tip-rate-button');
    const inputBoxes = document.querySelectorAll(".input-box");
    const errorMessages = document.getElementById("error-message");
    
    const resetInputs = () => {
        billInput.value = "";
        personInput.value = "";
        tipAmountDisplay.innerText = "$0.00";
        totalAmountDisplay.innerText = "$0.00";
    };

    const resetTipButtons = () => {
        tipButtons.forEach(button => button.classList.remove("tip-button-selected"));
    };

    const resetErrorStates = () => {
        inputBoxes.item(1).classList.remove("person-input-box-error");
        errorMessages.style.display = "none";
    }

    resetButton.addEventListener('click', () => {
        resetInputs();
        resetTipButtons();
        resetErrorStates();
    });
});

//  Tip Calculate Function

document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById("reset-tip-btn");

    // Main Inputs
    const billInput = document.getElementById("bill-input-box");
    const personInput = document.getElementById("person-input-box");
    const tipRateButtons = document.querySelectorAll('.tip-rate-button');
    const customTipRateInput = document.getElementById("tip-rate-custom-input");
    const personInputBoxError = document.querySelector(".person-box");
    const tipAmountDisplay = document.getElementById("tip-amount-result");
    const totalAmountDisplay = document.getElementById("tip-total-result");
    const errorMessages = document.getElementById("error-message");
    
    const calculateTip = (tipRate, billPrice, personNumber) => {

        // Ex: %30 -> 0.30
        const decimalTipRate  = Number(tipRate) / 100;
        const totalTip = billPrice * decimalTipRate;
        const tipPerPerson = totalTip / personNumber; 

        return {
            'totalTip' : "$" + totalTip.toFixed(2),
            'tipPerPerson' : "$" + tipPerPerson.toFixed(2) 
        }

    }


    const values = {
        'billValue': 0,
        'personValue': 0,
        'tipRateValue': 0,
    };
    
    personInput.addEventListener('input', () => {
        const personValue = Number(personInput.value);
    
        if (personValue <= 0 || isNaN(personValue)) {
            errorMessages.style.display = "flex";
            personInputBoxError.classList.add("person-input-box-error");
            personIsEmpty = true;
        } else {
            errorMessages.style.display = "none";
            personInputBoxError.classList.remove("person-input-box-error");
            values.personValue = personValue;
            values.billValue = Number(billInput.value); 
        }
    
        updateResults();
    });
    
    customTipRateInput.addEventListener('input', () => {
        const tipRateValue = Number(customTipRateInput.value);
    
        if (tipRateValue < 0 || isNaN(tipRateValue)) {
            alert("The custom tip amount cannot be less than 0.");
        } else {
            values.tipRateValue = tipRateValue;
        }
    
        updateResults();
    });
    
    tipRateButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const dataKeyValue = button.getAttribute('data-key');
            values.tipRateValue = Number(dataKeyValue);
            customTipRateInput.value = '';
            updateResults();
        });
    });
    
    function updateResults() {
        const result = calculateTip(values.tipRateValue, values.billValue, values.personValue);
        tipAmountDisplay.innerText = result.tipPerPerson;
        totalAmountDisplay.innerText = result.totalTip;
    }
});