import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { hostName, hostBio } from "../../constants/constants";

const About: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
      sx={{ padding: 2 }} // Add padding for better spacing
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: "50%",
          maxWidth: { xs: 150, md: 300 }, // Reduce image size on mobile
          height: "auto",
          marginBottom: { xs: 2, md: 0 },
          boxShadow: 3,
          transition: "transform 0.3s ease-in-out",
          overflow: "hidden",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      >
        <Image
          src={"/images/benanddeborah.webp"}
          alt="Host Profile"
          layout="responsive"
          width={300} // Width of the image in pixels
          height={300} // Height of the image in pixels
          objectFit="cover"
          quality={100}
          priority
        />
      </Box>
      <Box
        sx={{
          marginLeft: { md: 3 },
          textAlign: { xs: "center", md: "left" },
          paddingX: { xs: 2, md: 0 }, // Add horizontal padding on mobile
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            marginBottom: 1,
            fontSize: { xs: "1.5rem", md: "1.75rem" }, // Adjust font size for mobile
          }}
        >
          {hostName}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            lineHeight: 1.6,
            fontSize: { xs: "0.9rem", md: "1rem" }, // Adjust font size for mobile
          }}
        >
          {hostBio}
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
