import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/baseUrl";

export default function FavoriteMonsterCard({ monster }) {
  const [isRemoved, setIsRemoved] = useState(false);
  const navigate = useNavigate();

  console.log("Monster data:", monster);

  const handleRemoveFromFavorite = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      await baseURL.delete(`/favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsRemoved(true);
    } catch (err) {
      console.error("Failed to remove from favorites:", err);
    }
  };

  if (isRemoved) {
    return null;
  }

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full w-full bg-opacity-80">
      <div className="grid place-items-center mt-4">
        <img
          src={monster.Image?.imageUrl || "https://via.placeholder.com/150"}
          alt={monster.name}
          className="h-40 w-40 border-4 border-red-600"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col items-center">
        <h5 className="text-xl font-bold text-center">{monster.name}</h5>
        <div className="flex justify-center mt-2 gap-4">
          <button
            onClick={() => navigate(`/monster/${monster.id}`)}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
          >
            Detail
          </button>
          <button
            onClick={() => handleRemoveFromFavorite(monster.id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Remove from Favorite
          </button>
        </div>
      </div>
    </div>
  );
}

FavoriteMonsterCard.propTypes = {
  monster: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    Image: PropTypes.exact({
      imageUrl: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
