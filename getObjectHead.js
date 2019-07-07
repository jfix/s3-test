const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const bucketName = 'test-web-pdf'
const fileName = '170240.jpeg'
const nonExistingFileName = 'blah.blah'

var params = {
    Bucket: bucketName, 
    Key: fileName
}
s3.headObject(params).promise()
    .then((data) => console.log(data))
    .catch((err) => console.log(err.statusCode))
