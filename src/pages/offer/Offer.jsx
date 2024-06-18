import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./offer.css";

const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-leboncoincoin--nksmjkmnbqhd.code.run/offers/${id}`
          // `http://localhost:3000/offers/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchProduct();
  }, [id]);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="offer-container">
      {console.log(data)}
      <div className="offer-images">
        {data.product_image && Array.isArray(data.product_image) ? (
          data.product_image.map((image, index) => (
            <img key={index} src={image} alt={data.product_name} />
          ))
        ) : (
          <img src={data.product_image} alt={data.product_name} />
        )}
      </div>

      <div>
        <h1>{data.product_name}</h1>
        <p>{data.product_description}</p>
        <span>{data.product_price} €</span>
      </div>
    </div>
  );
};

export default Product;
