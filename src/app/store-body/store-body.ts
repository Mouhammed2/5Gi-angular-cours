import { Component, output } from '@angular/core';
import { Aside } from '../aside/aside';
import { Catalogue } from '../catalogue/catalogue';
import { Produit } from '../models/panier';

/** Corps de la page /store : aside vide à gauche, catalogue à droite. */
@Component({
  selector: 'app-store-body',
  imports: [Aside, Catalogue],
  templateUrl: './store-body.html',
  styleUrl: './store-body.css',
})
export class StoreBody {
  ajouterAuPanier = output<Produit>();
}
