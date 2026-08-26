import { Component } from '@angular/core';
import { PostsService } from './posts.service';
import { DatePipe } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  imports: [DatePipe, RouterOutlet, RouterLink],
  selector: 'app-posts',
  styleUrl: './posts.css',
  templateUrl: './posts.html',
})
export class Posts {

  get posts() {
    return PostsService.posts;
  }
}
