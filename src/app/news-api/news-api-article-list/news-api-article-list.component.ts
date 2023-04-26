import { Component } from '@angular/core';
import { NewsApiService, Article } from '../news-api.service';

@Component({
  selector: 'app-news-api-article-list',
  templateUrl: './news-api-article-list.component.html',
  styleUrls: ['./news-api-article-list.component.css']
})
export class NewsApiArticleListComponent {

  articles: Article[] = [];

  constructor(private newsApiService: NewsApiService) {
    this.newsApiService.pagesOutput.subscribe((articles) => {
      this.articles = articles;
    });

    this.newsApiService.getPage(1);
  }

}
