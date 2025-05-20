import { useState, useEffect } from "react";
import "./CitatApp.css";

const CitatApp = () => {
  const [citat, setCitat] = useState({ text: "", author: "" });
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchNewCitat = async () => {
    try {
      const response = await fetch("https://thequoteshub.com/api/");
      const data = await response.json();
      setCitat({
        text: data.text,
        author: data.author,
      });
    } catch (error) {
      console.error("Fel vid hämtning av citat:", error);
    }
  };

  const addToFavorite = () => {
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.text === citat.text && fav.author === citat.author
    );
    if (!isAlreadyFavorite) {
      setFavorites([...favorites, citat]);
    }
  };

  const removeFromFavorite = (index) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    fetchNewCitat();
  }, []);

  return (
    <div className="container">
      <div className="citat-app">
        <h1>Dagens Citat</h1>

        <div className="citat">
          <i className="bx bxs-quote-alt-left left-quote"></i>
          <p className="citat-text">{citat.text}</p>
          <i className="bx bxs-quote-alt-right right-quote"></i>
          <p className="citat-author">– {citat.author}</p>
        </div>

        <div className="buttons">
          <button className="btn btn-new" onClick={fetchNewCitat}>
            Nytt citat
          </button>
          <button className="btn btn-fav" onClick={addToFavorite}>
            Lägg till favorit
          </button>
          <button
            className="btn btn-show"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            {showFavorites ? "Dölj favoriter" : "Visa favoriter"}
          </button>
        </div>

        {showFavorites && (
          <div className="favorites">
            <h2>Favoritcitat</h2>
            {favorites.length === 0 ? (
              <p>Inga favoriter ännu.</p>
            ) : (
              <ul>
                {favorites.map((fav, index) => (
                  <li key={index}>
                    “{fav.text}” – {fav.author}
                    <button
                      className="btn-remove"
                      onClick={() => removeFromFavorite(index)}
                    >
                      Ta bort
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="circles">
          <div className="circle-1"></div>
          <div className="circle-2"></div>
          <div className="circle-3"></div>
          <div className="circle-4"></div>
        </div>
      </div>
    </div>
  );
};

export default CitatApp;
