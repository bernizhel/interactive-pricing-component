const progressBar = document.querySelector('.pricing__range--progress-bar');
const range = document.querySelector('#pricing-range');

document.addEventListener('DOMContentLoaded', styleBar);
range.addEventListener('mousedown', styleThumb);
range.addEventListener('input', styleBar);
range.addEventListener('mouseup', unstyleThumb);

function styleBar() {
    progressBar.style.width = Math.round((range.valueAsNumber - +range.min) /
        (+range.max - +range.min) * 100) + '%';
}

function styleThumb() {
    range.classList.add('grabbed');
}

function unstyleThumb() {
    range.classList.remove('grabbed');
}