import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteMonsterCard from "../components/FavCard";
import { baseURL } from "../helpers/baseUrl";

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login");
        return;
      }

      const response = await baseURL.get("/favorites", {
        params: { userId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log("Fetched favorites:", response.data.data);
      setFavorites(response.data.data);
    } catch (err) {
      console.log(err, "<<< err fetchFavorites");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <>
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
          FAVORITE MONSTER
        </h2>

        <div className="grid grid-cols-4 gap-8 mb-8">
          {favorites.length > 0 ? (
            favorites.map((monster) => (
              <div key={monster.Monster.id}>
                <FavoriteMonsterCard monster={monster.Monster} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-white">
              No favorite monsters added yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
