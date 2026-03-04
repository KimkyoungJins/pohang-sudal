"use client";

import { useState, useEffect, useRef } from "react";
import { getTourRoute } from "@/lib/tour-routes";

type MapProvider = "google" | "naver";

export default function TourMap({ tourSlug }: { tourSlug: string }) {
  const route = getTourRoute(tourSlug);
  const [provider, setProvider] = useState<MapProvider>("google");
  const mapRef = useRef<HTMLDivElement>(null);

  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const naverKey = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID;

  const hasGoogle = !!googleKey;
  const hasNaver = !!naverKey;

  useEffect(() => {
    if (!route || !mapRef.current) return;
    if (provider === "google" && hasGoogle) {
      loadGoogleMap();
    } else if (provider === "naver" && hasNaver) {
      loadNaverMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, route]);

  const loadGoogleMap = () => {
    if (!route || !mapRef.current || !googleKey) return;

    const scriptId = "google-maps-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleKey}`;
      script.onload = () => initGoogleMap();
      document.head.appendChild(script);
    } else {
      initGoogleMap();
    }
  };

  const initGoogleMap = () => {
    if (!route || !mapRef.current || !window.google) return;
    const map = new window.google.maps.Map(mapRef.current, {
      center: route.center,
      zoom: route.zoom,
      styles: [
        { featureType: "poi", stylers: [{ visibility: "off" }] },
      ],
    });

    route.stops.forEach((stop, i) => {
      const marker = new window.google.maps.Marker({
        position: { lat: stop.lat, lng: stop.lng },
        map,
        label: { text: String(i + 1), color: "white" },
        title: stop.name,
      });
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="padding:4px"><strong>${stop.name}</strong><br/><span style="font-size:12px;color:#666">${stop.description}</span></div>`,
      });
      marker.addListener("click", () => infoWindow.open(map, marker));
    });
  };

  const loadNaverMap = () => {
    if (!route || !mapRef.current || !naverKey) return;

    const scriptId = "naver-maps-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverKey}`;
      script.onload = () => initNaverMap();
      document.head.appendChild(script);
    } else {
      initNaverMap();
    }
  };

  const initNaverMap = () => {
    if (!route || !mapRef.current || !window.naver) return;
    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(route.center.lat, route.center.lng),
      zoom: route.zoom,
    });

    route.stops.forEach((stop, i) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(stop.lat, stop.lng),
        map,
        title: stop.name,
        icon: {
          content: `<div style="background:#6CB4EE;color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.3)">${i + 1}</div>`,
          anchor: new window.naver.maps.Point(12, 12),
        },
      });

      const infoWindow = new window.naver.maps.InfoWindow({
        content: `<div style="padding:8px"><strong>${stop.name}</strong><br/><span style="font-size:12px;color:#666">${stop.description}</span></div>`,
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        infoWindow.open(map, marker);
      });
    });
  };

  if (!route) return null;

  // Fallback: no API keys — show text list
  if (!hasGoogle && !hasNaver) {
    return (
      <div className="mt-8">
        <h2 className="font-serif text-2xl text-dark mb-4">Tour Route</h2>
        <div className="bg-sky-pale/30 rounded-xl p-6">
          <ol className="space-y-3">
            {route.stops.map((stop, i) => (
              <li key={i} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-sky text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <span className="font-medium text-dark">{stop.name}</span>
                  <p className="text-gray-500 text-sm">{stop.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-2xl text-dark">Tour Route</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {hasGoogle && (
            <button
              onClick={() => setProvider("google")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                provider === "google"
                  ? "bg-white text-dark shadow-sm"
                  : "text-gray-500 hover:text-dark"
              }`}
            >
              Google Maps
            </button>
          )}
          {hasNaver && (
            <button
              onClick={() => setProvider("naver")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                provider === "naver"
                  ? "bg-white text-dark shadow-sm"
                  : "text-gray-500 hover:text-dark"
              }`}
            >
              Naver Maps
            </button>
          )}
        </div>
      </div>
      <div ref={mapRef} className="w-full h-80 rounded-xl bg-gray-100" />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {route.stops.map((stop, i) => (
          <div key={i} className="flex items-start text-sm">
            <span className="flex-shrink-0 w-5 h-5 bg-sky text-white rounded-full flex items-center justify-center text-[10px] font-bold mr-2 mt-0.5">
              {i + 1}
            </span>
            <div>
              <span className="font-medium text-dark">{stop.name}</span>
              <span className="text-gray-400 ml-1 text-xs">
                {stop.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
