import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/baseUrl";

export default function Detail() {
  const [monster, setMonster] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchMonsterById = async (id) => {
    try {
      const response = await baseURL.get(`/monster/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response.data, "<<< fetchMonsterById");
      setMonster(response.data.data);
    } catch (err) {
      console.log(err, "<<< err fetchMonsterById");
    }
  };

  useEffect(() => {
    if (id) {
      fetchMonsterById(id);
    }
  }, [id]);

  if (!monster) {
    return null;
  }

  const handleUploadImage = (id) => {
    navigate(`/monster/${id}/update-img`);
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/3 flex justify-center items-center p-4">
          <img
            src={monster.Image.imageUrl || "https://via.placeholder.com/150"}
            alt={monster.name}
            className="h-48 w-48 border-4 border-red-600 object-cover"
          />
        </div>

        <div className="md:w-2/3 p-4 flex flex-col">
          {/* New div for monster name */}
          <div className="text-3xl font-bold text-center mb-4">
            {monster.name}
          </div>

          <div className="mb-2">
            <h5 className="text-lg">Type:</h5>
            <p className="text-gray-400">{monster.type}</p>
          </div>

          <div className="mb-2">
            <h5 className="text-lg">Species:</h5>
            <p className="text-gray-400">{monster.species}</p>
          </div>

          <div className="mb-4">
            <h5 className="text-lg">Description:</h5>
            <p className="text-gray-400">{monster.description}</p>
          </div>

          <button
            onClick={() => handleUploadImage(id)}
            className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
}
