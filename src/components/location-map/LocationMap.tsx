"use client";

import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import styles from "./LocationMap.module.scss"; // Import CSS module

const LocationMap: React.FC = () => {
  const defaultLocation = {
    center: {
      lat: 29.476997596734382,
      lng: -94.58320431270624,
    },
    zoom: 15.7,
  };

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const addCircleToMap = (maps: typeof google.maps) => {
    if (map) {
      new maps.Circle({
        fillColor: "#454545",
        strokeOpacity: 0.7,
        strokeWeight: 2,
        strokeColor: "#454545",
        fillOpacity: 0.3,
        map,
        center: defaultLocation.center,
        radius: 80,
      });
    }
  };

  const onGoogleApiLoaded = ({
    map,
    maps,
  }: {
    map: google.maps.Map;
    maps: typeof google.maps;
  }) => {
    setMap(map);
  };

  useEffect(() => {
    if (map) {
      addCircleToMap(window.google.maps);
    }
  }, [map]);

  return (
    <div className={styles.mapContainer}>
      {" "}
      {/* Use styles from the module */}
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Use NEXT_PUBLIC_ prefix for Next.js
        }}
        defaultCenter={defaultLocation.center}
        defaultZoom={defaultLocation.zoom}
        onGoogleApiLoaded={onGoogleApiLoaded}
        yesIWantToUseGoogleMapApiInternals
      />
    </div>
  );
};

export default LocationMap;
