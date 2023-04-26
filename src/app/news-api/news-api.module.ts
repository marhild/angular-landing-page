import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsApiArticleListComponent } from './news-api-article-list/news-api-article-list.component';
import { TrimOutletNamePipe } from './trim-outlet-name.pipe';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NewsApiArticleListComponent,
    TrimOutletNamePipe
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NewsApiArticleListComponent
  ]
})
export class NewsApiModule { }
