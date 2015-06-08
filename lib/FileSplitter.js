/*global require, module */

var fs = require('fs');
var _s = require('underscore.string');

var FileSplitter = function() {
};

function fileName(file, index) {
    return _s.insert(file, file.lastIndexOf("."), "-" + index);
}

FileSplitter.prototype.split = function(file, limit, cb) {

    // early exit if the file is already small enough
    fs.stat(file, function(err, stats) {
        if(err) {
            return cb(err);
        }
        var fileSizeInBytes = stats.size;
        if(fileSizeInBytes <= limit) {
            return cb(null, [file]);
        }

        // otherwise generate subfiles
        var readStream  = fs.createReadStream(file);
        var dataLength  = 0;
        var fileIndex   = 0;
        var files       = [];
        var writeStream;

        // write to multiple files as we read from one
        files.push(fileName(file,fileIndex++));
        writeStream = fs.createWriteStream(files.slice(-1)[0]);
        readStream
            .on('data', function (chunk) {
                dataLength += chunk.length;
                if(dataLength>=limit) {
                    writeStream.end();
                    files.push(fileName(file,fileIndex++));
                    writeStream = fs.createWriteStream(files.slice(-1)[0]);
                    dataLength = chunk.length;
                }
                writeStream.write(chunk);
            })
            // clean up on done
            .on('end', function () {
                writeStream.end();
                return cb(null, files);
            });
    });
};

module.exports = FileSplitter;