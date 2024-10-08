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
      sx={{
        padding: { xs: 2, md: 4 },
        gap: { xs: 2, md: 4 }, // Space between image and text
        textAlign: { xs: "center", md: "left" },
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          position: "relative",
          maxWidth: { xs: "100%", md: 400 }, // Adjust for better image width on large screens
          height: "auto",
          borderRadius: "8px", // Slight rounding for modern feel
          overflow: "hidden",
          marginBottom: { xs: 2, md: 0 }, // Space out image and text on mobile
        }}
      >
        <Image
          src={"/images/benanddeborah.webp"}
          alt="Host Profile"
          layout="responsive"
          objectFit="cover"
          width={300}
          height={300}
          priority
          style={{
            width: "50%",
            height: "50%",
            borderRadius: "8px", // Match the rounding
          }}
        />
      </Box>

      {/* Text Section */}
      <Box sx={{ maxWidth: "600px" }}>
        <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "600" }}
                aria-label="host-name"
              >
                {hostName}
              </Typography>
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            marginBottom: 2,
          }}
        >
          {hostBio}
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
