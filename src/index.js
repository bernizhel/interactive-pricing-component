import '@s/main.scss';
import '@js/range';
import '@js/toggle';

// some issues between firefox and other browsers while displaying input[type="range"]
if (navigator.userAgent.match(/firefox/i)) {
    import('@s/ff-range.scss');
}