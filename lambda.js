const AWS = require("aws-sdk");
const S3 = new AWS.S3();

exports.handler = async (event) => {
    const record = JSON.parse(event.body);
    const params = {
        Bucket: "",
        Key: `mongo-records/${Date.now()}.json`,
        Body: JSON.stringify(record),
    };
    await S3.putObject(params).promise();
    return { statusCode: 200, body: "Record stored." };
};