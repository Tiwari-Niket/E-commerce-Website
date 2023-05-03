const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");
const express = require("express");
const {isAdmin, authMiddleware} = require("../middlewares/authMiddleware");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, uploadPhoto.array("images",2),productImgResize, uploadImages);
router.delete("/delete-img/:id", authMiddleware, isAdmin,  deleteImages);

module.exports=router;