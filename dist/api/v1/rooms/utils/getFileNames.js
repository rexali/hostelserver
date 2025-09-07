"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesNames = getFilesNames;
function getFilesNames(files) {
    let results = [];
    files.forEach((file) => {
        results.push(file.filename);
    });
    return results;
}
