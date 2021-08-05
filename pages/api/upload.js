import fs from "fs"; // Filesystem
import { promisify } from "util"; // Promisify fs
import formidable from "formidable"; // Formidable form handling
import fleekStorage from "@fleekhq/fleek-storage-js"; // Fleek storage

// Fleek authentication
const fleekAuth = {
  apiKey: process.env.FLEEK_API_KEY,
  apiSecret: process.env.FLEEK_API_SECRET,
};

// Async readFile operation
const readFileAsync = promisify(fs.readFile);

export default async (req, res) => {
  // Setup incoming form data
  const form = new formidable.IncomingForm({ keepExtensions: true });

  // Collect data from form
  const data = await new Promise((res, rej) => {
    // Parse form data
    form.parse(req, (err, fields, files) => {
      // if error, reject promise
      if (err) return rej(err);
      // Else, return fields and files
      res({ fields, files });
    });
  });


  const { name, metadata } = data.fields;
  const { upload: file } = data.files;
  const fileData = await readFileAsync(file.path);


if(fileData && name && metadata)
  {
    const date = new Date();
    const timestamp = date.getTime();
    const { hash: fileIPFSUrl } = await fleekStorage.upload({
      ...fleekAuth,
      key: `${timestamp}`,
      data: fileData,
    });

    const fileUrl = `https://ipfs.infura.io/ipfs/${fileIPFSUrl}`;
    const imageUrl = `ipfs://${fileIPFSUrl}`;

    const { hash: metadataIPFSUrl } = await fleekStorage.upload({
      ...fleekAuth,
      key: `${timestamp}`,
      data: metadata,
    });

    const metadataUrl = `https://ipfs.infura.io/ipfs/${metadataIPFSUrl}`;

    res.send({ fileUrl, imageUrl, metadataUrl });

  } else {
    res.status(501);
  }
  res.end();
};

// Remove bodyParser from endpoint
export const config = {
  api: {
    bodyParser: false,
  },
};

