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
  const navigate = useNavigate();

  const fetchMonsters = async () => {
    try {
      const response = await baseURL.get("/monster", {
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
            className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition"
          >
            See your favorite monsters
          </button>
        </div>
        <h2 className="text-4xl font-bold mb-8 text-white bg-gray-800 p-4 text-center border-b-4 border-red-600 bg-opacity-90 rounded">
          MONSTER LIST
        </h2>

        {/* Search */}
        <div className="col-lg-3 col-md-4 mb-3">
          <input
            className="form-control"
            type="search"
            placeholder="Search Monster"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter by Species */}
        <div className="mb-4">
          <select
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
            className="form-control"
          >
            <option value="">All Species</option>
            <option value="bird wyvern">bird wyvern</option>
            <option value="brute wyvern">brute wyvern</option>
            <option value="elder dragon">elder dragon</option>
            <option value="fanged beast">fanged beast</option>
            <option value="fanged wyvern">fanged wyvern</option>
            <option value="fish">fish</option>
            <option value="flying wyvern">flying wyvern</option>
            <option value="herbivore">herbivore</option>
            <option value="neopteron">neopteron</option>
            <option value="piscine wyvern">piscine wyvern</option>
            <option value="relict">relict</option>
            <option value="wingdrake">wingdrake</option>
          </select>
        </div>

        {/* Sort */}
        <div className="mb-4">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="form-control"
          >
            <option value="name">Sort by Name (A-Z)</option>
            <option value="-name">Sort by Name (Z-A)</option>
          </select>
        </div>

        <div className="grid grid-cols-4 gap-8 mb-8">
          {monsters.map((e) => (
            <div key={e.id}>
              <MonsterCard
                monster={{
                  id: e.id,
                  name: e.name,
                  imageUrl: e.imageUrl,
                }}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
