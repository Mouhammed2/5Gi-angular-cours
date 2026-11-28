import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierComponent } from './panier';
import { Panier } from '../models/panier';

describe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;

  const panierInitial = () =>
    new Panier([
      { id: 1, nom: 'Clavier', prix: 50, quantite: 2 },
      { id: 2, nom: 'Souris', prix: 20, quantite: 3 },
      { id: 3, nom: 'Écran', prix: 200, quantite: 1 },
    ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanierComponent);
    fixture.componentRef.setInput('panier', panierInitial());
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the initial total (360 €)', () => {
    expect(component.panier().total()).toBe(360);
  });

  it('should add a product from the form signals', () => {
    component.nouveauNom.set('Casque');
    component.nouveauPrix.set('100');
    component.nouvelleQuantite.set('2');
    component.ajouter();

    expect(component.panier().nombreProduits()).toBe(4);
    expect(component.panier().total()).toBe(560);
  });

  it('should clear the form after adding', () => {
    component.nouveauNom.set('Casque');
    component.nouveauPrix.set('100');
    component.ajouter();

    expect(component.nouveauNom()).toBe('');
    expect(component.nouveauPrix()).toBe('');
    expect(component.nouvelleQuantite()).toBe('1');
  });

  it('should not add a product without a name or price', () => {
    component.nouveauNom.set('  ');
    component.nouveauPrix.set('10');
    component.ajouter();

    expect(component.panier().nombreProduits()).toBe(3);
  });

  it('should give a free id to manually typed products', () => {
    component.nouveauNom.set('Produit maison');
    component.nouveauPrix.set('10');
    component.ajouter();

    const dernier = component.panier().produits.at(-1);
    expect(dernier?.id).toBe(4);
    expect(component.panier().nombreProduits()).toBe(4);
  });

  it('augmenter() should increase the quantity', () => {
    component.augmenter(1);

    expect(component.panier().quantiteDe(1)).toBe(3);
    expect(component.panier().total()).toBe(410);
  });

  it('diminuer() should decrease the quantity', () => {
    component.diminuer(2);

    expect(component.panier().quantiteDe(2)).toBe(2);
    expect(component.panier().total()).toBe(340);
  });

  it('diminuer() should remove the line when quantity reaches 0', () => {
    component.diminuer(3);

    expect(component.panier().nombreProduits()).toBe(2);
    expect(component.panier().quantiteDe(3)).toBe(0);
  });

  it('supprimer() should remove a product', () => {
    component.supprimer(1);

    expect(component.panier().nombreProduits()).toBe(2);
  });

  it('vider() should empty the cart', () => {
    component.vider();

    expect(component.panier().estVide()).toBe(true);
    expect(component.panier().total()).toBe(0);
  });

  it('formatPrix() should format with 2 decimals and the euro sign', () => {
    expect(component.formatPrix(360)).toBe('360.00 €');
    expect(component.formatPrix(0.5)).toBe('0.50 €');
  });

  it('should render the total in the template', async () => {
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('360.00 €');
  });
});
