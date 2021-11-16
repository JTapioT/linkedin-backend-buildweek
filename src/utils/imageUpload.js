import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const cloudinaryProfileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profileImages"
  }
})

const cloudinaryExperienceStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "experienceImages",
  },
});

const cloudinaryPostStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "postImages",
  },
});

export function uploadProfilePicture(req,res,next) {
  const upload = multer({ storage: cloudinaryProfileStorage })
  .single("profile");
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      throw new Error(err);
    } else {
      next();
    }
  });
}


export function uploadExperiencePicture(req,res,next) {
  const upload = multer({ storage: cloudinaryExperienceStorage })
  .single("experience");
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      throw new Error(err);
    } else {
      next();
    }
  });
}

export function uploadPostPicture(req,res,next) {
  const upload = multer({ storage: cloudinaryPostStorage })
  .single("post");
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      throw new Error(err);
    } else {
      next();
    }
  });
}
