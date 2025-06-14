import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosListComponent } from './resultados-list.component';

describe('ResultadosListComponent', () => {
  let component: ResultadosListComponent;
  let fixture: ComponentFixture<ResultadosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
