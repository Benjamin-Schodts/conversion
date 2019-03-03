/**
 * Prevent default behaviour of triggering event and its propagation.
 * @param {Event} event - The event triggering the function call.
 */
export default function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
}
