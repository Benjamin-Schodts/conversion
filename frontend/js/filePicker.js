// Imports
import getAncestor from './utils/getAncestor';
import preventDefaults from './utils/preventDefaults';
import querySelectorAll from './utils/querySelectorAll';

import CsvToXlsx from './fileHandlers/CsvToXlsx';
import XlsxToCsv from './fileHandlers/XlsxToCsv';

export default {
    init
};

const CLASSES = {
    PICKER: 'file-picker',
    LABEL: 'file-picker__label',
    INPUT: 'file-picker__input',
    FILES: 'file-picker__files',
    DRAG: {
        DROP: 'file-picker__label--drop',
        DRAGGING: 'file-picker__label--dragging'
    }
};
const preventDefaultTriggers = ['dragenter', 'dragover', 'dragleave', 'drop'];

let filePickers;

/**
 * Initialise all file input types.
 */
function init() {
    if (checkCompatibility()) {
        // TODO set compatibility mode
        filePickers = querySelectorAll(`.${CLASSES.PICKER}`);

        addEventListeners();
    }
}

/**
 * Add Event Listeners to required FilePicker events.
 */
function addEventListeners() {
    filePickers.forEach((picker) => {
        const filePickerNative = picker.querySelector(`.${CLASSES.INPUT}`);
        const filePicker = picker.querySelector(`.${CLASSES.LABEL}`);

        preventDefaultTriggers.forEach((trigger) => {
            filePicker.addEventListener(trigger, preventDefaults, false);
        });

        filePickerNative.addEventListener('change', filePickerFileHandler, false);

        filePicker.addEventListener('drop', filePickerDropHandler, false);
        filePicker.addEventListener('dragenter', filePickerDragOverAnimationStartHandler, false);
        filePicker.addEventListener('dragleave', filePickerDragOverAnimationStopHandler, false);
    });
}

/**
 * Handler for dropping files into drop area.
 * @param {Event} - drop event triggering the handler.
 */
function filePickerDropHandler(event) {
    filePickerDropAnimationHandler(event);
    filePickerFileHandler(event);
    filePickerDragOverAnimationStopHandler(event);
}

/**
 * Handler for starting and stopping the drop animation.
 * @param {Event} event - drop event triggering the handler.
 */
function filePickerDropAnimationHandler(event) {
    const target = event.target || event.srcElement;

    target.classList.add(CLASSES.DRAG.DROP);

    setTimeout(() => {
        target.classList.remove(CLASSES.DRAG.DROP);
    }, 500);
}

/**
 * Handler for starting the dropenter animation.
 * @param {Event} event - dragenter event triggering the handler.
 */
function filePickerDragOverAnimationStartHandler(event) {
    const target = event.target || event.srcElement;

    target.classList.add(CLASSES.DRAG.DRAGGING);
}

/**
 * Handler for stopping the dropend animation.
 * @param {Event} event - dragend event triggering the handler.
 */
function filePickerDragOverAnimationStopHandler(event) {
    const target = event.target || event.srcElement;

    target.classList.remove(CLASSES.DRAG.DRAGGING);
}

/**
 * File processing handler
 * @param {Event} event - Event holding the datatransfer files.
 */
function filePickerFileHandler(event) {
    const target = event.target || event.srcElement;
    const parentFilePicker = getAncestor(target, CLASSES.PICKER);

    const files = parentFilePicker.querySelector(`.${CLASSES.FILES}`);
    const input = parentFilePicker.querySelector(`.${CLASSES.INPUT}`);

    const droppedFiles = event.target.files || event.dataTransfer.files;
    const filesReceived = Array.prototype.slice.call(droppedFiles);

    filesReceived.forEach((file) => {
        if (isCorrectType(file.name, input.getAttribute('accept'))) {
            const {from, to} = parentFilePicker.dataset;

            let fileHandler;

            switch (true) {
                case from === 'xlsx' && to === 'csv':
                    fileHandler = new XlsxToCsv(files, file);
                    break;
                case from === 'csv' && to === 'xlsx':
                    fileHandler = new CsvToXlsx(files, file);
                    break;
            }

            fileHandler.convert();
        }
    });
}

/**
 * Check if dropped files are allowed according to the accept value of the native input field.
 * @param {String} filename - File name String.
 * @param {String} accepted - Value of native input field accept attribute.
 * @return {boolean}
 */
function isCorrectType(filename, accepted) {
    const splitFilename = filename.split('.');
    const fileType = splitFilename[splitFilename.length - 1];

    return accepted.indexOf(fileType) > -1;
}

/**
 * Check if browser compatibility of drag & drop and file reading is present.
 * @return {boolean}
 */
function checkCompatibility() {
    const div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div))
        && 'FormData' in window && 'FileReader' in window;
}
