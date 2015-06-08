/*global require, module */

var _s = require('underscore.string');
var _  = require('underscore');

var ArgumentValidator = function() {
};

// for now hardcoded to s3 requirements, but an easy hook
// to add support for other protocols, like ftp, rest service (with auth/oauth/etc)
// TODO: make this a running list of errors rather than stop on first
ArgumentValidator.prototype.validate = function(args, cb) {
    var protocol = args.protocol;
    if(!protocol) {
        return cb('the --protocol parameter is required');
    }
    if(!args.file) {
        return cb('the --file parameter is required');
    }
    // s3 specific stuffs
    if(protocol !== 's3') {
        return cb(_s.sprintf('protocol %s is not supported', protocol));
    }
    var required = ['key', 'secret', 'region', 'bucket'];
    var missing  = [];
    _.each(required, function(param) {
        if(!args[param]) {
            missing.push(param);
        }
    });
    if(missing.length>0) {
        return cb(_s.sprintf('the following parameters are required : %s', missing.join()));
    }
    cb(); // all clean
};

module.exports = ArgumentValidator;