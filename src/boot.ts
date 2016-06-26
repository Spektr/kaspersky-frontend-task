/**
 * Файл для старта приложения
 * Провайдит глобальные сервисы, так же является точкой входа
 * Импорт Http необязателен, т.к. в данном задании не используется
 */
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';

import {AppComponent} from './app/app.component';

// Функция включения продуктового окружения (убирает консольные ошибки)
// enableProdMode()

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
])
.catch(err => console.error(err));
