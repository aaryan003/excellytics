import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import path from 'path';

async function uploadFile(req, res) {
  try {
    const file = req.file;
    const userId = req.user.id;

    const uploadedFile = await prisma.excelFile.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
        filePath: file.path,
        userId,
      },
    });

    res.status(201).json(uploadedFile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload file' });
  }
}

async function getFileMetadata(req, res) {
  const { fileId } = req.params;

  const file = await prisma.excelFile.findUnique({
    where: { id: fileId },
  });

  if (!file) {
    return res.status(404).json({ message: 'File not found' });
  }

  res.json(file);
}

async function listFiles(req, res) {
  const userId = req.user.id;

  const files = await prisma.excelFile.findMany({
    where: { userId },
    orderBy: { uploadedAt: 'desc' },
  });

  res.json(files);
}

async function deleteFile(req, res) {
  const { fileId } = req.params;

  const file = await prisma.excelFile.findUnique({ where: { id: fileId } });

  if (!file) {
    return res.status(404).json({ message: 'File not found' });
  }

  await prisma.excelFile.delete({ where: { id: fileId } });
  res.json({ message: 'File deleted successfully' });
}

export default {
  uploadFile,
  getFileMetadata,
  listFiles,
  deleteFile,
};
