import { Star, X, ShoppingCart, Film, Calendar, Tag } from "lucide-react";

const StarRating = ({ rating }) => (
  <div className="star-rating">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={18} className={s <= rating ? "star filled" : "star empty"} />
    ))}
    <span className="rating-num">{rating}/5</span>
  </div>
);

export default function MovieDetail({ movie, onClose, onAddToCart, inCart }) {
  if (!movie) return null;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose}>
          <X size={22} />
        </button>

        <div className="detail-content">
          <div className="detail-poster-col">
            <img
              src={movie.poster}
              alt={movie.title}
              className="detail-poster"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop";
              }}
            />
            {movie.isNewRelease && <div className="detail-badge new">NOUVELLE SORTIE</div>}
          </div>

          <div className="detail-info-col">
            <div className="detail-genre">
              <Tag size={14} />
              {movie.genre}
            </div>
            <h2 className="detail-title">{movie.title}</h2>

            <StarRating rating={movie.rating} />

            <p className="detail-description">{movie.description}</p>

            <div className="detail-stats">
              <div className="stat-item">
                <Film size={18} />
                <div>
                  <div className="stat-label">Genre</div>
                  <div className="stat-value">{movie.genre}</div>
                </div>
              </div>
              <div className="stat-item">
                <Calendar size={18} />
                <div>
                  <div className="stat-label">Tarif</div>
                  <div className="stat-value">{movie.pricePerDay.toFixed(2)} € / jour</div>
                </div>
              </div>
            </div>

            <div className={`detail-stock ${movie.inStock ? "in-stock" : "out-stock"}`}>
              <span className="stock-dot" />
              {movie.inStock ? "Disponible en stock" : "Actuellement indisponible"}
            </div>

            <div className="detail-price-big">
              <span>{movie.pricePerDay.toFixed(2)} €</span>
              <span className="per-day">par jour</span>
            </div>

            <button
              className={`btn btn-primary btn-large ${inCart ? "in-cart" : ""}`}
              onClick={() => onAddToCart(movie)}
              disabled={!movie.inStock}
            >
              <ShoppingCart size={20} />
              {inCart ? "✓ Ajouté au panier" : "Ajouter au panier"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
