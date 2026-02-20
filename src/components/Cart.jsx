import { ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react";

const SERVICE_FEE = 1.5;

export default function Cart({ cart, onUpdateDays, onRemove, onClose, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.movie.pricePerDay * item.days, 0);
  
  // Long duration discount: 10% off if any item >= 7 days
  const hasLongRental = cart.some((item) => item.days >= 7);
  const discount = hasLongRental ? subtotal * 0.1 : 0;
  
  // Service fee if total > 10€
  const afterDiscount = subtotal - discount;
  const serviceFee = afterDiscount > 10 ? SERVICE_FEE : 0;
  const total = afterDiscount + serviceFee;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingCart size={22} />
            <span>Mon Panier</span>
            <span className="cart-count">{cart.length}</span>
          </div>
          <button className="cart-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart size={60} opacity={0.2} />
              <p>Votre panier est vide</p>
              <span>Ajoutez des films pour commencer</span>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map(({ movie, days }) => {
                const itemTotal = movie.pricePerDay * days;
                const itemDiscount = days >= 7;
                return (
                  <div key={movie.id} className="cart-item">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="cart-item-poster"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=60&h=90&fit=crop";
                      }}
                    />
                    <div className="cart-item-info">
                      <div className="cart-item-title">{movie.title}</div>
                      <div className="cart-item-price">{movie.pricePerDay.toFixed(2)} € / jour</div>
                      {itemDiscount && (
                        <div className="cart-item-discount">🎉 -10% fidélité appliquée</div>
                      )}
                    </div>
                    <div className="cart-item-controls">
                      <div className="days-control">
                        <button
                          className="days-btn"
                          onClick={() => onUpdateDays(movie.id, days - 1)}
                        >
                          <Minus size={13} />
                        </button>
                        <span className="days-value">{days}j</span>
                        <button
                          className="days-btn"
                          onClick={() => onUpdateDays(movie.id, days + 1)}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <div className="cart-item-total">{itemTotal.toFixed(2)} €</div>
                      <button
                        className="cart-remove"
                        onClick={() => onRemove(movie.id)}
                        title="Retirer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Réduction longue durée (10%)</span>
                  <span>-{discount.toFixed(2)} €</span>
                </div>
              )}
              {serviceFee > 0 && (
                <div className="summary-row">
                  <span>Frais de service</span>
                  <span>{serviceFee.toFixed(2)} €</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>
            <button className="btn btn-primary btn-large btn-checkout" onClick={onCheckout}>
              Confirmer la location
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
