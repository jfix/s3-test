const { putObject, fileExists, setBucketLifeCycleConfiguration } = require('./s3-utils')

const fileName = 'test.pdf'
const file2 = '170240.jpeg'
;

(async () => {
    let data = await putObject(fileName)
    console.log(`File ${fileName} uploaded: ${data}.`)
    data = await fileExists(file2)
    console.log(`File ${file2} should exist: ${data}`)
    data = await fileExists(fileName)
    console.log(`File ${fileName} should exist: ${data}`)
})()
