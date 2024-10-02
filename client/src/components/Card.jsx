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
          // src={
          //   monster.Image.imageUrl ||
          //   "https://via.placeholder.com/150"
          // }
          src={
            monster.Image.imageUrl.split("/revision/")[0] ||
            "https://via.placeholder.com/150"
          }
          alt={monster.name}
          className="h-40 w-40"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col items-center">
        <h5 className="text-xl font-bold text-center">{monster.name}</h5>
        <div className="flex justify-center mt-2 gap-4">
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
            {isFavorite ? "This is your favorite monster!" : "Add to Favorite"}
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
