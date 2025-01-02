import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { Box, Typography, ClickAwayListener } from "@mui/material";

interface PriceTooltipProps {
  numberOfNights: number;
  nightsPrice: number;
  hasDiscount: boolean;
  petFee: number;
  discountedNightsPrice: number;
  discountPercentage: number;
  promoCodeDiscountPercentage: number;
  promoCodeDiscountPrice: number;
  totalPrice: number;
  tax: number;
  promoCode: string;
}

const PriceTooltip: React.FC<PriceTooltipProps> = ({
  numberOfNights,
  nightsPrice,
  hasDiscount,
  petFee,
  discountedNightsPrice,
  discountPercentage,
  promoCodeDiscountPercentage,
  promoCodeDiscountPrice,
  totalPrice,
  tax,
  promoCode,
}) => {
  const [open, setOpen] = useState(false);

  // Handle opening and closing of the tooltip on click
  const handleTooltipOpen = () => setOpen(true);
  const handleTooltipClose = () => setOpen(false);

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          open={open}
          onClose={handleTooltipClose}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            <Box
              sx={{
                p: 3,
                bgcolor: "#FFF",
                color: "#333",
                borderRadius: 3,
                boxShadow: 3,
                width: 300,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {numberOfNights} nights at ${nightsPrice.toFixed(2)} each
              </Typography>

              {hasDiscount && (
                <Box sx={{ mt: 1, color: "#0f52ba" }}>
                  <Typography variant="body2">
                    Length of Stay Discount:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      ${discountedNightsPrice} ({discountPercentage}% off)
                    </span>
                  </Typography>
                </Box>
              )}

              {promoCode && promoCodeDiscountPercentage > 0 && (
                <Box sx={{ mt: 1, color: "#0f52ba" }}>
                  <Typography variant="body2">
                    Promo Code: <span style={{ fontWeight: "bold" }}>{promoCode}</span>
                    {" "}({promoCodeDiscountPercentage}% off)
                  </Typography>
                </Box>
              )}

              {promoCode && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    Promo Code Discount Price:{" "}
                    <span style={{ fontWeight: "bold" }}>${promoCodeDiscountPrice}</span>
                  </Typography>
                </Box>
              )}

              {petFee > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    Pet Fee: <span style={{ fontWeight: "bold" }}>${petFee}</span>
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">
                  Cleaning Fee: <span style={{ fontWeight: "bold" }}>$230</span>
                </Typography>
              </Box>

              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">
                  Tax: <span style={{ fontWeight: "bold" }}>${tax.toFixed(2)}</span>
                </Typography>
              </Box>

              <Box sx={{ mt: 2, fontSize: "1.1rem", fontWeight: "bold", color: "#0f52ba" }}>
                <Typography variant="body2">
                  Total Price: <span style={{ fontWeight: "bold" }}>${totalPrice.toFixed(2)}</span>
                </Typography>
              </Box>
            </Box>
          }
          arrow
          placement="bottom"
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: "transparent",
                "& .MuiTooltip-arrow": {
                  color: "#FFF",
                },
              },
            },
          }}
        >
          <span
            style={{
              cursor: "pointer",
              fontSize: "1rem",
              color: "#0f52ba",
              fontWeight: "600",
              textDecoration: "underline",
            }}
            onClick={handleTooltipOpen}
          >
            Click for price details
          </span>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};

export default PriceTooltip;
