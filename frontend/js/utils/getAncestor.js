/**
 * Get a parent (ancestor) element with a given class of a given element.
 * @param {HTMLElement} selectedElement - The child element.
 * @param {String} ancestorClass - The class of the parent/ancestor.
 * @return {HTMLElement} The parent / ancestor.
 */
export default function getAncestor(selectedElement, ancestorClass = 'body') {
    let element = selectedElement.parentNode;

    while (!hasClass(element, ancestorClass)) {
        element = element.parentNode;
    }

    return element;
}

/**
 * Check if a given element contains a given class.
 * @param {HTMLElement} element - The element to check.
 * @param {String} className - The classname to check.
 * @return {boolean}
 */
function hasClass(element, className) {
    return (element.className).indexOf(className) > -1;
}
