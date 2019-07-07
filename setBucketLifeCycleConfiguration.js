const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const bucketName = 'test-web-pdf'

const bucketConfiguration = {
    Bucket: bucketName, 
    LifecycleConfiguration: {
        Rules: [
            {
                Expiration: {
                    Days: 1
                },
                Filter: {
                    Prefix: ""
                }, 
                ID: "ExpirePdfsAfterOneDay", 
                Status: "Enabled"
            }
        ]
    }
}

s3.putBucketLifecycleConfiguration(bucketConfiguration).promise()
    .then((data) => console.log(data))
    .catch((err) => console.log(err, err.stack))
