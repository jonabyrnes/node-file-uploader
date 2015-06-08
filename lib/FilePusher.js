/*global require, module */

var AWS         = require('aws-sdk');
var dateFormat  = require('dateformat');
var fs          = require('fs');
var _s          = require('underscore.string');
var _           = require('underscore');

var ArgumentValidator = require('./ArgumentValidator');
var FileSplitter = require('./FileSplitter');

function FilePusher() {
    this.validator = new ArgumentValidator();
    this.splitter = new FileSplitter();
    this.s3 = new AWS.S3();
}

FilePusher.prototype.push = function(options, cb) {

    // validate the options
    var self = this;
    self.validator.validate(options, function(err) {
        if(err) {
            return cb(err);
        }

        // split the file if necessary
        var file = options.file;
        //var limit = options['limit'] || 1000000000; // default to approx 1GB
        var limit = options.limit || 1000000; // default to approx 1GB

        self.splitter.split(file, limit, function(err, files) {
            if(err) {
                return cb(err);
            }

            // set up the aws configuration
            AWS.config.update({
                accessKeyId: options.key,
                secretAccessKey: options.secret,
                region : options.region
            });

            // date specific folder / bucket
            var bucket = _s.sprintf('%s/%s', options.bucket, dateFormat(new Date(), "yyyymmdd"));

            // send each one async to the s3 apis
            var errs = [];
            _.each(files, function(file) {
                var readStream = fs.createReadStream(file);
                var key = file.split('/').slice(-1)[0];
                var params = {Bucket: bucket, Key: key, Body: readStream};
                self.s3.upload(params, function(err) {
                    if (err) {
                        errs.push(err);
                    }
                });
            });
            if(errs.length>0) {
                cb(errs);
            }
            cb();
        });
    });
};

module.exports = FilePusher;

