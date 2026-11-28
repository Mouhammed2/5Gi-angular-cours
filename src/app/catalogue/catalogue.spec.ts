import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Catalogue } from './catalogue';
import { Produit } from '../models/panier';

describe('Catalogue', () => {
  let component: Catalogue;
  let fixture: ComponentFixture<Catalogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catalogue],
    }).compileComponents();

    fixture = TestBed.createComponent(Catalogue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 6 articles', () => {
    expect(component.articles().length).toBe(6);
  });

  it('ajouter() should emit the product with quantity 1', () => {
    let recu: Produit | undefined;
    component.ajouterAuPanier.subscribe((produit) => (recu = produit));

    component.ajouter({ id: 4, nom: 'Casque', prix: 100, emoji: '🎧' });

    expect(recu).toEqual({ id: 4, nom: 'Casque', prix: 100, quantite: 1 });
  });

  it('should render a button per article', () => {
    const boutons = fixture.nativeElement.querySelectorAll('.carte button');

    expect(boutons.length).toBe(6);
  });

  it('formatPrix() should format with 2 decimals and the euro sign', () => {
    expect(component.formatPrix(200)).toBe('200.00 €');
  });
});
