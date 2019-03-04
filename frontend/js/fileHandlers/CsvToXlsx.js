/* eslint class-methods-use-this: ["error", { "exceptMethods": ["download"] }] */

// Imports
import XLSX from 'xlsx';
import FileHandler from './FileHandler';

/** Class representing a CsvToXlsx FileHandler.
 * @extends FileHandler
 */
class CsvToXlsx extends FileHandler {
    /**
     * Convert file from CSV to XLSX.
     */
    convert() {
        const reader = new FileReader();

        reader.onload = (e) => {
            const target = e.target || e.srcElement;
            const data = target.result;

            const dataArray = [];
            const dataRows = data.split('\n');

            dataRows.forEach((dataRow) => {
                const dataRowArray = [];
                const row = dataRow.split(',');
                row.forEach((value) => {
                    dataRowArray.push(value);
                });
                dataArray.push(dataRowArray);
            });

            this.workBook = XLSX.utils.book_new();
            const workSheet = XLSX.utils.aoa_to_sheet(dataArray);
            XLSX.utils.book_append_sheet(this.workBook, workSheet, 'Sheet1');

            this.createEntry();
        };

        reader.onerror = () => {
            // TODO: Catch Error
        };

        reader.readAsBinaryString(this.file);
    }

    /**
     * Download XLSX File.
     * @param {CsvToXlsx} scope - Scope of this handler.
     */
    download(scope) {
        XLSX.writeFile(scope.workBook, `${scope.name}.xlsx`);
    }
}

export default CsvToXlsx;
