import { Component, model } from '@angular/core';
import { Header } from '../header/header';
import { PanierComponent } from '../panier/panier';
import { Panier } from '../models/panier';

/** En-tête de la page /store : header + panier. */
@Component({
  selector: 'app-store-header',
  imports: [Header, PanierComponent],
  templateUrl: './store-header.html',
  styleUrl: './store-header.css',
})
export class StoreHeader {
  panier = model.required<Panier>();
}
