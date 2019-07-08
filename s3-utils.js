require('dotenv').config()
const AWS = require('aws-sdk')
const md5 = require('md5')
const s3 = new AWS.S3()

const bucketName = process.env.BUCKET_NAME

const hashFilename = (fileName) => {
    return `${md5(fileName.toLowerCase())}.pdf`
}

const getObjectHead = async (fileName) => {
    try {
        const params = {
            Bucket: bucketName, 
            Key: hashFilename(fileName)
        }
        const data = await s3.headObject(params).promise()
        return data
    } catch (err) {
        console.log(err, err.stack)
    }
}

const setBucketLifeCycleConfiguration = async () => {
    try {
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
        
        const data = await s3.putBucketLifecycleConfiguration(bucketConfiguration).promise()
        return data
    } catch (err) {
        console.log(err, err.stack)
    }
}

const putObject = async (fileName) => {
    try {
        const params = {
            Bucket: bucketName, 
            Body: fs.createReadStream(fileName),
            Key: hashFilename(fileName)
        }
        const data = await s3.putObject(params).promise()
        return data
    } catch (err) {
        console.log(err.statusCode)
    }
}

module.exports.putObject = putObject
module.exports.getObjectHead = getObjectHead
module.exports.setBucketLifeCycleConfiguration = setBucketLifeCycleConfiguration
