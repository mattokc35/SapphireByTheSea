import React, { FC } from "react";
import {
  Box,
  Typography,
  Rating,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface ReviewProps {
  rating: number;
  text: string;
  name: string;
  date: string;
}

// StyledReviewBox with hover effect
const StyledReviewBox = styled(Box)(({ theme }) => ({
  margin: "auto",
  borderRadius: "8px",
  width: "80% !important",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  overflow: "auto",
  backgroundColor: theme.palette.background.paper,
  padding: "20px", // Default padding
  transition: "transform 0.3s, box-shadow 0.3s", // Smooth transition for hover

  // Hover effect
  "&:hover": {
    transform: "scale(1.02)", // Scale up on hover
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)", // Increase shadow on hover
  },

  // Responsive styles
  [theme.breakpoints.up("sm")]: {
    width: "60% !important",
    padding: "20px", // Adjust padding for small screens
  },
  [theme.breakpoints.up("md")]: {
    width: "70% !important",
  },
  [theme.breakpoints.up("lg")]: {
    width: "80% !important",
  },
  [theme.breakpoints.up("xl")]: {
    width: "90% !important",
  },
}));

const Review: FC<ReviewProps> = ({ rating, text, name, date }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledReviewBox>
      <Rating value={rating} readOnly precision={0.5} />
      <Typography
        variant="body1"
        sx={{
          fontStyle: isSmallScreen ? "italic" : "normal",
          fontSize: isSmallScreen ? "0.9rem" : "1rem",
          marginBottom: "10px",
        }}
      >
        {text}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Typography variant="subtitle2" color="textSecondary">
          -{name}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {date}
        </Typography>
      </Box>
    </StyledReviewBox>
  );
};

export default Review;
