const { putObject, fileExists, getUrl, setBucketLifeCycleConfiguration } = require('./s3-utils')

const fileName = 'test.pdf'
const file2 = '170240.jpeg'
;
test('fileExists returns false for non-existent file', async () => {
    expect.assertions(1);
    await expect(fileExists('blahdiblah')).resolves.toBeFalsy();
})

// (async () => {
//     let data = await putObject(fileName)
//     console.log(`File ${fileName} uploaded: ${JSON.stringify(data)}.`)
//     data = await fileExists(file2)
//     console.log(`File ${file2} should exist: ${data}`)
//     data = await fileExists(fileName)
//     console.log(`File ${fileName} should exist: ${data}`)
//     data = await getUrl(fileName)
//     console.log(`URL for ${fileName} is ${data}.`)
// })()
