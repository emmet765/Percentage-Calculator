function validateInputs(x, y) {
    return !isNaN(x) && !isNaN(y) && x !== null && y !== null;
}

// Basic Percentage
function calculateBasicPercentage() {
    const x = parseFloat(document.getElementById('basicX').value);
    const y = parseFloat(document.getElementById('basicY').value);
    
    if (!validateInputs(x, y)) {
        document.getElementById('basicResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const result = (x/100 * y).toFixed(2);
    document.getElementById('basicResult').innerHTML = `${x}% of ${y} is ${result}`;
}

// Finding What Percentage
function calculateWhatPercentage() {
    const x = parseFloat(document.getElementById('findingX').value);
    const y = parseFloat(document.getElementById('findingY').value);
    
    if (!validateInputs(x, y)) {
        document.getElementById('findingResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const result = (x/y * 100).toFixed(2);
    document.getElementById('findingResult').innerHTML = `${x} is ${result}% of ${y}`;
}

// Percentage Change
function calculatePercentageChange() {
    const original = parseFloat(document.getElementById('changeX').value);
    const newValue = parseFloat(document.getElementById('changeY').value);
    
    if (!validateInputs(original, newValue)) {
        document.getElementById('changeResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const change = ((newValue - original)/original * 100).toFixed(2);
    const type = change >= 0 ? "increase" : "decrease";
    document.getElementById('changeResult').innerHTML = `The percentage ${type} is ${Math.abs(change)}%`;
}

// Reverse Percentage
function calculateReversePercentage() {
    const x = parseFloat(document.getElementById('reverseX').value);
    const y = parseFloat(document.getElementById('reverseY').value);
    
    if (!validateInputs(x, y)) {
        document.getElementById('reverseResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const result = (x/y * 100).toFixed(2);
    document.getElementById('reverseResult').innerHTML = `The original number is ${result}`;
}

// Discount Calculation
function calculateDiscount() {
    const x = parseFloat(document.getElementById('discountX').value);
    const y = parseFloat(document.getElementById('discountY').value);
    
    if (!validateInputs(x, y)) {
        document.getElementById('discountResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const result = (y * x/100).toFixed(2);
    document.getElementById('discountResult').innerHTML = `The discount amount is $${result}`;
}

// Price After Discount
function calculateFinalPrice() {
    const x = parseFloat(document.getElementById('finalDiscountX').value);
    const y = parseFloat(document.getElementById('finalDiscountY').value);
    
    if (!validateInputs(x, y)) {
        document.getElementById('finalDiscountResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const result = (y * (1 - x/100)).toFixed(2);
    document.getElementById('finalDiscountResult').innerHTML = `The final price is $${result}`;
}

// Increase Calculation
function calculateIncrease() {
    const x = parseFloat(document.getElementById('increaseX').value);
    const y = parseFloat(document.getElementById('increaseY').value);
    
    if (!validateInputs(x, y)) {
        document.getElementById('increaseResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const result = (y * x/100).toFixed(2);
    document.getElementById('increaseResult').innerHTML = `The increase amount is ${result}`;
}

// Amount After Increase
function calculateFinalIncrease() {
    const x = parseFloat(document.getElementById('finalIncreaseX').value);
    const y = parseFloat(document.getElementById('finalIncreaseY').value);
    
    if (!validateInputs(x, y)) {
        document.getElementById('finalIncreaseResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const result = (y * (1 + x/100)).toFixed(2);
    document.getElementById('finalIncreaseResult').innerHTML = `The final amount is ${result}`;
}
