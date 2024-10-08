import React from "react";
import styles from "./Home.module.scss";
import Divider from "@/components/divider/Divider";
import { Box, Typography, Button, Link as MuiLink } from "@mui/material"; // Import Link as MuiLink
import LocationMap from "@/components/location-map/LocationMap";
import ImageGallery from "@/components/image-gallery/ImageGallery";
import Intro from "@/components/intro/Intro";
import FeatureCards from "@/components/feature-cards/FeatureCards";
import { features } from "@/constants/constants";
import About from "@/components/about/About";

export default function HomeContent() {
  return (
    <>
      <Intro
        introImg="https://res.cloudinary.com/dwfzjmsyz/image/upload/f_auto,q_auto/beachpic_d4m2n0"
        cName="intro-mid"
        text="A pristine luxury beach cabin for creating unforgettable memories..."
        buttonText="Book Now"
        btnClass="show"
      />
      <div className={styles.siteContent} role="main">
        <div className={styles.verticalColumn}>
          <div className={styles.introImgSection}>
          <Divider showLines={true} title="Welcome to Sapphire By The Sea" />
            <Typography
              variant="body1"
              paragraph
              width="85%"
              sx={{ margin: "0 auto 2rem auto", textAlign: "center" }}
              aria-label="Description of the luxury beach house"
            >
              A luxury beach house in Crystal Beach, TX, located just a 5-minute
              walk from the beach...
            </Typography>

            <ImageGallery />
            <Box sx={{ textAlign: "center", marginBottom: 3 }}>
              <MuiLink href="/gallery" underline="hover">
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "transparent",
                    color: "#0f52ba",
                    borderColor: "#0f52ba",
                    "&:hover": {
                      backgroundColor: "#0f52ba",
                      color: "#ffffff",
                    },
                  }}
                  aria-label="View More Images"
                >
                  View More Images
                </Button>
              </MuiLink>
            </Box>

            <Divider title="Fun for the Whole Family" />
            <Typography
              variant="body1"
              paragraph
              align="center"
              width="85%"
              sx={{ marginBottom: 2 }}
              aria-label="Description of the family-friendly features"
            >
              Thoughtfully decorated with exquisite finishes and ideal for
              multi-family getaways or gatherings with friends! It comes fully
              stocked with all you need for creating unforgettable memories,
              featuring:
            </Typography>

            {/* Use the new FeatureCards component */}
            <FeatureCards features={features} />
            <Box sx={{ textAlign: "center", marginBottom: 3, marginTop: 3 }}>
              <MuiLink href="/amenities" underline="hover">
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "transparent",
                    color: "#0f52ba",
                    borderColor: "#0f52ba",
                    "&:hover": {
                      backgroundColor: "#0f52ba",
                      color: "#ffffff",
                    },
                  }}
                  aria-label="View All Amenities"
                >
                  View All Amenities
                </Button>
              </MuiLink>
            </Box>

            <Divider title="Convenient Location" />
            <Typography
              variant="body1"
              paragraph
              align="center"
              sx={{ marginBottom: 3 }}
              aria-label="Description of the location"
            >
              Just a short 5-minute walk to the sands of Crystal Beach and more!
            </Typography>

            <LocationMap />
            <Divider title="About The Host" />
            <About/>

            <Divider title="Contact Us Today!" />
            <Box mb={1} sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "600" }}
                aria-label="Call to action for contacting"
              >
                Ready to create unforgettable memories?
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ margin: "0 auto 1rem auto", width: "85%" }}
                aria-label="Description of the booking process"
              >
                Secure your stay at Sapphire by the Sea and enjoy the beauty of
                the beach just moments away. Book your dream vacation or contact us below:
              </Typography>
              <Box
                sx={{ textAlign: "center", marginBottom: 3, marginTop: 3, gap: 4, display: "flex", justifyContent: "center" }}
                aria-label="Booking and contact options"
              >
                <MuiLink href="/book" underline="hover">
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "transparent",
                      color: "#0f52ba",
                      borderColor: "#0f52ba",
                      "&:hover": {
                        backgroundColor: "#0f52ba",
                        color: "#ffffff",
                      },
                    }}
                    aria-label="Book Now"
                  >
                    Book Now
                  </Button>
                </MuiLink>
                <MuiLink href="/contact" underline="hover">
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "transparent",
                      color: "#0f52ba",
                      borderColor: "#0f52ba",
                      "&:hover": {
                        backgroundColor: "#0f52ba",
                        color: "#ffffff",
                      },
                    }}
                    aria-label="Contact Us"
                  >
                    Contact Us
                  </Button>
                </MuiLink>
               
              </Box>
             
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
