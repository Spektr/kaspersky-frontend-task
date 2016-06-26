/**
 * Файл для подключения различных вендоров таких как ангуляр.
 * По уму jQuery и Bootstrap3 должны быть импортированы в этом файле, но в виду разбивки приложения на бандлы (пакеты)
 * с помощью webpack мы имеем разделение контекстов выполнения для разных библиотек. Поэтому придется пробрасывать их
 * с помощью плагинов сборщика или всяких грязных хаков.
 */
import '@angular/platform-browser-dynamic';
import '@angular/platform-browser';
import '@angular/core';
import '@angular/http';
import '@angular/router';
