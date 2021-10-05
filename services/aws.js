const AWS = require('aws-sdk');
const BUCKET = 'recipebook-private';
const KEY = 'cleardb-ca.pem';

const config = {
    region: 'us-east-2',
    accessKeyId: process.env.AKI,
    secretAccessKey: process.env.SAK
}

// Config
AWS.config.update(config);

// Create s3 object
let s3 = new AWS.S3;

async function loadCA() {
    return await s3.getObject({Bucket: BUCKET, Key: KEY}).promise();
}

module.exports = {
    loadCA
}