import React from "react";
import { Container, Box, Grid } from "@mui/material";
import GalleryClientComponent from "@/components/image-gallery/GalleryClientComponent";
import { carouselImages } from "@/constants/constants";

const Gallery: React.FC = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: { xs: "1rem", md: "2rem" },
        marginTop: "25px",
      }}
    >
      <Box
        sx={{
          padding: 2,
          marginTop: "20px",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {carouselImages.slice(0, 60).map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <GalleryClientComponent images={carouselImages} image={image} index={index} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Gallery;
