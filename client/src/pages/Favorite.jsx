import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteMonsterCard from "../components/FavCard";
import { baseURL } from "../helpers/baseUrl";

// ini redux
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../features/userFavSlice";
//

export default function FavoritePage() {
  // start redux ==============================================================
  const favorites = useSelector((store) => store.favorite.favorites);
  const dispatch = useDispatch();
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

      const fetchedFavorites = response.data.data;
      console.log("Fetched Favorites:", fetchedFavorites);

      console.log(response.data.data, "<<< fetchFavorites");
      dispatch(setFavorites(response.data.data));
    } catch (err) {
      console.log(err, "<<< err fetchFavorites");
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchFavorites();
  }, []);

  // start original =============================================================
  // const [favorites, setFavorites] = useState([]);
  // const navigate = useNavigate();

  // const fetchFavorites = async () => {
  //   try {
  //     const userId = localStorage.getItem("userId");
  //     if (!userId) {
  //       navigate("/login");
  //       return;
  //     }

  //     const response = await baseURL.get("/favorites", {
  //       params: { userId },
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //       },
  //     });
  //     console.log(response.data.data, "<<< fetchFavorites");
  //     setFavorites(response.data.data);
  //   } catch (err) {
  //     console.log(err, "<<< err fetchFavorites");
  //     navigate("/login");
  //   }
  // };

  // useEffect(() => {
  //   fetchFavorites();
  // }, []);
  // end original =============================================================

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
              <div key={monster.id}>
                <FavoriteMonsterCard monster={monster} />
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
