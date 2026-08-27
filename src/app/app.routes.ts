import { Routes } from '@angular/router';
import { About } from './about/about';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';
import { PostDetails } from './posts/post-details/post-details';

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
    path: 'posts/:slug',
    component: PostDetails
  },
  {
    path: '**',
    component: NotFound
  }
];
