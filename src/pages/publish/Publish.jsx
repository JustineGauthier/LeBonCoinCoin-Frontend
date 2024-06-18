import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./publish.css";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      //   formData.append("picture", picture);

      for (let i = 0; i < picture.length; i++) {
        formData.append("picture", picture[i]);
      }
      const response = await axios.post(
        "https://site--backend-leboncoincoin--nksmjkmnbqhd.code.run/offers/publish",
        // "http://localhost:3000/offers/publish",
        formData,
        {
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   console.log(response.data);
      navigate(`/offers/${response.data._id}`);
    } catch (error) {
      console.log(error.response);
    }
  };

  return token ? (
    <main>
      <h1>Ajouter un article</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(event) => {
            setPicture(event.target.files);
          }}
          multiple
        />
        <input
          type="text"
          value={title}
          placeholder="Titre"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <textarea
          value={description}
          placeholder="Description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></textarea>
        <input
          type="text"
          value={price}
          placeholder="Prix"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <input
          type="text"
          value={condition}
          placeholder="Condition"
          onChange={(event) => {
            setCondition(event.target.value);
          }}
        />
        <input
          type="text"
          value={city}
          placeholder="Ville"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <input
          type="text"
          value={brand}
          placeholder="Marque"
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <input
          type="text"
          value={size}
          placeholder="Taille"
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <input
          type="text"
          value={color}
          placeholder="Couleur"
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />

        <button>Ajouter</button>
      </form>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
