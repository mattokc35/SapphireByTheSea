import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { Box, Typography, ClickAwayListener } from "@mui/material";

interface PriceTooltipProps {
  numberOfNights: number;
  nightsPrice: number;
  hasDiscount: boolean;
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
                p: 2,
                bgcolor: "#FFF",
                color: "#0f52ba",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="body2">
                {numberOfNights} nights price: ${nightsPrice.toFixed(2)} <br />
                {hasDiscount && (
                  <div>
                    {`Length of Stay Discount Price: $${discountedNightsPrice} (${discountPercentage}% off for ${numberOfNights} nights)`}
                  </div>
                )}
                {promoCode && promoCodeDiscountPercentage > 0 && (
                  <div>
                    {`Promo Code: ${promoCodeDiscountPercentage}% off for ${promoCode}`}
                  </div>
                )}
                {promoCode && (
                  <div>
                    {`Promo Code Discount Price: $${promoCodeDiscountPrice}`}
                  </div>
                )}
                <div>Cleaning Fee: $230</div>
                <div>Tax: ${tax.toFixed(2)}</div>
                <div>Total Price: ${totalPrice.toFixed(2)}</div>
              </Typography>
            </Box>
          }
          arrow
          placement="bottom"
          componentsProps={{
            tooltip: {
              sx: {
                "& .MuiTooltip-arrow": {
                  color: "rgba(13, 74, 154, 0.9)",
                },
              },
            },
          }}
        >
          <span
            style={{ cursor: "pointer", color: "#0f52ba" }}
            onClick={handleTooltipOpen}
          >
            Hover or click for price details
          </span>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};

export default PriceTooltip;
