import Image from "next/image";
import styles from "./Intro.module.scss";
import { Button, Box, Link as MuiLink } from "@mui/material";

interface IntroProps {
  cName: string;
  introImg: string;
  text: string;
  btnClass: string;
  buttonText: string;
}

const Intro = ({ cName, introImg, text, btnClass, buttonText }: IntroProps) => {
  return (
    <div className={styles.intro}>
      {/* Background image */}
      <Image
        src={introImg}
        layout="fill"
        objectFit="cover"
        className={styles.backgroundImage}
        alt="Intro Image"
      />

      {/* Centered content */}
      <div className={styles.introLogoSection}>
        <p className={styles.introText}>{text}</p>
        <Image
          src="/images/sapphirelogo.svg"
          className={styles.sapphireLogo}
          width={550}
          height={200}
          alt="Sapphire Logo"
          priority
        />
        <Box sx={{ textAlign: "center", marginBottom: 3, marginTop: 1 }}>
          <MuiLink href="/book" underline="hover">
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "rgba(15, 82, 186, 1.0)", // Faded sapphire
                color: "white",
                borderColor: "#0f52ba",
                "&:hover": {
                  backgroundColor: "white", // Slightly darker on hover
                  color: "#0f52ba",
                },
              }}
            >
              {buttonText}
            </Button>
          </MuiLink>
        </Box>
      </div>
    </div>
  );
};

export default Intro;
