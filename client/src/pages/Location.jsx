import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  const fetchLocations = async () => {
    try {
      const response = await axios.get("https://mhw-db.com/locations");
      const locationData = response.data.map(({ id, zoneCount, name }) => ({
        id,
        zoneCount,
        name,
      }));
      setLocations(locationData);
    } catch (err) {
      console.error("Error fetching locations:", err);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="container mx-auto mt-4">
      <div className="mb-4">
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition"
        >
          Back to Home
        </button>
      </div>
      <h2 className="text-4xl font-bold mb-8 text-white bg-gray-800 p-4 text-center border-b-4 border-red-600 bg-opacity-90 rounded">
        Locations
      </h2>

      <div className="grid grid-cols-4 gap-8 mb-8">
        {locations.length > 0 ? (
          locations.map((location) => (
            <div
              key={location.id}
              className="bg-gray-800 p-4 rounded shadow bg-opacity-80"
            >
              <h3 className="text-xl font-bold text-white">{location.name}</h3>
              <p className="text-white">Zone Count: {location.zoneCount}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-white">
            No locations found.
          </p>
        )}
      </div>
    </div>
  );
}
