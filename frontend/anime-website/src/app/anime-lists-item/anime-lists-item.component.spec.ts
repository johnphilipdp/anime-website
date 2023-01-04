import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeListsItemComponent } from './anime-lists-item.component';

describe('AnimeListsItemComponent', () => {
  let component: AnimeListsItemComponent;
  let fixture: ComponentFixture<AnimeListsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeListsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeListsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
