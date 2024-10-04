import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/baseUrl";
import Swal from "sweetalert2";

export default function FavoriteMonsterCard({ monster }) {
  const [isRemoved, setIsRemoved] = useState(false);
  const navigate = useNavigate();

  console.log("Monster data:", monster);

  const handleRemoveFromFavorite = async (monsterId) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await baseURL.delete(`/favorites/${monsterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response from remove:", response);

      setIsRemoved(true);

      Swal.fire({
        icon: "success",
        title: "Monster removed from favorites",
      });
    } catch (err) {
      console.error("Failed to remove from favorites:", err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `${err.response.data.error}`,
      });
    }
  };

  if (isRemoved) {
    return null;
  }

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full w-full bg-opacity-80">
      <div className="grid place-items-center mt-4">
        <img
          src={monster.imageUrl || "https://via.placeholder.com/150"}
          alt={monster.name}
          className="h-40 w-40"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col items-center">
        <h5 className="text-xl font-bold text-center">{monster.name}</h5>
        <div className="flex justify-center mt-2 gap-4">
          <button
            onClick={() => navigate(`/monster/${monster.monsterId}`)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Detail
          </button>
          <button
            onClick={() => handleRemoveFromFavorite(monster.monsterId)}
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
    userId: PropTypes.number.isRequired,
    monsterId: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};
