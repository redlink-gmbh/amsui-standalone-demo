import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SearchFieldConfig, SearchFieldText, SuggestionParameter} from '@redlink/amsui';
import {delay} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'amsui-standalone-demo';
  searchKeyword = '';
  searchFieldConfig: SearchFieldConfig = {
    asyncSuggestionDataProvider: this.fakeSearchSuggestions.bind(this),
  };
  searchFieldText: SearchFieldText = {
    searchButtonText: 'Start search'
  };

  constructor(private readonly translateService: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translateService.setDefaultLang('de');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translateService.use('en');
  }

  handleSearchEvent(searchKeyword: string): void {
    this.searchKeyword = searchKeyword;
    alert('You searched for ' + searchKeyword);
  }

  fakeSearchSuggestions(input: SuggestionParameter): Observable<string[]> {
    const filteredSuggestions = [
      'Knowledge',
      'Knowledge management',
      'Knowledge officer',
      'My knowledge',
      'Your knowledge',
      'Your knowledge',
      'Natural Language Processing',
      'NLP',
      'Management',
      'Solr',
      'Amsui',
    ]
      .filter((option) =>
        option.toLowerCase().includes(input.keyword.toLowerCase())
      )
      .slice(0, input.numberOfSuggestions);
    return of(filteredSuggestions).pipe(delay(300));
  }
}
