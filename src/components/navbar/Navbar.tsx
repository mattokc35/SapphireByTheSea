"use client";
import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home"; // Home icon
import { EventNote } from "@mui/icons-material";
import ImageGalleryIcon from "@mui/icons-material/PhotoLibrary"; // Gallery icon
import { HotTub } from "@mui/icons-material";
import RateReviewIcon from "@mui/icons-material/RateReview"; // Reviews icon
import ContactMailIcon from "@mui/icons-material/ContactMail"; // Contact icon

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "Book", path: "/book", icon: <EventNote /> },
    { name: "Gallery", path: "/gallery", icon: <ImageGalleryIcon /> },
    { name: "Amenities", path: "/amenities", icon: <HotTub /> },
    { name: "Reviews", path: "/reviews", icon: <RateReviewIcon /> },
    { name: "Contact", path: "/contact", icon: <ContactMailIcon /> },
  ];
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ boxShadow: 3, backgroundColor: "#ffffff" }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Link href="/">
              <Image
                src="/images/sapphirelogo.svg"
                alt="Sapphire Logo"
                width={120}
                height={40}
              />
            </Link>
          </Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" } }} // Show on mobile only
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                passHref
                style={{ textDecoration: "none" }}
              >
                <Button sx={{ color: "#0f52ba", display: "flex", alignItems: "center" }}>
                  {item.icon}
                  <span style={{ marginLeft: 8 }}>{item.name}</span> {/* Add space between icon and text */}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "250px",
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "16px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={toggleDrawer(false)}
            sx={{
              alignSelf: "flex-end",
              color: "#0f52ba",
            }}
          >
            <CloseIcon />
          </IconButton>
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.name} onClick={toggleDrawer(false)}>
                <Link
                  href={item.path}
                  passHref
                  style={{ textDecoration: "none", color: "#0f52ba", display: "flex", alignItems: "center" }}
                >
                  {item.icon}
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#0f52ba",
                          padding: "16px",
                          textAlign: "center",
                        }}
                      >
                        {item.name}
                      </Typography>
                    }
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
