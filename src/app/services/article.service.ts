import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  
  export class ArticleService {
    
    //public apiURL: string='https://newsserver20240719092101.azurewebsites.net/api/Article/GetLatest?page=';
    public apiURL: string= 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
    public topStoriesURL: string= 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
   //  public topStoriesURL: 'https://icanhazdadjoke.com';
    public actualPage: number=1;
    url = 'https://icanhazdadjoke.com';
    actualPageChange: Subject<number> = new Subject<number>();
    list: Subject<Article[]>= new Subject<Article[]>();

    constructor(private http: HttpClient) {
      this.actualPageChange.subscribe((value) => {
      this.actualPage = value
  });}

  getJoke(): Observable<any> {
    return this.http.get(this.url, { headers: { Accept: 'application/json' } });
  }

  getTopStories() {
    return this.http.get<number[]>(this.topStoriesURL);
  }

  getArticle(id: number) {
    let articleURL= "https://hacker-news.firebaseio.com/v0/item/" + id.toString() + ".json?print=pretty";
    return this.http.get<Article>(articleURL);
  }

getArticles() {
      return this.http.get<Article[]>(this.apiURL+this.actualPage.toString());
    }

    

setPage(page: number) {
  this.actualPageChange.next(page);
}

}
