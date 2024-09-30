import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from "../snackbar/snackbar.component";
import { AppConstants } from '../../app.constants';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ FormsModule, RouterOutlet, CommonModule, MatListModule, MatIconModule, MatDividerModule, DatePipe, FilterPipe],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})

export class ContentComponent implements OnInit {
  results = {};
  list : Article[];
  filteredList : Article[] = [];
  isDataLoaded: boolean = false;
  errorDetected: boolean = false;
  searchText: string="";
  joke: string = '';
  topSotiesList: number[];

  iconList: Map<string, string> = new Map([
    ['job', 'rss_feed'],
    ['story', 'article'],
    ['comment', 'chat_bubble_outline'],
    ['poll', 'poll'],
    ['pollopt', 'ballot']
  ]); 

  constructor(private articleService: ArticleService, private snackBar: MatSnackBar, public constants: AppConstants) { 
    this.articleService.actualPageChange.subscribe(value => {
      this.renderList();
    });
  }
  public renderList () {
    this.isDataLoaded=false;
    this.articleService.getTopStories().subscribe({
      next: (data) => {
        this.topSotiesList = data;
        let articleList: Article[] = [];

        let from=(this.articleService.actualPage-1)*10;
        let to=(this.articleService.actualPage-1)*10 + 10 

        for (let x = from ; x < to; x++){
          this.articleService.getArticle(this.topSotiesList[x]).subscribe({
            next: (data) => {
              articleList.push(data);
            },
            complete: () => {
              this.list=articleList;
            }
          })
        }
        this.list=articleList;

      },
      error: (err) => {
        this.errorDetected = true;
        this.isDataLoaded = true;
        console.log(err);
      },
      complete: () => {
        this.isDataLoaded = true;
        this.errorDetected = false;
      }
    });

  }
  
  ngOnInit() {
    this.renderList();
  }

  public onRowClicked(article: Article) {
    try {
      var link = new URL(article.url);
      window.open(link, "_blank");
    } catch (err) {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: this.constants.urlError,
        duration: 2000
      });
    }
  }
}
