import React, { useEffect, useRef, useState } from "react";
import {
    LoadScript,
    GoogleMap,
    StandaloneSearchBox,
    Marker,
  } from '@react-google-maps/api';
import axios from "../../node_modules/axios/index";
import { useDispatch } from 'react-redux';

const libs = ["places"];
const defaultLocation = { latitude: 40.781841, longitude: -73.966461 };

export default function MapScreen(props) {
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios("/api/config/google");
      setGoogleApiKey(data);
      // getUserCurrentLocation();
    };
    fetch();
  }, []);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };

  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };

  const onIdle = () => {
    setLocation({
      latitude: mapRef.current.center.lat(),
      longitude: mapRef.current.center.lng(),
    });
  };

  return <div></div>;
}
