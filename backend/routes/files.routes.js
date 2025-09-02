import express from "express";
const router = express.Router();
import fileController from '../controllers/files.controller.js';
import upload from '../middlewares/upload.middleware.js';
import {authenticateToken, authorizeRole} from '../middlewares/auth.middleware.js'; 

router.post('/upload', authenticateToken, authorizeRole, upload.single('file'), fileController.uploadFile);
router.get('/:fileId', authenticateToken, authorizeRole, fileController.getFileMetadata);
router.get('/', authenticateToken, authorizeRole, fileController.listFiles);
router.delete('/:fileId', authenticateToken, authorizeRole, fileController.deleteFile);

export default router;
