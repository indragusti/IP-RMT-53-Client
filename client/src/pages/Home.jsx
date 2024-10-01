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

      console.log(response.data, "<<< fetchMonsters");
      setMonsters(response.data.data);
    } catch (err) {
      // localStorage.removeItem("access_token");
      // navigate("/login");
      console.log(err, "<<< err fetchMonsters");
    }
  };

  useEffect(() => {
    fetchMonsters();
  }, []);

  return (
    <>
      <div className="container mt-4">
        {/* <div className="mb-4">
          <button
            onClick={() => navigate("/favorites")}
            className="btn btn-primary me-2"
          >
            See your favorite monsters
          </button>
        </div> */}
        <h2 className="mb-4">Monster List</h2>

        <div className="d-flex flex-wrap justify-content-between">
          {monsters.map((e) => (
            <MonsterCard
              key={e.id}
              monster={{
                id: e.id,
                name: e.name,
                Image: e.Image.imageUrl,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
