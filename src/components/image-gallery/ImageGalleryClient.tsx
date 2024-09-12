"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Image {
  src: string;
  caption: string;
}

interface ImageGalleryClientProps {
  images: Image[];
}

const ImageGalleryClient: React.FC<ImageGalleryClientProps> = ({ images }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const selectedImage = images[selectedIndex];

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogContent
          sx={{ bgcolor: "black", position: "relative", borderRadius: 2 }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "white",
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: 10,
              color: "white",
              zIndex: 10,
              transform: "translateY(-50%)",
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: 10,
              color: "white",
              zIndex: 10,
              transform: "translateY(-50%)",
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          {selectedImage && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "80vh",
                textAlign: "center",
              }}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.caption}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
              <Typography variant="h6" sx={{ color: "white", marginTop: 2 }}>
                {selectedImage.caption}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGalleryClient;
