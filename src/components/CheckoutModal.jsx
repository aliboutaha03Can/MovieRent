import { useState } from "react";
import { X, CheckCircle } from "lucide-react";

export default function CheckoutModal({ cart, total, onClose, onConfirm }) {
  const [form, setForm] = useState({ name: "", email: "", card: "" });
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setConfirmed(true);
    setTimeout(() => {
      onConfirm();
      onClose();
    }, 2500);
  };

  if (confirmed) {
    return (
      <div className="checkout-overlay" onClick={onClose}>
        <div className="checkout-modal success" onClick={(e) => e.stopPropagation()}>
          <CheckCircle size={64} color="#22c55e" />
          <h2>Location confirmée !</h2>
          <p>Merci {form.name}, votre location a été enregistrée avec succès.</p>
          <p className="success-total">Total facturé : {total.toFixed(2)} €</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cart-close" onClick={onClose}>
          <X size={20} />
        </button>
        <h2 className="checkout-title">Confirmer la location</h2>

        <div className="checkout-summary">
          <h3>Récapitulatif ({cart.length} film{cart.length > 1 ? "s" : ""})</h3>
          {cart.map(({ movie, days }) => (
            <div key={movie.id} className="checkout-item">
              <span>{movie.title}</span>
              <span>{days} j × {movie.pricePerDay.toFixed(2)} € = {(days * movie.pricePerDay).toFixed(2)} €</span>
            </div>
          ))}
          <div className="checkout-total">Total : {total.toFixed(2)} €</div>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom complet *</label>
            <input
              type="text"
              placeholder="Jean Dupont"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              placeholder="jean@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Numéro de carte</label>
            <input
              type="text"
              placeholder="**** **** **** ****"
              value={form.card}
              onChange={(e) => setForm({ ...form, card: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-large">
            Valider la location — {total.toFixed(2)} €
          </button>
        </form>
      </div>
    </div>
  );
}
