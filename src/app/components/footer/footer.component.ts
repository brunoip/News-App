import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit 
{
  actualPage: number = 1;
  pages: number[] = [1,2,3,4,5];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.updatePages();
  }

  public updatePages() {
    this.pages=[];
    this.actualPage=this.articleService.actualPage;

    if(this.actualPage<=2){
      for (let i = 1; i <= 5; i++)
        this.pages.push(i);
    }
    else{
      if(this.actualPage>17){
        for (let i = 16; i <= 20; i++)
          this.pages.push(i);
      }
      else{
        for (let i = this.actualPage-2; i < this.actualPage+3; i++)
          this.pages.push(i);
      }
    }
  }

  public selectPage(page: number) {
    this.articleService.setPage(page);
    this.updatePages();
    this.scrollToTop();
  }

  public scrollToTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 16);
  }
}
