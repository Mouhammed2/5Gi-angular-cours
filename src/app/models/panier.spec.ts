import { Panier, Produit } from './panier';

describe('Panier', () => {
  const clavier: Produit = { id: 1, nom: 'Clavier', prix: 50, quantite: 2 };
  const souris: Produit = { id: 2, nom: 'Souris', prix: 20, quantite: 3 };
  const ecran: Produit = { id: 3, nom: 'Écran', prix: 200, quantite: 1 };

  let panier: Panier;

  beforeEach(() => {
    panier = new Panier([clavier, souris, ecran]);
  });

  it('should create an empty cart by default', () => {
    const vide = new Panier();

    expect(vide.estVide()).toBe(true);
    expect(vide.total()).toBe(0);
  });

  it('total() should return the sum of price × quantity', () => {
    // 50×2 + 20×3 + 200×1 = 360
    expect(panier.total()).toBe(360);
  });

  it('total() should round to 2 decimals', () => {
    const p = new Panier([{ id: 9, nom: 'Stylo', prix: 0.1, quantite: 3 }]);

    expect(p.total()).toBe(0.3);
  });

  it('nombreArticles() should return the sum of quantities', () => {
    expect(panier.nombreArticles()).toBe(6); // 2 + 3 + 1
  });

  it('nombreProduits() should return the number of distinct products', () => {
    expect(panier.nombreProduits()).toBe(3);
  });

  it('ajouter() should merge quantities when the id already exists', () => {
    panier.ajouter({ id: 1, nom: 'Clavier', prix: 50, quantite: 1 });

    expect(panier.nombreProduits()).toBe(3);
    expect(panier.quantiteDe(1)).toBe(3);
    expect(panier.total()).toBe(410);
  });

  it('ajouter() should add a new product', () => {
    panier.ajouter({ id: 4, nom: 'Casque', prix: 100, quantite: 1 });

    expect(panier.nombreProduits()).toBe(4);
    expect(panier.total()).toBe(460);
  });

  it('diminuer() should decrease the quantity by 1', () => {
    panier.diminuer(1);

    expect(panier.quantiteDe(1)).toBe(1);
    expect(panier.total()).toBe(310);
  });

  it('diminuer() should remove the line when quantity reaches 0', () => {
    panier.diminuer(3);

    expect(panier.nombreProduits()).toBe(2);
    expect(panier.quantiteDe(3)).toBe(0);
  });

  it('supprimer() should remove a product by id', () => {    panier.supprimer(2);

    expect(panier.nombreProduits()).toBe(2);
    expect(panier.quantiteDe(2)).toBe(0);
    expect(panier.total()).toBe(300);
  });

  it('vider() should empty the cart', () => {
    panier.vider();

    expect(panier.estVide()).toBe(true);
    expect(panier.total()).toBe(0);
    expect(panier.nombreArticles()).toBe(0);
  });

  it('prixMoyen() should return total / number of articles', () => {
    expect(panier.prixMoyen()).toBe(60); // 360 / 6
  });

  it('prixMoyen() should return 0 when the cart is empty', () => {
    expect(new Panier().prixMoyen()).toBe(0);
  });

  it('produitLePlusCher() should return the most expensive product', () => {
    expect(panier.produitLePlusCher()?.nom).toBe('Écran');
  });

  it('produitLePlusCher() should return undefined when the cart is empty', () => {
    expect(new Panier().produitLePlusCher()).toBeUndefined();
  });
});
