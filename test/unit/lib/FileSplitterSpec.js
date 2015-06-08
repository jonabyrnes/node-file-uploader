/*global require */

var expect  = require('expect.js');

var requireHelper = require('../../require_helper');
var FileSplitter = requireHelper('lib/FileSplitter');
var splitter = new FileSplitter();

describe('FileSplitter', function () {

    it('should split a file if it\'s larger thatn the limit', function (done) {
        // 5MB/1MB
        splitter.split('./files/FL_insurance_sample.csv', 1000000, function(err, files) {
            expect(files.length).to.be(5);
            done();
        });
    });

    it('should leave a file alone if it\'s under the limit', function (done) {
        // 5MB/1MB
        splitter.split('./files/small-file.csv', 1000000, function(err, files) {
            expect(files.length).to.be(1);
            done();
        });
    });

    it('should return an err for a file that does not exist', function (done) {
        // 5MB/1MB
        splitter.split('./files/FL_insurance_sample-not.csv', 1000000, function(err) {
            expect(err).to.be.ok();
            done();
        });
    });

});

