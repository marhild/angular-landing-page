import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsApiArticleListComponent } from './news-api-article-list.component';

describe('NewsApiArticleListComponent', () => {
  let component: NewsApiArticleListComponent;
  let fixture: ComponentFixture<NewsApiArticleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsApiArticleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsApiArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
