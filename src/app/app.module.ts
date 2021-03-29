import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {IModuleTranslationOptions, ModuleTranslateLoader} from '@larscom/ngx-translate-module-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {SearchFieldModule} from '@redlink/amsui';

export function moduleHttpLoaderFactory(http: HttpClient): ModuleTranslateLoader {
  const baseTranslateUrl = './assets/i18n';

  const options: IModuleTranslationOptions = {
    modules: [
      { baseTranslateUrl: baseTranslateUrl + '/amsui' },
      { baseTranslateUrl },
    ],
  };

  return new ModuleTranslateLoader(http, options);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: moduleHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SearchFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
