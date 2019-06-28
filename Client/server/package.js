const path = require('path');
const file_system = require('fs');
const archiver = require('archiver');

const output = file_system.createWriteStream('sources.zip');
const archive = archiver('zip');
const publicPath = path.join('public');

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);
archive.directory(publicPath, false);
archive.finalize();