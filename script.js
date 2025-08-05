// Initialize dark mode and rounding preferences
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', null);
        }
        updateAllCharts(); // Refresh charts with new theme
    });

    // Accordion functionality
    const accordionBtn = document.querySelector('.accordion-button');
    const accordionContent = document.querySelector('.accordion-content');
    
    accordionBtn.addEventListener('click', function() {
        accordionContent.classList.toggle('active');
        this.textContent = accordionContent.classList.contains('active') 
            ? 'Common Applications ▼' 
            : 'Common Applications ►';
    });

    // Initialize all charts
    initializeCharts();
});

// Utility Functions
function getRoundingValue() {
    return parseInt(document.getElementById('roundingSelect').value);
}

function createPieChart(canvasId, value, total, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const percentage = (value / total) * 100;
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Destroy existing chart if it exists
    if (window.charts && window.charts[canvasId]) {
        window.charts[canvasId].destroy();
    }

    const newChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [label, 'Remaining'],
            datasets: [{
                data: [percentage, 100 - percentage],
                backgroundColor: [
                    '#2196F3',
                    isDarkMode ? '#4d4d4d' : '#f0f0f0'
                ],
                borderColor: isDarkMode ? '#2d2d2d' : '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: isDarkMode ? '#fff' : '#333'
                    }
                }
            }
        }
    });

    // Store chart reference
    if (!window.charts) window.charts = {};
    window.charts[canvasId] = newChart;
}

function updateAllCharts() {
    // Refresh all active charts with current theme
    Object.keys(window.charts || {}).forEach(canvasId => {
        const chart = window.charts[canvasId];
        if (chart) {
            const isDarkMode = document.body.classList.contains('dark-mode');
            chart.options.plugins.legend.labels.color = isDarkMode ? '#fff' : '#333';
            chart.data.datasets[0].backgroundColor[1] = isDarkMode ? '#4d4d4d' : '#f0f0f0';
            chart.data.datasets[0].borderColor = isDarkMode ? '#2d2d2d' : '#fff';
            chart.update();
        }
    });
}

