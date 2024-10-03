import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/baseUrl";

export default function Detail() {
  const [monster, setMonster] = useState(null);
  const [aiDescription, setAiDescription] = useState("");
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

  const fetchAiDescription = async (monsterName) => {
    console.log({ monsterName }, "<<< kirim ke /gemini");
    try {
      const response = await baseURL.post(
        "/gemini",
        {
          monsterName: monsterName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data, "<<< AI description");
      setAiDescription(response.data.description);
    } catch (err) {
      console.log(
        err.response ? err.response.data : err.message,
        "<<< err fetchAiDescription"
      );
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
    <div className="container mx-auto mt-10 p-4 w-3/4">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden bg-opacity-80">
        {/* monster name */}
        <div className="text-3xl font-bold text-center mb-4">
          {monster.name}
        </div>

        <div className="flex flex-col md:flex-row">
          {/* monster image */}
          <div className="md:w-1/3 flex justify-center items-center p-4">
            <img
              src={monster.imageUrl || "https://via.placeholder.com/150"}
              alt={monster.name}
              className="h-auto w-full object-cover"
            />
          </div>

          {/* monster detail */}
          <div className="md:w-2/3 p-4 flex flex-col">
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

            <div className="mb-4">
              <h5 className="text-lg">AI Generated Description:</h5>
              <p className="text-gray-400">
                {aiDescription || "No new description generated yet."}
              </p>
            </div>

            {/* button */}
            <div className="mt-4 flex flex-col space-y-2">
              <button
                onClick={() => fetchAiDescription(monster.name)}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded"
              >
                Get New Description
              </button>

              <button
                onClick={() => handleUploadImage(id)}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Upload Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
