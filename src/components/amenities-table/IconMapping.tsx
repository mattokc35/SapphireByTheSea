import React from "react";
import {
  Room,
  CheckCircle,
  Kitchen,
  SportsEsports,
  Bathroom,
  BeachAccess,
  Bed,
  HealthAndSafety,
  LocalParking,
  Rule,
  CameraIndoor,
} from "@mui/icons-material";

export const IconWithMargin: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <span style={{ marginRight: "2px" }}>{children}</span>;
};

export const iconMapping: { [key: string]: React.ReactNode } = {
  "Property Type": (
    <IconWithMargin>
      <Room />
    </IconWithMargin>
  ),
  "House Rules": (
    <IconWithMargin>
      <Rule />
    </IconWithMargin>
  ),
  "Setting & View": (
    <IconWithMargin>
      <BeachAccess />
    </IconWithMargin>
  ),
  "Check-In": (
    <IconWithMargin>
      <CheckCircle />
    </IconWithMargin>
  ),
  Kitchen: (
    <IconWithMargin>
      <Kitchen />
    </IconWithMargin>
  ),
  Bathrooms: (
    <IconWithMargin>
      <Bathroom />
    </IconWithMargin>
  ),
  "Sleeping Arrangements": (
    <IconWithMargin>
      <Bed />
    </IconWithMargin>
  ),
  Entertainment: (
    <IconWithMargin>
      <SportsEsports />
    </IconWithMargin>
  ),
  Outdoor: (
    <IconWithMargin>
      <BeachAccess />
    </IconWithMargin>
  ),
  Parking: (
    <IconWithMargin>
      <LocalParking />
    </IconWithMargin>
  ),
  Safety: (
    <IconWithMargin>
      <HealthAndSafety />
    </IconWithMargin>
  ),
  Expectations: (
    <IconWithMargin>
      <CameraIndoor />
    </IconWithMargin>
  ),
};
