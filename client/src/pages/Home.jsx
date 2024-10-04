import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/baseUrl";
import MonsterCard from "../components/Card";

export default function Home() {
  const [monsters, setMonsters] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("name");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchMonsters = async () => {
    try {
      const response = await baseURL.get("/monsters", {
        params: {
          "page[number]": page,
          "page[size]": 12,
          q: search || undefined,
          sort: sort || undefined,
          "filter[species]": speciesFilter || undefined,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      console.log(response.data.data, "<<< fetchMonsters");
      setMonsters(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.log(err, "<<< err fetchMonsters");
      localStorage.removeItem("access_token");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchMonsters();
  }, [search, page, sort, speciesFilter]);

  return (
    <>
      <div className="container mx-auto mt-4">
        <div className="mb-4">
          <button
            onClick={() => navigate("/favorites")}
            className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700 transition"
          >
            See your favorite monsters
          </button>
        </div>
        <h2 className="text-4xl font-bold mb-8 text-white bg-gray-800 p-4 text-center border-b-4 border-red-600 bg-opacity-90 rounded">
          MONSTER LIST
        </h2>

        {/* Search, Filter, Sort */}
        <div className="flex justify-center space-x-20 mb-10">
          <input
            className="form-control bg-gray-700 text-white border border-gray-600 rounded p-2 w-1/4"
            type="search"
            placeholder="Search Monster"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
            className="form-control bg-gray-700 text-white border border-gray-600 rounded p-2 w-1/4"
          >
            <option value="">All Species</option>
            <option value="bird wyvern">Bird Wyvern</option>
            <option value="brute wyvern">Brute Wyvern</option>
            <option value="elder dragon">Elder Dragon</option>
            <option value="fanged beast">Fanged Beast</option>
            <option value="fanged wyvern">Fanged Wyvern</option>
            <option value="fish">Fish</option>
            <option value="flying wyvern">Flying Wyvern</option>
            <option value="herbivore">Herbivore</option>
            <option value="neopteron">Neopteron</option>
            <option value="piscine wyvern">Piscine Wyvern</option>
            <option value="relict">Relict</option>
            <option value="wingdrake">Wingdrake</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="form-control bg-gray-700 text-white border border-gray-600 rounded p-2 w-1/4"
          >
            <option value="name">Sort by Name (A-Z)</option>
            <option value="-name">Sort by Name (Z-A)</option>
          </select>
        </div>

        {/* Monster Card */}
        <div className="grid grid-cols-4 gap-8 mb-8">
          {monsters.map((monster) => (
            <div key={monster.id}>
              <MonsterCard
                monster={{
                  id: monster.id,
                  name: monster.name,
                  imageUrl: monster.imageUrl,
                }}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mb-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500 transition mr-2"
          >
            Previous
          </button>
          <span className="text-white">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500 transition ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
