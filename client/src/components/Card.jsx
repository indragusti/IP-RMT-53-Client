import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/baseUrl";
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: "success",
        title: "Monster added to favorites",
      });
    } catch (err) {
      console.log(err, "<<< err handleAddToFavorite");
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `${err.response.data.error}`,
      });
    }
  };

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
            onClick={() => handleDetail(monster.id)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Detail
          </button>
          <button
            onClick={() => handleAddToFavorite(monster.id)}
            className={`text-white px-3 py-1 rounded transition ${
              isFavorite
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isFavorite ? "Added to favorite" : "Add to Favorite"}
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
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};
