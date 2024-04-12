import grid from "gridfs-stream";
import mongoose, { Document } from "mongoose";
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
    return res.status(400).json({ error: "File not found" });
  }

  const imageUrl = `${url}/file/${req.file.filename}`;

  return res.status(200).json({ imageUrl });
};

export const getImage = (req: Request, res: Response) => {
  const filename = req.params.filename;
  try {
    const readStream = gridfsBucket.openDownloadStreamByName(filename);
    readStream.on("error", (error: any) => {
      res.status(404).json({ error: "File not found" });
    });
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
