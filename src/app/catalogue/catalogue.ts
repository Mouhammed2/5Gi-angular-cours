import { Component, output, signal } from '@angular/core';
import { Produit } from '../models/panier';

export interface ArticleCatalogue extends Omit<Produit, 'quantite'> {
  emoji: string;
}

@Component({
  selector: 'app-catalogue',
  imports: [],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css',
})
export class Catalogue {
  // Liste des produits disponibles à l'achat.
  articles = signal<ArticleCatalogue[]>([
    { id: 1, nom: 'Clavier', prix: 50, emoji: '⌨️' },
    { id: 2, nom: 'Souris', prix: 20, emoji: '🖱️' },
    { id: 3, nom: 'Écran', prix: 200, emoji: '🖥️' },
    { id: 4, nom: 'Casque', prix: 100, emoji: '🎧' },
    { id: 5, nom: 'Webcam', prix: 45, emoji: '📷' },
    { id: 6, nom: 'Clé USB', prix: 15, emoji: '💾' },
  ]);

  // Événement envoyé au parent (le panier) quand on clique sur "Ajouter".
  ajouterAuPanier = output<Produit>();

  ajouter(article: ArticleCatalogue) {
    this.ajouterAuPanier.emit({
      id: article.id,
      nom: article.nom,
      prix: article.prix,
      quantite: 1,
    });
  }

  formatPrix(valeur: number): string {
    return valeur.toFixed(2) + ' €';
  }
}
