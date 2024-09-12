"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Modal,
  IconButton,
} from "@mui/material";
import Rating from "@mui/material/Rating"; // Import Rating component
import { reviews } from "@/constants/constants";
import CloseIcon from "@mui/icons-material/Close";
import { Review } from "@/types/types";

const ReviewsPage = () => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const handleOpenModal = (review: Review) => {
    setSelectedReview(review);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "2rem 1rem",
        marginTop: "55px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center align items
        gap: "20px", // Space between cards
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Sapphire By The Sea Guest Reviews
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1.5rem" }}>
        5.0 Star Average Rating on Airbnb and Vrbo with over 75 reviews as of{" "}
        {new Date().toLocaleString("default", { month: "long", year:"numeric" })}
      </Typography>

      {/* Displaying cards in a centered column */}
      {reviews.map((review, index) => (
        <Card
          key={index}
          onClick={() => handleOpenModal(review)}
          sx={{
            width: "100%", // Full width of the container
            maxWidth: "900px", // Max width for cards
            padding: "1rem",
            cursor: "pointer",
            backgroundColor: "#fff", // White background for cards
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Slight shadow for floating effect
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              {review.name}
            </Typography>
            <Rating
              name={`rating-${index}`} 
              value={review.rating} 
              readOnly 
              precision={0.5} 
              sx={{ marginBottom: "1rem" }} 
            />
            <Typography variant="body2" color="text.secondary">
              {review.text}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {review.date}
            </Typography>
          </Box>
        </Card>
      ))}

      {/* Modal for displaying the selected review */}
      <Modal open={!!selectedReview} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 600 }, // Responsive width
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedReview && (
            <>
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" component="div" gutterBottom>
                {selectedReview.name}
              </Typography>
              <Rating
                name="modal-rating"
                value={selectedReview.rating} // Assuming selectedReview.rating is a number from 1 to 5
                readOnly
                precision={0.5}
                sx={{ marginBottom: "1rem" }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: "1rem" }}
              >
                {selectedReview.date}
              </Typography>
              <Typography variant="body1" color="text.primary">
                {selectedReview.text}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default ReviewsPage;
