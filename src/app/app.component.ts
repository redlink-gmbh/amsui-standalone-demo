import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SearchFieldConfig, SearchFieldText, SuggestionParameter} from '@redlink/amsui';
import {catchError, map, timeout} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AMSUI standalone demo';
  searchKeyword = '';
  searchFieldConfig: SearchFieldConfig = {
    asyncSuggestionDataProvider: this.searchSuggestions.bind(this),
  };
  searchFieldText: SearchFieldText = {
    searchButtonText: 'Start search',
    placeholderLabel: 'Search for authors'
  };

  constructor(private readonly translateService: TranslateService, private readonly http: HttpClient) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translateService.setDefaultLang('de');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translateService.use('en');
  }

  handleSearchEvent(searchKeyword: string): void {
    this.searchKeyword = searchKeyword;
    alert('You searched for ' + searchKeyword);
  }

  searchSuggestions(input: SuggestionParameter): Observable<string[]> {
    return this.http
      .get<any>('https://openlibrary.org/search.json?facet=false&_spellcheck_count=0&fields=author_name&mode=everything', {
          params: new HttpParams().set('q', input.keyword).set('limit', String(input.numberOfSuggestions)),
      })
      .pipe(
        timeout(10000),
        catchError(() => {
          return of([]);
        }),
        map((response) => {
          if (response.docs.length > 0) {
            return response.docs.map((doc: any) => doc.author_name && doc.author_name.length > 0 ? doc.author_name[0] : 'No author name available');
          }
        })
      );
  }
}
