import { Component } from '@angular/core';
import { BlogService } from './blog.service';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-blog',
  styleUrl: './blog.css',
  templateUrl: './blog.html',
})
export class Blog {

  get blogs() {
    return BlogService.blogs;
  }
}
