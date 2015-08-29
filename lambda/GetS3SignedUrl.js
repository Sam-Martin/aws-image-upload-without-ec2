var aws = require('aws-sdk');
var s3 = new aws.S3({apiVersion: '2006-03-01'});
var urlPrefix = 'https://s3-eu-west-1.amazonaws.com/image-upload-smartin/'
var key = (new Date()).toISOString().substr(0,10) +'/' + String( Date.now())
console.log('Loading event');
            
exports.handler = function(event, context) {
    
    if(!event.hasOwnProperty("contentType")){
        context.fail("no content type specified")
    }else if(!event.contentType.match(/(\.|\/)(gif|jpe?g|png)$/i)){
        context.fail("invalid content type, gif, jpg, and png supported");
    }
    
    console.log("Event Type: "+event.contentType)
    var params = {
        Bucket: 'image-upload-smartin', 
        Key: key,
        ACL:'public-read',
        Body: '',
        ContentType: event.contentType,
        Expires: 60
    };
    
    s3.getSignedUrl('putObject', params, function (err, url) {
        console.log('The URL is', url);
          context.done(null, {"oneTimeUploadUrl":url, "resultUrl":urlPrefix+key}); // SUCCESS with message
    })
}