// Basic Percentage Calculator
function calculateBasicPercentage() {
    const x = parseFloat(document.getElementById('basicX').value);
    const y = parseFloat(document.getElementById('basicY').value);
    
    if (!validateInputs(x, y)) {
        document.getElementById('basicResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const decimals = getRoundingValue();
    const result = (x/100 * y).toFixed(decimals);
    
    // Display result
    document.getElementById('basicResult').innerHTML = `${x}% of ${y} is ${result}`;
    
    // Show calculation steps
    document.getElementById('basicSteps').innerHTML = `
        Step 1: Convert percentage to decimal (${x}% = ${x}/100 = ${(x/100).toFixed(decimals)})
        <br>
        Step 2: Multiply by the number (${(x/100).toFixed(decimals)} × ${y} = ${result})
    `;
    
    // Update chart
    createPieChart('basicChart', result, y, `${x}%`);
}

// Finding What Percentage Calculator
function calculateWhatPercentage() {
    const x = parseFloat(document.getElementById('findingX').value);
    const y = parseFloat(document.getElementById('findingY').value);
    
    if (!validateInputs(x, y)) {
        document.getElementById('findingResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const decimals = getRoundingValue();
    const result = (x/y * 100).toFixed(decimals);
    
    // Display result
    document.getElementById('findingResult').innerHTML = `${x} is ${result}% of ${y}`;
    
    // Show calculation steps
    document.getElementById('findingSteps').innerHTML = `
        Step 1: Divide ${x} by ${y} (${x}/${y} = ${(x/y).toFixed(decimals)})
        <br>
        Step 2: Multiply by 100 to get percentage (${(x/y).toFixed(decimals)} × 100 = ${result}%)
    `;
    
    // Update chart
    createPieChart('findingChart', x, y, `${result}%`);
}
// Percentage Change Calculator
function calculatePercentageChange() {
    const original = parseFloat(document.getElementById('changeX').value);
    const newValue = parseFloat(document.getElementById('changeY').value);
    
    if (!validateInputs(original, newValue)) {
        document.getElementById('changeResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const decimals = getRoundingValue();
    const change = ((newValue - original)/original * 100).toFixed(decimals);
    const type = change >= 0 ? "increase" : "decrease";
    
    // Display result
    document.getElementById('changeResult').innerHTML = 
        `The percentage ${type} is ${Math.abs(change)}%`;
    
    // Show calculation steps
    document.getElementById('changeSteps').innerHTML = `
        Step 1: Calculate change (${newValue} - ${original} = ${newValue - original})
        <br>
        Step 2: Divide by original value ((${newValue - original})/${original} = ${((newValue - original)/original).toFixed(decimals)})
        <br>
        Step 3: Multiply by 100 to get percentage (${((newValue - original)/original).toFixed(decimals)} × 100 = ${Math.abs(change)}%)
    `;
    
    // Update chart
    createPieChart('changeChart', Math.abs(change), 100, `${Math.abs(change)}% ${type}`);
}

// Reverse Percentage Calculator
function calculateReversePercentage() {
    const x = parseFloat(document.getElementById('reverseX').value);
    const y = parseFloat(document.getElementById('reverseY').value);
    
    if (!validateInputs(x, y)) {
        document.getElementById('reverseResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const decimals = getRoundingValue();
    const result = (x/(y/100)).toFixed(decimals);
    
    // Display result
    document.getElementById('reverseResult').innerHTML = 
        `The original number is ${result}`;
    
    // Show calculation steps
    document.getElementById('reverseSteps').innerHTML = `
        Step 1: Convenvert percentage to decimal (${y}% = ${y}/100 = ${(y/100).toFixed(decimals)})
        <br>
        Step 2: Divide ${x} by ${(y/100).toFixed(decimals)} to find original number (${x}/${(y/100).toFixed(decimals)} = ${result})
    `;
    
    // Update chart
    createPieChart('reverseChart', y, 100, `${y}%`);
}

// Discount Calculator
function calculateDiscount() {
    const x = parseFloat(document.getElementById('discountX').value);
    const y = parseFloat(do(document.getElementById('discountY').value);
    
    if (!validateInputs(x, y)) {
        document.getElementById('discountResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const decimals = getRoundingValue();
    const result = (y * x/100).toFixed(decimals);
    
    // Display result
    document.getElementById('discountResult').innerHTML = 
        `The discount amount is $${result}`;
    
    // Show calculation steps
    document.getElementById('discountSteps').innerHTML = `
        Step 1: Convert discount percentage to decimal (${x}% = ${x}/100 = ${(x/100).toFixed(decimals)})
        <br>
        Step 2: Multiply original price by discount rate ($${y} × ${(x/100).toFixed(decimals)} = $${result})
    `;
    
    // Update chart
    createPieChart('discountChart', result, y, `$${result} discount`);
}

// Final Price After Discount Calculator
function calculateFinalPrice() {
    const x = parseFloat(document.getElementById('finalDiscountX').value);
    const y = parseFloat(document.getElementById('finalDiscountY').value);
    
    if (!validateInputs(x, y)) {
        document.getElementById('finalDiscountResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const decimals = getRoundingValue();
    const result = (y * (1 - x/100)).toFixed(decimals);
    
    // Display result
    document.getElementById('finalDiscountResult').innerHTML = 
        `The final price is $${result}`;
    
    // Show calculation steps
    document.getElementById('finalDiscountSteps').innerHTML = `
        Step 1: Convert discount to decimal (${x}% = ${x}/100 = ${(x/100).toFixed(decimals)})
        <br>
        Step 2: Subtract from 1 to get remaining price percentage (1 - ${(x/100).toFixed(decimals)} = ${(1-x/100).toFixed(decimals)})
        <br>
        Step 3: Multiply by original price ($${y} × ${(1-x/100).toFixed(decimals)} = $${result})
    `;
    
    // Update chart
    createPieChart('finalDiscountChart', result, y, `Final Price: $${result}`);
}

// Increase Calculator
function calculateIncrease() {
    const x = parseFloat(document.getElementById('increaseX').value);
    const y = parseFloat(document.getElementById('increaseY').value);
    
    if (!validateInputs(x, y)) {
        document.getElementById('increaseResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const decimals = getRoundingValue();
    const result = (y * x/100).toFixed(decimals);
    
    // Display result
    document.getElementById('increaseResult').innerHTML = 
        `The increase amount is ${result}`;
    
    // Show calculation steps
    document.getElementById('increaseSteps').innerHTML = `
        Step 1: Convert increase percentage to decimal (${x}% = ${x}/100 = ${(x/100).toFixed(decimals)})
        <br>
        Step 2: Multiply original number by increase rate (${y} × ${(x/100).toFixed(decimals)} = ${result})
    `;
    
    // Update chart
    createPieChart('increaseChart', result, y + parseFloat(result), 'Increase Amount');
}

// Final Amount After Increase Calculator
function calculateFinalIncrease() {
    const x = parseFloat(document.getElementById('finalIncreaseX').value);
    const y = parseFloat(document.getElementById('finalIncreaseY').value);
    
    if (!validateInputs(x, y)) {
        document.getElementById('finalIncreaseResult').innerHTML = "Please enter valid numbers";
        return;
    }
    
    const decimals = getRoundingValue();
    const result = (y * (1 + x/100)).toFixed(decimals);
    
    // Display result
    document.getElementById('finalIncreaseResult').innerHTML = 
        `The final amount is ${result}`;
    
    // Show calculation steps
    document.getElementById('finalIncreaseSteps').innerHTML = `
        Step 1: Convert increase to decimal (${x}% = ${x}/100 = ${(x/100).toFixed(decimals)})
        <br>
        Step 2: Add to 1 to get total percentage (1 + ${(x/100).toFixed(decimals)} = ${(1+x/100).toFixed(decimals)})
        <br>
        Step 3: Multiply by original amount (${y} × ${(1+x/100).toFixed(decimals)} = ${result})
    `;
    
    // Update chart
    createPieChart('finalIncreaseChart', result, y, `Final Amount: ${result}`);
}

// Input validation
function validateInputs(x, y) {
    return !isNaN(x) && !isNaN(y) && x !== null && y !== null;
}

// Initialize charts
function initializeCharts() {
    // Create empty charts for all calculators
    createPieChart('basicChart', 0, 100, 'No data');
    createPieChart('findingChart', 0, 100, 'No data');
    createPieChart('changeChart', 0, 100, 'No data');
    createPieChart('reverseChart', 0, 100, 'No data');
    createPieChart('discountChart', 0, 100, 'No data');
    createPieChart('finalDiscountChart', 0, 100, 'No data');
    createPieChart('increaseChart', 0, 100, 'No data');
    createPieChart('finalIncreaseChart', 0, 100, 'No data');
}
