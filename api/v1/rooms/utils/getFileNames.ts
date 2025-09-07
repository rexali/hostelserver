
export function getFilesNames(files: any) {
    let results: string[] = [];
    files.forEach((file: any) => {
            results.push(file.filename)
    });

    return results;
}