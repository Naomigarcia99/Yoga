import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { useLocationsContext } from "../context/LocationsContext";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function MapBox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.1685);
  const [lat, setLat] = useState(41.3818);
  const [zoom, setZoom] = useState(11);

  const { locations } = useLocationsContext();
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  const handleLocationSelect = (e) => {
    const selectedId = e.target.value;
    console.log("ID seleccionado:", selectedId);
    console.log(locations);
    const location = locations.find((loc) => loc.id.toString() === selectedId);
    console.log(location);
    if (location) {
      setSelectedLocation(location);

      map.current.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 14,
      });

      new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .setPopup(new mapboxgl.Popup().setText(location.name))
        .addTo(map.current);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-5 mb-2">
        <h1 className="font-bold text-3xl text-pink-300">OUR LOCATIONS</h1>
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <div className="w-full max-w-lg p-4">
          <select
            className="select bg-pink-50 border-2 border-pink-300 rounded-full"
            onChange={handleLocationSelect}
            defaultValue=""
          >
            <option value="" disabled>
              Select a center
            </option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="h-[60vh] w-[60vw]" ref={mapContainer}></div>
      </div>
    </>
  );
}
