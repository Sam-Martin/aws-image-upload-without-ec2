# AWS Image Upload Without EC2 Example  
 [![GitHub license](https://img.shields.io/github/license/Sam-Martin/servicenow-powershell.svg)](LICENSE) [![Build Status](https://travis-ci.org/X0nic/chef-snapraid.svg)](https://travis-ci.org/sam-martin/aws-image-upload-without-ec2)  
This repository contains the Node.js, HTML, JavaScript, and supporting jQuery plugins to upload images securely to S3 using [Amazon API Gateway](https://aws.amazon.com/api-gateway/) and [AWS Lambda](https://aws.amazon.com/lambda/) to generate a [signed upload url](http://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html).

## Overview
This example project is simply an exercise for me (Sam Martin) to dabble in:
1) AWS Lambda
2) Amazon API Gateway
3) Basic CSS, JS, and HTML linting with [Travis CI](https://travis-ci.org/)  

The execution workflow is extremely simple. From loading the page in the browser:
1) User selects a file to upload
2) JavaScript calls out to the API Gateway endpoint using jQuery's `$.post` to retrieve a signed upload URL
3) API Gateway calls the Lambda Node.js script
4) Node.js script assumes the IAM role associated with it which has permission to upload an object to the s3 bucket
5) Node.js uses the inbuilt AWS SDK to `getSignedUrl` and returns it in its `context.done`
6) This url is returned to the client-side JS via API Gateway and is then used to upload a file using [BlueImp's jQuery File Upload](https://github.com/blueimp/jQuery-File-Upload)

## Plugins & Frameworks
* [BlueImp's jQuery File Upload](https://github.com/blueimp/jQuery-File-Upload) for uploading
* [Twitter BootStrap](http://getbootstrap.com/) for styling
* [AWS SDK](https://aws.amazon.com/sdk-for-node-js/) (built into Node.js)
* [JSHint](https://www.npmjs.com/package/jshint) for JavScript linting
* [PrettyCSS](https://www.npmjs.com/package/PrettyCSS) for CSS linting

## Continuous Integration
The continuous integration portion of this dabbling is currently limited to JS and CSS linting using `JSHint` and `PrettyCSS` respectively.

## Usage
ToDo

## Permissions
### Node.js role
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1440938489000",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::image-upload-smartin"
            ]
        }
    ]
}
```
### S3 Bucket  CORS Configuration
```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>HEAD</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>

```
### S3 Bucket Policy
```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "PublicReadGetObject",
			"Effect": "Allow",
			"Principal": "*",
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::image-upload-smartin/*"
		}
	]
}
```
## Author
Author:: Sam Martin (<samjackmartin@gmail.com>)
