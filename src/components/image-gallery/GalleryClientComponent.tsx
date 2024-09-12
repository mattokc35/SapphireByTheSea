"use client";

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

interface GalleryClientComponentProps {
  image: { src: string };
  index: number;
}

const GalleryClientComponent: React.FC<GalleryClientComponentProps> = ({ image, index }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openModal = () => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          borderRadius: 1,
          overflow: "hidden",
          cursor: "pointer",
          "&:hover": {
            opacity: 0.8,
          },
        }}
        onClick={openModal} // Handle onClick event here
      >
        <Image
          src={image.src}
          alt={`Image ${index}`}
          width={300}
          height={300} // Set height to match width for square images
          layout="responsive"
          style={{ borderRadius: "10px", maxHeight: "200px" }}
        />
      </Box>

      {selectedImageIndex !== null && (
        <Dialog open={modalIsOpen} onClose={closeModal} fullWidth maxWidth="md">
          <DialogContent
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "none"
            }}
          >
            <IconButton
              onClick={closeModal}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "grey.500",
              }}
            >
              <CloseIcon />
            </IconButton>
            <Image
              src={image.src}
              alt={`Image ${selectedImageIndex}`}
              width={600}
              height={400}
              style={{ borderRadius: "10px" }}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default GalleryClientComponent;
