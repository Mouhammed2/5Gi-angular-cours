import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Store } from './store';
import { PanierComponent } from '../panier/panier';

describe('Store', () => {
  let component: Store;
  let fixture: ComponentFixture<Store>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Store],
    }).compileComponents();

    fixture = TestBed.createComponent(Store);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header, panier, aside, catalogue and footer', () => {
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('app-header')).toBeTruthy();
    expect(el.querySelector('app-panier')).toBeTruthy();
    expect(el.querySelector('app-aside')).toBeTruthy();
    expect(el.querySelector('app-catalogue')).toBeTruthy();
    expect(el.querySelector('app-footer')).toBeTruthy();
  });

  it('should start with a 360 € cart', () => {
    expect(component.panier().total()).toBe(360);
  });

  it('ajouterProduit() should merge with an existing cart line', () => {
    component.ajouterProduit({ id: 1, nom: 'Clavier', prix: 50, quantite: 1 });

    expect(component.panier().nombreProduits()).toBe(3);
    expect(component.panier().quantiteDe(1)).toBe(3);
    expect(component.panier().total()).toBe(410);
  });

  it('ajouterProduit() should add a product coming from the catalogue', () => {
    component.ajouterProduit({ id: 6, nom: 'Clé USB', prix: 15, quantite: 1 });

    expect(component.panier().nombreProduits()).toBe(4);
    expect(component.panier().total()).toBe(375);
  });

  it('should propagate changes made in the child panier (two-way binding)', () => {
    const panierDebug = fixture.debugElement.query(By.directive(PanierComponent));
    const panierComponent = panierDebug.componentInstance as PanierComponent;

    panierComponent.vider();

    expect(component.panier().estVide()).toBe(true);
  });
});
