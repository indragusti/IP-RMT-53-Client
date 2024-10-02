import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/baseUrl";
import MonsterCard from "../components/Card";

export default function Home() {
  const [monsters, setMonsters] = useState([]);
  const navigate = useNavigate();

  const fetchMonsters = async () => {
    try {
      const response = await baseURL.get("/monster", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      console.log(response.data.data, "<<< fetchMonsters");
      setMonsters(response.data.data);
    } catch (err) {
      console.log(err, "<<< err fetchMonsters");
      localStorage.removeItem("access_token");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchMonsters();
  }, []);

  // const [favoriteMonsters, setFavoriteMonsters] = useState([]);

  // const fetchFavorites = async () => {
  //   try {
  //     const token = localStorage.getItem("access_token");
  //     const response = await baseURL.get("/favorites", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setFavoriteMonsters(response.data.map((favorite) => favorite.monsterId));
  //   } catch (err) {
  //     console.error("Failed to fetch favorites:", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchMonsters();
  //   fetchFavorites();
  // }, []);

  return (
    <>
      <div className="container mx-auto mt-4">
        <div className="mb-4">
          <button
            onClick={() => navigate("/favorites")}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition"
          >
            See your favorite monsters
          </button>
        </div>
        <h2 className="text-4xl font-bold mb-8 text-white bg-gray-800 p-4 text-center border-b-4 border-red-600 bg-opacity-90 rounded">
          MONSTER LIST
        </h2>

        <div className="grid grid-cols-4 gap-8 mb-8">
          {monsters.map((e) => {
            console.log(e.Image.imageUrl, "<<< imageUrl");
            return (
              <div key={e.id}>
                <MonsterCard
                  monster={{
                    id: e.id,
                    name: e.name,
                    Image: {
                      imageUrl: e.Image.imageUrl,
                    },
                    // isFavorite: favoriteMonsters.includes(e.id),
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
