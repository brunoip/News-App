import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  
  export class ArticleService {
    
    public topStoriesURL: string= 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
    public articleURL: string = 'https://hacker-news.firebaseio.com/v0/item/';
    public actualPage: number=1;
    actualPageChange: Subject<number> = new Subject<number>();
    list: Subject<Article[]>= new Subject<Article[]>();

    constructor(private http: HttpClient) {
      this.actualPageChange.subscribe((value) => {
      this.actualPage = value
  });}

  getTopStories() {
    return this.http.get<number[]>(this.topStoriesURL);
  }

  getArticle(id: number) {
    let storyURL = this.articleURL + id.toString() + ".json?print=pretty";
    return this.http.get<Article>(storyURL);
  }

  setPage(page: number) {
    this.actualPageChange.next(page);
  }

}
