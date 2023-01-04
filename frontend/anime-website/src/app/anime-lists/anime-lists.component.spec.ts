import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeListsComponent } from './anime-lists.component';

describe('AnimeListsComponent', () => {
  let component: AnimeListsComponent;
  let fixture: ComponentFixture<AnimeListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
