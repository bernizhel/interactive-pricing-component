const range = document.querySelector('#pricing-range');

// to adjust the range bar on load
document.addEventListener('DOMContentLoaded', styleBar);
range.addEventListener('mousedown', styleThumb);
range.addEventListener('input', styleBar);
range.addEventListener('mouseup', unstyleThumb);

const progressBar = document.querySelector('.pricing__range--progress-bar');
const pageviewsText = document.querySelector('.pricing__pageviews');
const priceText = document.querySelector('.pricing__price--bigger');
const pageviewsArray = [
    '10K',
    '50K',
    '100K',
    '500K',
    '1M',
];
const pricesArray = [
    '$8.00',
    '$12.0',
    '16',
    '24.00',
    '$36',
];

function styleBar() {
    const percentWidth = ~~((range.valueAsNumber - +range.min) /
        (+range.max - +range.min) * 100);
    if (percentWidth > 1) {
        progressBar.style.width = percentWidth + '%';
    } else {
        // to fix a small bug, where too tiny progress bar doesn't get appropriate border-radius
        progressBar.style.width = '5%';
    }
    // because (percentWidth / (100 / pageviewsArray.length)) can return 5 (number greater than
    // pageviewsArray.length), I had to decrease the number slightly
    let index = ~~((percentWidth - 1) / (100 / pageviewsArray.length));
    pageviewsText.innerText = `${pageviewsArray[index]} pageviews`;
    priceText.innerText = getPrice(pricesArray[index]);
}

function styleThumb() {
    range.classList.add('grabbed');
}

function unstyleThumb() {
    range.classList.remove('grabbed');
}

function getPrice(price) {
    // this code lets the pricesArray to have different formats of prices
    let priceMatch = +price.match(/\d+\.?\d*/)[0];
    if (priceMatch) {
        // if the yearly billing is checked, use discount, otherwise
        // just make the price float with 2 zeros after the decimal point
        price = '$' + (priceMatch *
            // interactivePricingComponentVariables is set only by toggle.js
            (document.interactivePricingComponentVariables.isToggled
                ? (1 - document.interactivePricingComponentVariables.discountAmount)
                : 1))
            .toFixed(2).toString();
    }
    return price;
}