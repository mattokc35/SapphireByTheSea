import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { Box, Typography, ClickAwayListener } from "@mui/material";
import Divider from "../divider/Divider";

interface PriceTooltipProps {
  numberOfNights: number;
  nightsPrice: number;
  promoCodePriceAmount: number;
  hasDiscount: boolean;
  petFee: number;
  discountedNightsPrice?: number;
  discountPercentage?: number;
  promoCodeDiscountPercentage: number;
  promoCodeDiscountPrice?: number;
  totalPrice: number;
  tax: number;
  promoCode: string;
  discountedNightsAmount: number;
  totalBeforeTax: number;
}

const PriceTooltip: React.FC<PriceTooltipProps> = ({
  numberOfNights,
  nightsPrice,
  hasDiscount,
  petFee,
  promoCodeDiscountPercentage,
  promoCodePriceAmount,
  totalPrice,
  tax,
  promoCode,
  discountedNightsAmount,
  totalBeforeTax,
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
              <Typography variant="body2">
                ${(nightsPrice / numberOfNights).toFixed(2)} x {numberOfNights}{" "}
                nights:
                <span style={{ fontWeight: "bold" }}> ${nightsPrice}</span>
              </Typography>

              {hasDiscount && (
                <Box>
                  <Typography variant="body2">
                    Length of Stay Discount:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      -${discountedNightsAmount.toFixed(2)}
                    </span>
                  </Typography>
                </Box>
              )}

              {petFee > 0 && (
                <Box>
                  <Typography variant="body2">
                    Pet Fee:{" "}
                    <span style={{ fontWeight: "bold" }}>${petFee}</span>
                  </Typography>
                </Box>
              )}

              <Box>
                <Typography variant="body2">
                  Cleaning Fee: <span style={{ fontWeight: "bold" }}>$230</span>
                </Typography>
              </Box>
              {promoCode && promoCodeDiscountPercentage > 0 && (
                <Box sx={{ color: "#0f52ba" }}>
                  <Typography variant="body2">
                    Promo Code Discount:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      -${promoCodePriceAmount}
                    </span>
                  </Typography>
                </Box>
              )}

              <Typography variant="body2">
                Total Before Tax:{" "}
                <span style={{ fontWeight: "bold" }}>
                  ${totalBeforeTax.toFixed(2)}
                </span>
              </Typography>

              <Box>
                <Typography variant="body2">
                  Tax:{" "}
                  <span style={{ fontWeight: "bold" }}>${tax.toFixed(2)}</span>
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2">
                  ----------------------------------------------------
                </Typography>
              </Box>
              <Box
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
              >
                <Typography variant="body2">
                  <span style={{ fontWeight: "bold" }}>
                    Grand Total: ${totalPrice.toFixed(2)}
                  </span>
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
              fontSize: "0.9rem",
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
