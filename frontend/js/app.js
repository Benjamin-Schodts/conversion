// Imports
import filePicker from './filePicker';
import '../scss/style.scss';

/**
 * Initialise all file input types.
 */
function init() {
    filePicker.init();
}

// This script is loaded dynamically, so it could be that DOMContentLoaded was already fired
if (document.readyState === 'interactive') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        init();
    });
}
