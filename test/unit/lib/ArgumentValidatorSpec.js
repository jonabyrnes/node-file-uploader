/*global require */

var expect  = require('expect.js');

var requireHelper = require('../../require_helper');
var ArgumentValidator = requireHelper('lib/ArgumentValidator');
var validator = new ArgumentValidator();

describe('ArgumentValidator', function () {

    it('should reject requests without any parameters', function (done) {
        validator.validate({}, function(err) {
            expect(err).to.be.ok();
            done();
        });
    });

    it('should reject requests without a file parameter', function (done) {
        validator.validate({protocol:'s3'}, function(err) {
            expect(err).to.be.ok();
            done();
        });
    });

    it('should reject requests without where the protocol is not s3', function (done) {
        validator.validate({file:'myfile', protocol:'s2'}, function(err) {
            expect(err).to.be.ok();
            done();
        });
    });

    it('should reject requests that don\'t have all required parameters for s3', function (done) {
        validator.validate({file:'myfile', protocol:'s3'}, function(err) {
            expect(err).to.be.ok();
            done();
        });
    });

    it('should pass if all required parameters are supplied', function (done) {
        var params = {file:'myfile', protocol:'s3', key:'mykey',
            secret:'mysecret', bucket:'mybucket', region:'myregion'};
        validator.validate(params, function(err) {
            expect(err).not.to.be.ok();
            done();
        });
    });

});

