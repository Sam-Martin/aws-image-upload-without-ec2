var aws = require('aws-sdk');
var s3 = new aws.S3({apiVersion: '2006-03-01'});
console.log('Loading event');
            
exports.handler = function(event, context) {
    
    keyname = Date.now()
    var params = {
    	Bucket: 'image-upload-smartin', 
    	Key: keyname,
    	ACL:'public-read',
    	Body: '',
        ContentType: event.contentType,
    	Expires: 60
    };
    
    s3.getSignedUrl('putObject', params, function (err, url) {
    	console.log('The URL is', url);
    	context.done(null, {"url":url}); // SUCCESS with message
    })
}