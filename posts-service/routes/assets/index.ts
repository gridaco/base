import * as express from "express";
import multer from "multer";
import * as AWS from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import assert from "assert";

const POSTS_CMS_BUKET = "cms-posts";
const client = new AWS.S3({});

export async function upload(
  path: string,
  file: { body: string | Buffer; mimetype?: string; encoding?: string },
  key: string
) {
  const command = new PutObjectCommand({
    Bucket: POSTS_CMS_BUKET,
    Key: path + "/" + key,
    Body: file.body,
    ContentEncoding: file.encoding,
    ContentType: file.mimetype,
    ACL: "public-read",
  });
  return await client.send(command);
}

/**
 * use this for exporting the post as html file for faster access and downloading.
 * @returns
 */
export async function uploadDocument({
  path,
  id,
  document,
}: {
  path: string;
  id: string;
  document: string;
}) {
  return await upload(path, { body: document, mimetype: "text/html" }, id);
}

const m = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post("/upload", m.array("files", 25), (req, res) => {
  // TODO:
});

// request the asset uploader client
router.get("/client", async (req, res) => {
  const { post } = req.query; // post id to link the asset to.
  const { post: _post, mimetype, key, encoding } = req.body;

  const postid = post ?? _post;
  assert(postid, '"post" is required');

  const path = "CHANGEME!!!!!"; // TODO:
  const abskey = path + "/" + key;
  // Create a command to put the object in the S3 bucket.
  const command = new PutObjectCommand({
    Bucket: POSTS_CMS_BUKET,
    Key: abskey,
    Body: "BODY",
    ContentEncoding: encoding,
    ContentType: mimetype,
    ACL: "public-read", // TODO: follow the post visibility -> but for to be visible on editor, it needs to be public...hmm
  });

  // Create the presigned URL.
  const expiresIn = 3600;
  const signedUrl = await getSignedUrl(client, command, {
    expiresIn: 3600,
  });

  res.json({
    url: signedUrl,
    expires_in: expiresIn,
    expires_at: new Date(Date.now() + expiresIn * 1000),
  });
});

export default router;
