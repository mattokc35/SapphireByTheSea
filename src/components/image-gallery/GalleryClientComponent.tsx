"use client";

import React, { useState } from "react";
import {
  Dialog,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Importing ArrowBack icon
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Importing ArrowForward icon
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface GalleryClientComponentProps {
  image: { src: string };
  index: number;
  images: { src: string; caption: string }[];
}

const GalleryClientComponent: React.FC<GalleryClientComponentProps> = ({
  image,
  index,
  images,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const openModal = () => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Check if the screen size is mobile
  const isMobile = useMediaQuery("(max-width:600px)");

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isMobile, // Hide arrows on mobile
    adaptiveHeight: true,
    fade: !isMobile, // Fade effect off on mobile
    swipe: true,
    prevArrow: <CustomArrow direction="left" /> ,
    nextArrow: <CustomArrow direction="right" /> 
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
        onClick={openModal}
      >
        <Image
          src={image.src}
          alt={`Image ${index}`}
          width={300}
          height={300}
          layout="responsive"
          style={{ borderRadius: "10px", maxHeight: "350px" }}
        />
      </Box>

      <Dialog
        open={modalIsOpen}
        onClose={closeModal}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            padding: 0,
            overflow: "hidden",
            justifyContent: "center",
            borderRadius: 0,
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            margin: 0,
          },
        }}
      >
        <IconButton
          onClick={closeModal}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 1,
            color: "black",
          }}
        >
          <CloseIcon sx={{ fontSize: 30 }} />
        </IconButton>

        {images.length > 0 && (
          <Slider {...settings} initialSlide={selectedImageIndex || 0}>
            {images.map((img, idx) => (
              <Box
                key={idx}
                sx={{
                  position: "relative",
                  display: "block",
                  width: "100%",
                  height: "100%",
                  padding: "2rem",
                }}
              >
                {!isMobile && (
                  <Typography
                    variant="caption"
                    sx={{
                      textAlign: "center",
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                    }}
                  >
                    {`${idx + 1}/${images.length}`}
                  </Typography>
                )}
                {/* Image Box */}
                <Box
                  sx={{
                    width: "100%",
                    height: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={`Image ${idx}`}
                    height="900"
                    width="900"
                    style={{
                      objectFit: "contain",
                      borderRadius: "10px",
                      width: "100%",
                      height: "auto",
                      maxHeight: "100%",
                    }}
                  />
                </Box>

                {/* Caption Box - only show on non-mobile devices */}
                {!isMobile && (
                  <Box
                    sx={{
                      width: "100%",
                      padding: "0 10px",
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "center",
                        maxWidth: "100%",
                        fontSize: { xs: "0.9rem", sm: "1.0rem" },
                      }}
                    >
                      {img.caption}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Slider>
        )}
      </Dialog>
    </>
  );
};

const CustomArrow = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick?: () => void;
}) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      [direction === "left" ? "left" : "right"]: { xs: "5%", sm: "2%" },
      transform: "translateY(-50%)",
      color: "white",
      zIndex: 1,
      background: "rgba(0, 0, 0, 0.2)",
      borderRadius: "50%",
      padding: { xs: 1, sm: 2 },
      width: { xs: 30, sm: 40 },
      height: { xs: 30, sm: 40 },
      "&:hover": {
        background: "rgba(0, 0, 0, 0.7)",
      },
    }}
  >
    {direction === "left" ? (
      <ArrowBackIcon sx={{ fontSize: { xs: "16px", sm: "24px" } }} />
    ) : (
      <ArrowForwardIcon sx={{ fontSize: { xs: "16px", sm: "24px" } }} />
    )}
  </IconButton>
);

export default GalleryClientComponent;
