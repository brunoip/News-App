import { TestBed } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApiService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
        imports: [HttpClientModule] 
    });
    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setPage() should change selected page', () => {
    const newPage = 5;
    service.setPage(5);
    expect(service.actualPage).toBe(newPage);
  });

});