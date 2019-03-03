/**
 * Shorthand function for selecting all elements of a given identifier as an Array.
 * @param {String} selector - Identifier to look for.
 * @param {HTMLElement} root - The element in which the selector should be found.
 * @return {Array} Collection of Elements with given identifier.
 */
export default function querySelectorAll(selector = '*', root = document) {
    return Array.prototype.slice.call(root.querySelectorAll(selector));
}
