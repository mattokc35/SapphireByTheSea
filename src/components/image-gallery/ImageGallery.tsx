import React from "react";
import ImageGalleryClient from "./ImageGalleryClient";
import { imageGalleryImages } from "../../constants/constants";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

interface Image {
  src: string;
  caption: string;
}

const ImageGallery = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {imageGalleryImages.map((image: Image, index: number) => (
        <Grid item xs={12} sm={6} md={6} lg={4} key={image.caption}>
          <Card
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              maxHeight: "300px",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "0px 0px 0px 4px rgba(255, 165, 0, 0.5)",
              },
            }}
          >
            <CardMedia
              component="img"
              image={image.src}
              alt={`Image ${index + 1}`}

              sx={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: 0, // Remove any border-radius to ensure the image covers the card edges
              }}
            />
          </Card>
        </Grid>
      ))}
      {/* Pass image data to the client-side component */}
      <ImageGalleryClient images={imageGalleryImages} />
    </Grid>
  );
};

export default ImageGallery;
