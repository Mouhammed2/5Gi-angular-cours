import { Component, signal } from '@angular/core';
import { StoreHeader } from '../store-header/store-header';
import { StoreBody } from '../store-body/store-body';
import { Footer } from '../footer/footer';
import { Panier, Produit } from '../models/panier';

/**
 * Page /store découpée en 3 composants :
 * - header (contient le panier)
 * - body   (aside vide à gauche, catalogue à droite)
 * - footer
 */
@Component({
  selector: 'app-store',
  imports: [StoreHeader, StoreBody, Footer],
  templateUrl: './store.html',
  styleUrl: './store.css',
})
export class Store {
  // Le Store est la source de vérité : il possède le panier.
  panier = signal(
    new Panier([
      { id: 1, nom: 'Clavier', prix: 50, quantite: 2 },
      { id: 2, nom: 'Souris', prix: 20, quantite: 3 },
      { id: 3, nom: 'Écran', prix: 200, quantite: 1 },
    ]),
  );

  /** Appelé par le catalogue quand on clique sur "Ajouter au panier". */
  ajouterProduit(produit: Produit) {
    const copie = new Panier(this.panier().produits);
    copie.ajouter({ ...produit, quantite: 1 });
    this.panier.set(copie);
  }
}
