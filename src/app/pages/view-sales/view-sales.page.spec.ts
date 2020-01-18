import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewSalesPage } from './view-sales.page';

describe('ViewSalesPage', () => {
  let component: ViewSalesPage;
  let fixture: ComponentFixture<ViewSalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSalesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
