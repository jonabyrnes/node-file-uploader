var argv = require('minimist')(process.argv.slice(2));
var FilePusher = require('./lib/FilePusher');

var pusher = new FilePusher();
pusher.push(argv, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('push complete')
    }
})

