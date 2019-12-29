import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderFuelPage } from './order-fuel.page';

describe('OrderFuelPage', () => {
  let component: OrderFuelPage;
  let fixture: ComponentFixture<OrderFuelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFuelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFuelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
