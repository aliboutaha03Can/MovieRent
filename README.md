# MovieRent — Boutique de Location de Films
Une application React complète simulant une boutique de location de films en ligne, avec un design cinématographique sombre et élégant.
<img width="3840" height="1955" alt="image" src="https://github.com/user-attachments/assets/6de9b629-fcbc-47f3-bb10-872346995873" />






# Aperçu
MovieRent est une application moderne permettant aux utilisateurs de :
- Parcourir un catalogue de 22 films
- Consulter les détails complets d'un film
<img width="3840" height="1955" alt="image" src="https://github.com/user-attachments/assets/dce53496-ccff-434b-b98b-ae9cd46c61d7" />

- Rechercher et filtrer les films selon plusieurs critères
  <img width="767" height="1692" alt="image" src="https://github.com/user-attachments/assets/24550bea-b496-4e04-b5b5-f5b5e5876c7c" />

- Gérer un panier de location avec quantité en jours
  <img width="3839" height="1959" alt="image" src="https://github.com/user-attachments/assets/7ac640f1-1410-4d2b-b804-c1e12bb9f133" />
- Bénéficier de réductions et calculer automatiquement les totaux

# Installation & Lancement
## Prérequis
- Node.js 18+
- npm 
## Étapes
```bash
# 1. Installer les dépendances
npm install
# 2. Lancer en développement
npm run dev
# 3. Ouvrir dans le navigateur
# http://localhost:5173
```
## Structure du projet
```
movierent/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx 
    ├── App.css 
    ├── data/
    │   └── movies.js
    └── components/
        ├── MovieCard.jsx     
        ├── MovieDetail.jsx   
        ├── Filters.jsx       
        ├── Cart.jsx          
        ├── CheckoutModal.jsx 
        └── Notification.jsx  
```

---
# Fonctionnalités implémentées

# Obligatoires
 Fonctionnalité | Status |

- Catalogue de films (22 films, cartes) 
- Affiche, titre, prix, genre, disponibilité, note
- Bouton "Voir détails" 
- Bouton "Ajouter au panier" (désactivé si indisponible)
- Détail film (modal) avec toutes infos 
- Recherche insensible à la casse 
- Filtre disponible seulement 
- Filtre nouveautés seulement 
- Filtre par genre 
- Filtre par prix maximum
- Tri (prix ↑↓, note, alphabétique)
- États vides avec message 
- Panier avec gestion des jours
- Augmenter/diminuer les jours 
- Suppression auto si jours = 0
- Retirer un film du panier 
- Calcul du total (2 décimales)
- Persistance localStorage 
- Notification temporaire 

# Bonus implémentés
 Fonctionnalité | Status |
- Bouton réinitialiser les filtres 
- Réduction 10% pour location ≥ 7 jours 
- Frais de service (1.50€) si total > 10€ 
- Formulaire de confirmation de location 
- Optimisation avec `useMemo` 

---

# Choix techniques

- **Framework** : React 18 avec Vite
- **Langage** : JavaScript ES6+
- **État** : `useState`, `useMemo`, `useCallback`
- **Persistance** : `localStorage` (panier sauvegardé entre les sessions)
- **Icônes** : Lucide React
- **Fonts** : Playfair Display (titres), DM Sans (texte)
- **Aucune librairie externe de state management**
- **Aucune API externe** — données 100% locales

---

# Données films

Le fichier `src/data/movies.js` contient **22 films**, chacun avec :
- `id`, `title`, `pricePerDay`, `genre`, `inStock`
- `rating` (1-5), `isNewRelease`, `description`, `poster`

Les affiches sont chargées depuis Unsplash (URLs libres de droits).

---

#  Auteur

Projet MovieRent fait par : Ali Boutaha - 2741927
