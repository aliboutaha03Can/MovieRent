import { Star, ShoppingCart, Eye, Zap } from "lucide-react";

const StarRating = ({ rating }) => (
  <div className="star-rating">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={14}
        className={s <= rating ? "star filled" : "star empty"}
      />
    ))}
  </div>
);

export default function MovieCard({ movie, onAddToCart, onViewDetails, inCart }) {
  return (
    <div className="movie-card">
      <div className="card-poster-wrap">
        <img
          src={movie.poster}
          alt={movie.title}
          className="card-poster"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop";
          }}
        />
        <div className="card-overlay">
          {movie.isNewRelease && <span className="badge new">NOUVEAU</span>}
          {!movie.inStock && <span className="badge unavailable">INDISPONIBLE</span>}
        </div>
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span className="genre-tag">{movie.genre}</span>
          <StarRating rating={movie.rating} />
        </div>

        <h3 className="card-title">{movie.title}</h3>

        <div className="card-price">
          <span className="price-amount">{movie.pricePerDay.toFixed(2)} €</span>
          <span className="price-label">/ jour</span>
        </div>

        <div className={`stock-status ${movie.inStock ? "in-stock" : "out-stock"}`}>
          <span className="stock-dot" />
          {movie.inStock ? "Disponible" : "Non disponible"}
        </div>

        <div className="card-actions">
          <button
            className="btn btn-secondary"
            onClick={() => onViewDetails(movie)}
          >
            <Eye size={15} />
            Détails
          </button>
          <button
            className={`btn btn-primary ${inCart ? "in-cart" : ""}`}
            onClick={() => onAddToCart(movie)}
            disabled={!movie.inStock}
          >
            {inCart ? <Zap size={15} /> : <ShoppingCart size={15} />}
            {inCart ? "Ajouté" : "Louer"}
          </button>
        </div>
      </div>
    </div>
  );
}
