import { useState } from "react";
import { baseURL } from "../helpers/baseUrl";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function UploadImageUrl() {
  const { id } = useParams();
  const [imgFile, setImgFile] = useState(null);
  const navigate = useNavigate();

  const handleUpdateImageUrl = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", imgFile);

    try {
      const response = await baseURL.patch(`/monsters/${id}/imgUrl`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      navigate("/home");
      Swal.fire({
        icon: "success",
        title: "New image has been successfully updated",
      });
    } catch (err) {
      console.error(err, "<<< handleUpdateImageUrl");
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `${err.response.data.error}`,
      });
    }
  };

  return (
    <>
      <div className="container mt-4 flex justify-center">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden p-4 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">Upload Image</h2>
          <form
            onSubmit={handleUpdateImageUrl}
            className="flex flex-col items-center"
          >
            <div className="form-group mb-3 w-full">
              <label htmlFor="input-imgFile" className="block mb-2 text-center">
                Upload Image
              </label>
              <input
                type="file"
                id="input-imgFile"
                name="image"
                className="form-control bg-gray-700 text-white rounded p-2 w-full"
                onChange={(e) => setImgFile(e.target.files[0])}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-4"
            >
              Update Image URL
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
