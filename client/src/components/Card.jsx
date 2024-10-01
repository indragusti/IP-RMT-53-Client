import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/baseUrl";

export default function MonsterCard({ monster }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/monster/${id}`);
  };

  const handleUploadImage = (id) => {
    navigate(`/monster/${id}/update-img`);
  };

  const handleAddToFavorite = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        navigate("/login");
        return;
      }

      await baseURL.post(
        "/favorites",
        { monsterId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsFavorite(true);
    } catch (err) {
      console.error("Failed to add to favorites:", err);
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full w-full bg-opacity-80">
      <div className="grid place-items-center mt-4">
        <img
          src={monster.Image.imageUrl || "https://via.placeholder.com/150"}
          alt={monster.name}
          className="h-40 w-40  border-4 border-red-600"
        />
      </div>
      <div className="p-4 flex-grow">
        <h5 className="text-lg font-bold text-center">{monster.name}</h5>
        <div className="flex justify-between mt-2 gap-4">
          <button
            onClick={() => handleDetail(monster.id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Detail
          </button>
          <button
            onClick={() => handleAddToFavorite(monster.id)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            {isFavorite ? "Added to Favorites" : "Add to Favorite"}
          </button>
          <button
            onClick={() => handleUploadImage(monster.id)}
            className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
}

MonsterCard.propTypes = {
  monster: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    Image: PropTypes.exact({
      imageUrl: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
