const CLASSES = {
    FILES: 'file-picker__files'
};

/** Class representing a FileHandler. */
class FileHandler {
    /**
     * Create a File Handler
     * @param {HTMLElement} container - The FilePicker Element.
     * @param {File} file - The File to be handled.
     */
    constructor(container, file) {
        this.container = container;
        this.file = file;
        this.name = file.name.split('.')[file.name.split('.').length - file.name.split('.').length];
        this.ext = file.name.split('.')[file.name.split('.').length - 1];
    }

    /**
     * Get the size of the file formatted in bytes/KB/MB as a String
     * @return {String} The formatted String.
     */
    sizeString() {
        let formatted = `${this.file.size} bytes`;

        if (this.file.size >= 1024) {
            formatted = `${(this.file.size / 1024).toFixed(2)} KB`;
        } else if (this.file.size >= 1048576) {
            formatted = `${(this.file.size / 1048576).toFixed(2)} MB`;
        }
        return formatted;
    }

    /**
     * Create and HTMLElement entry to enable downloading the converted file
     * and add the HTMLElement to the DOM.
     * @param {String} fileType - The file type / extension of the resulting file.
     */
    createEntry() {
        const container = document.createElement('div');
        container.classList = 'file-picker__files__entry box';

        const filename = document.createElement('span');
        filename.className = 'file-picker__files__entry__name';
        const filenameTextNode = document.createTextNode(this.file.name);
        filename.appendChild(filenameTextNode);

        const filesize = document.createElement('span');
        filesize.className = 'file-picker__files__entry__size';
        const filesizeTextNode = document.createTextNode(this.sizeString());
        filesize.appendChild(filesizeTextNode);

        container.appendChild(filename);
        container.appendChild(filesize);

        const link = document.createElement('a');
        link.setAttribute('download', `${this.name}.${this.container.dataset.to}`);
        link.innerHTML = `Download ${this.container.dataset.to}`;
        link.className = 'file-picker__files__entry__link';
        link.addEventListener('click', this.download.bind(link, this));

        container.appendChild(link);

        const filesContainer = this.container.querySelector(`.${CLASSES.FILES}`);
        filesContainer.appendChild(container);
    }
}

export default FileHandler;
