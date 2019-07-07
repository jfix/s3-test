const AWS = require('aws-sdk')
const fs = require('fs')
const s3 = new AWS.S3()
const bucketName = 'test-web-pdf'
const fileName = 'package.json'

var params = {
    Bucket: bucketName, 
    Body: fs.createReadStream(fileName),
    Key: fileName
}
s3.putObject(params).promise()
    .then((data) => console.log(data))
    .catch((err) => console.log(err.statusCode))
