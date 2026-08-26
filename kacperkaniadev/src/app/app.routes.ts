import { Routes } from '@angular/router';
import { About } from './about/about';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'about',
    component: About
  },
  {
    path: '**',
    component: NotFound
  }
];
