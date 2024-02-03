import grid from "gridfs-stream";
import mongoose from "mongoose";
import { Request, Response } from "express";

const url = "http://localhost:5000";

let gfs: any, gridfsBucket: any;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadImage = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(404).json({ msg: "File not found" });
  }

  const imageUrl = `${url}/file/${req.file.filename}`;

  return res.status(200).json(imageUrl);
};

export const getImage = async (req: Request, res: Response) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    // const readStream = gfs.createReadStream(file.filename);
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
