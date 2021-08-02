// styles
import '@s/main.scss';
// scripts
import '@js/toggle';
import '@js/range';

// some issues between firefox and other browsers while displaying input[type="range"]
if (navigator.userAgent.match(/firefox/i)) {
    import('@s/firefox.scss');
}