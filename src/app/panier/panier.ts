import { Component, computed, signal } from '@angular/core';
import { Panier, Produit } from '../models/panier';
import { Catalogue } from '../catalogue/catalogue';

@Component({
  selector: 'app-panier',
  imports: [Catalogue],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class PanierComponent {
  // Le panier courant. On remplace la valeur du signal à chaque modification
  // pour que l'interface se mette à jour automatiquement.
  panier = signal(
    new Panier([
      { id: 1, nom: 'Clavier', prix: 50, quantite: 2 },
      { id: 2, nom: 'Souris', prix: 20, quantite: 3 },
      { id: 3, nom: 'Écran', prix: 200, quantite: 1 },
    ]),
  );

  // Champs du formulaire d'ajout (signaux liés aux inputs).
  nouveauNom = signal('');
  nouveauPrix = signal('');
  nouvelleQuantite = signal('1');

  // Le bouton "Ajouter" n'est actif que si le nom et le prix sont valides.
  peutAjouter = computed(
    () => this.nouveauNom().trim() !== '' && Number(this.nouveauPrix()) > 0,
  );

  /** Appelé quand on clique sur "Ajouter au panier" dans le catalogue. */
  ajouterProduit(produit: Produit) {
    this.modifier((panier) => panier.ajouter({ ...produit, quantite: 1 }));
  }

  ajouter() {
    if (!this.peutAjouter()) {
      return;
    }

    const produit: Produit = {
      id: this.prochainId(),
      nom: this.nouveauNom().trim(),
      prix: Number(this.nouveauPrix()),
      quantite: Math.max(1, Math.floor(Number(this.nouvelleQuantite()) || 1)),
    };

    this.modifier((panier) => panier.ajouter(produit));

    this.nouveauNom.set('');
    this.nouveauPrix.set('');
    this.nouvelleQuantite.set('1');
  }

  augmenter(id: number) {
    this.modifier((panier) => {
      const produit = panier.produits.find((p) => p.id === id);
      if (produit) {
        panier.ajouter({ ...produit, quantite: 1 });
      }
    });
  }

  diminuer(id: number) {
    this.modifier((panier) => panier.diminuer(id));
  }

  supprimer(id: number) {
    this.modifier((panier) => panier.supprimer(id));
  }

  vider() {
    this.modifier((panier) => panier.vider());
  }

  formatPrix(valeur: number): string {
    return valeur.toFixed(2) + ' €';
  }

  /** Id libre pour un produit saisi à la main (évite les collisions avec le catalogue). */
  private prochainId(): number {
    return Math.max(0, ...this.panier().produits.map((p) => p.id)) + 1;
  }

  /** Applique une action sur une copie du panier puis met à jour le signal. */
  private modifier(action: (panier: Panier) => void) {
    const copie = new Panier(this.panier().produits);
    action(copie);
    this.panier.set(copie);
  }
}
