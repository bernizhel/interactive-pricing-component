const toggleButton = document.querySelector('.billing__toggle');
// discount percent divided by 100
const DISCOUNT = 0.25;

document.interactivePricingComponentVariables = {
    // if browser saves user's inputs after reload check whether the button is active
    _isToggled: toggleButton.checked,
    get isToggled() {
        return this._isToggled ?? 0;
    },
    set isToggled(value) {
        if (value === toggleButton.checked) {
            this._isToggled = value;
        }
    },
    _discountAmount: DISCOUNT,
    get discountAmount() {
        return this._discountAmount ?? 0;
    },
};

toggleButton.addEventListener('input', applyDiscount);

// to update the slider, I manually trigger an input event on range
const range = document.querySelector('#pricing-range');
let inputEvent = new Event('input', {
    bubbles: true,
    cancelable: true,
});

function applyDiscount() {
    document.interactivePricingComponentVariables.isToggled = toggleButton.checked;
    range.dispatchEvent(inputEvent);
}
