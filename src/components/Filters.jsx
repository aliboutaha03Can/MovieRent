import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

export default function Filters({ filters, onFilterChange, onReset, genres }) {
  return (
    <div className="filters-panel">
      <div className="filters-header">
        <SlidersHorizontal size={18} />
        <span>Filtres & Recherche</span>
      </div>

      <div className="search-wrap">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label className="filter-label">Genre</label>
          <select
            value={filters.genre}
            onChange={(e) => onFilterChange("genre", e.target.value)}
            className="filter-select"
          >
            <option value="">Tous les genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Prix max / jour</label>
          <div className="price-input-wrap">
            <input
              type="number"
              placeholder="∞"
              min="0"
              step="0.5"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange("maxPrice", e.target.value)}
              className="filter-input"
            />
            <span className="price-unit">€</span>
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Trier par</label>
          <select
            value={filters.sort}
            onChange={(e) => onFilterChange("sort", e.target.value)}
            className="filter-select"
          >
            <option value="default">Par défaut</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="rating">Meilleure note</option>
            <option value="title">Titre (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="filter-toggles">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={filters.onlyInStock}
            onChange={(e) => onFilterChange("onlyInStock", e.target.checked)}
            className="toggle-checkbox"
          />
          <span className="toggle-custom" />
          Disponibles seulement
        </label>

        <label className="toggle-label">
          <input
            type="checkbox"
            checked={filters.onlyNew}
            onChange={(e) => onFilterChange("onlyNew", e.target.checked)}
            className="toggle-checkbox"
          />
          <span className="toggle-custom" />
          Nouveautés seulement
        </label>
      </div>

      <button className="btn-reset" onClick={onReset}>
        <RotateCcw size={14} />
        Réinitialiser les filtres
      </button>
    </div>
  );
}
