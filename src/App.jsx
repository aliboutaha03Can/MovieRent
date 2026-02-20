import { useState, useMemo, useEffect, useCallback } from "react";
import { ShoppingCart, Film, Clapperboard } from "lucide-react";
import { movies, genres } from "./data/movies";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import Filters from "./components/Filters";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";
import Notification from "./components/Notification";
import "./App.css";

const DEFAULT_FILTERS = {
  search: "",
  genre: "",
  maxPrice: "",
  onlyInStock: false,
  onlyNew: false,
  sort: "default",
};

function loadCart() {
  try {
    const saved = localStorage.getItem("movierent-cart");
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    // Rehydrate movies from ids
    return parsed
      .map(({ movieId, days }) => {
        const movie = movies.find((m) => m.id === movieId);
        return movie ? { movie, days } : null;
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(
    "movierent-cart",
    JSON.stringify(cart.map(({ movie, days }) => ({ movieId: movie.id, days })))
  );
}

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [cart, setCart] = useState(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const showNotification = useCallback((msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  }, []);

  const filteredMovies = useMemo(() => {
    let list = [...movies];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((m) => m.title.toLowerCase().includes(q));
    }
    if (filters.genre) {
      list = list.filter((m) => m.genre === filters.genre);
    }
    if (filters.maxPrice !== "") {
      list = list.filter((m) => m.pricePerDay <= parseFloat(filters.maxPrice));
    }
    if (filters.onlyInStock) {
      list = list.filter((m) => m.inStock);
    }
    if (filters.onlyNew) {
      list = list.filter((m) => m.isNewRelease);
    }

    switch (filters.sort) {
      case "price-asc":
        list.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case "price-desc":
        list.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "title":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return list;
  }, [filters]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleAddToCart = useCallback(
    (movie) => {
      setCart((prev) => {
        const exists = prev.find((i) => i.movie.id === movie.id);
        if (exists) {
          return prev.map((i) =>
            i.movie.id === movie.id ? { ...i, days: i.days + 1 } : i
          );
        }
        return [...prev, { movie, days: 1 }];
      });
      showNotification(`"${movie.title}" ajouté au panier !`);
      setCartOpen(false);
    },
    [showNotification]
  );

  const handleUpdateDays = useCallback((movieId, days) => {
    if (days <= 0) {
      setCart((prev) => prev.filter((i) => i.movie.id !== movieId));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.movie.id === movieId ? { ...i, days } : i))
      );
    }
  }, []);

  const handleRemoveFromCart = useCallback((movieId) => {
    setCart((prev) => prev.filter((i) => i.movie.id !== movieId));
  }, []);

  const cartInMovieIds = useMemo(() => new Set(cart.map((i) => i.movie.id)), [cart]);

  const cartTotal = useMemo(() => {
    const subtotal = cart.reduce((s, i) => s + i.movie.pricePerDay * i.days, 0);
    const hasLong = cart.some((i) => i.days >= 7);
    const afterDiscount = subtotal - (hasLong ? subtotal * 0.1 : 0);
    const serviceFee = afterDiscount > 10 ? 1.5 : 0;
    return afterDiscount + serviceFee;
  }, [cart]);

  const handleConfirmCheckout = useCallback(() => {
    setCart([]);
    showNotification("Location confirmée ! Bon visionnage 🎬");
  }, [showNotification]);

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <Clapperboard size={28} className="logo-icon" />
            <span className="logo-text">Movie<span className="logo-accent">Rent</span></span>
          </div>

          <div className="header-tagline">Votre cinémathèque en ligne</div>

          <button
            className="cart-trigger"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart size={20} />
            <span>Panier</span>
            {cart.length > 0 && (
              <span className="cart-badge">{cart.length}</span>
            )}
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="main">
        <aside className="sidebar">
          <Filters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={() => setFilters(DEFAULT_FILTERS)}
            genres={genres}
          />
        </aside>

        <section className="catalog">
          <div className="catalog-header">
            <div className="catalog-count">
              <Film size={18} />
              <span>
                {filteredMovies.length} film{filteredMovies.length !== 1 ? "s" : ""} trouvé{filteredMovies.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {filteredMovies.length === 0 ? (
            <div className="empty-state">
              <Film size={72} opacity={0.15} />
              <h3>Aucun film trouvé</h3>
              <p>Essayez de modifier vos critères de recherche ou vos filtres.</p>
              <button className="btn btn-secondary" onClick={() => setFilters(DEFAULT_FILTERS)}>
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="movies-grid">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onAddToCart={handleAddToCart}
                  onViewDetails={setSelectedMovie}
                  inCart={cartInMovieIds.has(movie.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* MODALS */}
      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onAddToCart={handleAddToCart}
          inCart={cartInMovieIds.has(selectedMovie.id)}
        />
      )}

      {cartOpen && (
        <Cart
          cart={cart}
          onUpdateDays={handleUpdateDays}
          onRemove={handleRemoveFromCart}
          onClose={() => setCartOpen(false)}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />
      )}

      {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          total={cartTotal}
          onClose={() => setCheckoutOpen(false)}
          onConfirm={handleConfirmCheckout}
        />
      )}

      <Notification message={notification} />
    </div>
  );
}
