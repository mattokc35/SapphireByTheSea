import React, { FC, Ref } from "react";
import { Divider as MuiDivider, Typography, Box } from "@mui/material";

interface DividerProps {
  title?: string;
  showLines?: boolean;
}

const Divider: FC<DividerProps> = React.forwardRef(
  ({title, showLines = true}: DividerProps, ref: Ref<HTMLDivElement>) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          alignItems: "center",
          my: 3,
          width: "100%",
          scrollMarginTop: "110px",
        }}
      >
        {showLines && (<MuiDivider
          sx={{
            flexGrow: 1,
            borderColor: "rgba(13, 74, 154, 0.2)", // Subtle sapphire blue
            height: "1px",
            borderRadius: "2px",
          }}
        />)}

        {title && (
          <Typography
            variant="subtitle1"
            sx={{
              mx: 3,
              fontWeight: 500,
              color: "#0d4a9a",
              fontSize: "1rem",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>
        )}
        {showLines && (
          <MuiDivider
          sx={{
            flexGrow: 1,
            borderColor: "rgba(13, 74, 154, 0.2)", // Subtle sapphire blue
            height: "1px",
            borderRadius: "2px",
          }}
        />
        )}
        
      </Box>
    );
  }
);

// Set the display name for the component
Divider.displayName = "Divider";

export default Divider;
