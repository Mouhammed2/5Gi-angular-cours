/**
 * Un produit du panier.
 * `prix` est le prix unitaire, `quantite` le nombre d'exemplaires.
 */
export interface Produit {
  id: number;
  nom: string;
  prix: number;
  quantite: number;
}

/**
 * Panier : contient une liste de produits et les fonctions de calcul.
 */
export class Panier {
  private _produits: Produit[] = [];

  constructor(produits: readonly Produit[] = []) {
    // On copie les produits pour ne pas modifier le tableau reçu.
    this._produits = produits.map((produit) => ({ ...produit }));
  }

  /** La liste des produits (lecture seule). */
  get produits(): readonly Produit[] {
    return this._produits;
  }

  /** Ajoute un produit. Si l'id existe déjà, on augmente seulement la quantité. */
  ajouter(produit: Produit): void {
    const existant = this._produits.find((p) => p.id === produit.id);

    if (existant) {
      existant.quantite += produit.quantite;
    } else {
      this._produits.push({ ...produit });
    }
  }

  /** Diminue la quantité d'un produit de 1 (supprime la ligne si elle tombe à 0). */
  diminuer(id: number): void {
    const produit = this._produits.find((p) => p.id === id);
    if (!produit) {
      return;
    }

    produit.quantite -= 1;
    if (produit.quantite <= 0) {
      this.supprimer(id);
    }
  }

  /** Supprime un produit par son id. */
  supprimer(id: number): void {
    this._produits = this._produits.filter((produit) => produit.id !== id);
  }

  /** Vide le panier. */
  vider(): void {
    this._produits = [];
  }

  /** Somme totale à payer : Σ (prix × quantité). */
  total(): number {
    const somme = this._produits.reduce(
      (total, produit) => total + produit.prix * produit.quantite,
      0,
    );
    return Math.round(somme * 100) / 100; // arrondi à 2 décimales
  }

  /** Nombre total d'articles : Σ quantités. */
  nombreArticles(): number {
    return this._produits.reduce((total, produit) => total + produit.quantite, 0);
  }

  /** Nombre de produits différents (nombre de lignes du panier). */
  nombreProduits(): number {
    return this._produits.length;
  }

  /** Quantité totale d'un produit donné. */
  quantiteDe(id: number): number {
    return this._produits.find((produit) => produit.id === id)?.quantite ?? 0;
  }

  /** Prix moyen par article (0 si le panier est vide). */
  prixMoyen(): number {
    const articles = this.nombreArticles();
    if (articles === 0) {
      return 0;
    }
    return Math.round((this.total() / articles) * 100) / 100;
  }

  /** Le produit le plus cher (prix unitaire), ou undefined si le panier est vide. */
  produitLePlusCher(): Produit | undefined {
    return this._produits.reduce<Produit | undefined>(
      (plusCher, produit) => (!plusCher || produit.prix > plusCher.prix ? produit : plusCher),
      undefined,
    );
  }

  /** Vrai si le panier ne contient aucun produit. */
  estVide(): boolean {
    return this._produits.length === 0;
  }
}
