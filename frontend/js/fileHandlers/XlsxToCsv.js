/* eslint class-methods-use-this: ["error", { "exceptMethods": ["download"] }] */

// Imports
import XLSX from 'xlsx';
import FileHandler from './FileHandler';

/** Class representing a CsvToXlsx FileHandler.
 * @extends FileHandler
*/
class XlsxToCsv extends FileHandler {
    /**
     * Convert file from XLSX to CSV.
     */
    convert() {
        const reader = new FileReader();

        reader.onload = (e) => {
            const target = e.target || e.srcElement;
            const data = target.result;

            const workbook = XLSX.read(data, {
                type: 'binary'
            });

            workbook.SheetNames.forEach((sheetName) => {
                const csvContent = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
                this.downloadableContent = csvContent;
                this.createEntry('csv');
            });
        };

        reader.onerror = () => {
            // TODO: Catch Error
        };

        reader.readAsBinaryString(this.file);
    }

    /**
     * Download CSV File.
     * @param {XlsxToCsv} scope - Scope of this handler.
     * @param {Event} event - Event triggered by download link.
     */
    download(scope, event) {
        const link = event.target || event.srcElement;

        link.setAttribute('href',
            `data:application/octet-stream;charset=utf-8,${encodeURIComponent(scope.downloadableContent)}`);
    }
}

export default XlsxToCsv;
