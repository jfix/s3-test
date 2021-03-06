require('dotenv').config()
const AWS = require('aws-sdk')
const fs = require('fs')
const md5 = require('md5')
const s3 = new AWS.S3()

const bucketName = process.env.BUCKET_NAME
const region = process.env.AWS_REGION

const hashFilename = (fileName) => {
    return `${md5(fileName.toLowerCase())}.pdf`
}

const getUrl = (fileName) => {
    // https://test-web-pdf.s3.eu-west-3.amazonaws.com/754dc77d28e62763c4916970d595a10f.pdf
    return `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${hashFilename(fileName)}`
}

const fileExists = async (fileName) => {
    let data
    try {
        const { ContentLength } = await getObjectHead(fileName)
        data = ContentLength > 0
    } catch (err) {
        data = !(err.statusCode === 404)
    } finally {
        return data
    }
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
        // console.log(err.statusCode)
        return err.statusCode
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
    console.log(`we are in putObject for ${fileName}.`)
    try {
        const params = {
            ACL: 'public-read',
            Bucket: bucketName, 
            Body: fs.createReadStream(fileName),
            Key: hashFilename(fileName),
            Metadata: {
                "originalFilename": fileName
               }
        }
        const data = await s3.putObject(params).promise()
        console.log(`we have uploaded ${hashFilename(fileName)}.`)
        return data
    } catch (err) {
        console.log(`Error in putObject: ${err}`)
    }
}

module.exports = { fileExists, getUrl, putObject, setBucketLifeCycleConfiguration }