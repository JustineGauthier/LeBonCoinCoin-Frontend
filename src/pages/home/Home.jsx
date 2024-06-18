import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-leboncoincoin--nksmjkmnbqhd.code.run/offers"
          // "http://localhost:3000/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <main>
      <div className="article-container">
        {data.map((offer) => {
          return (
            <Link to={`/offers/${offer._id}`} key={offer._id}>
              <article>
                <div>
                  {offer.owner.account.avatar && (
                    <img
                      src={offer.owner.account.avatar.secure_url}
                      alt="user avatar"
                    />
                  )}

                  <h3>{offer.owner.account.username}</h3>
                </div>
                <img src={offer.product_image[0]} alt="offer image" />
                <div>
                  <p>{offer.product_price} €</p>
                  <p>{offer.product_details[1].TAILLE}</p>
                  <p>{offer.product_details[0].MARQUE}</p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
