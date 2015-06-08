/*global require */

var expect  = require('expect.js');

var requireHelper = require('../../require_helper');
var FilePusher = requireHelper('lib/FilePusher');

describe('FilePusher', function () {

    it('should be able to upload a file with all parameters', function (done) {
        var params = {file:'./files/small-file.csv', protocol:'s3', key:'mykey',
            secret:'mysecret', bucket:'mybucket', region:'myregion'};
        var pusher = new FilePusher();
        pusher.s3 = {
            upload: function(params, cb) {
                cb(); // force the upload to succeed
            }
        };
        pusher.push(params, function(err) {
            expect(err).not.to.be.ok();
            done();
        });
    });

    it('should error out if there is an error on file upload', function (done) {
        var params = {file:'./files/small-file.csv', protocol:'s3', key:'mykey',
            secret:'mysecret', bucket:'mybucket', region:'myregion'};
        var pusher = new FilePusher();
        pusher.s3 = {
            upload: function(params, cb) {
                cb('test expected error file upload'); // force the upload to succeed
            }
        };
        pusher.push(params, function(err) {
            expect(err).to.be.ok();
            done();
        });
    });

    it('should error out if parameter validation fails', function (done) {
        new FilePusher().push({}, function(err) {
            expect(err).to.be.ok();
            done();
        });
    });

    it('should error out if there is an error while splitting up the file', function (done) {
        var params = {file:'./files/small-file-not.csv', protocol:'s3', key:'mykey',
            secret:'mysecret', bucket:'mybucket', region:'myregion'};
        new FilePusher().push(params, function(err) {
            expect(err).to.be.ok();
            done();
        });
    });

});

