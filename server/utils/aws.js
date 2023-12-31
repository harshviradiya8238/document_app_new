const fs = require("fs");
const AWS = require("aws-sdk");
const _ = require("lodash");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: process.env.AWS_S3_REGION,
});

const awsService = {
  uploadFile: (data) => {
    const { originalname, buffer } = data;
    let key = originalname;
    return new Promise(async (resolve, reject) => {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: buffer,
        ACL: "public-read-write",
      };
      s3.upload(params, async (err, res) => {
        if (err) reject(err);
        resolve({ url: process.env.AWS_S3_URl + key, key });
      });
    });
  },
  deleteFile: (key) => {
    s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    });
  },
  getPreSignedURL: async (fileKey) => {
    const getParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileKey,
      Expires: 60 * 5,
    };
    return { url: await s3.getSignedUrlPromise("getObject", getParams) };
  },
};

module.exports = awsService;
