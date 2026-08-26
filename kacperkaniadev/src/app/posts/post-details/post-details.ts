import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
  imports: [],
  selector: 'app-post-details',
  styleUrl: './post-details.css',
  templateUrl: './post-details.html',
})
export class PostDetails implements OnInit {
  readonly slug = signal<string>('');
  readonly html = signal<string>('');
  private route = inject(ActivatedRoute);

  async ngOnInit() {
    this.slug.set(this.route.snapshot.paramMap.get('slug') || '');

    console.log(this.slug());

    const post = PostsService.getPost(this.slug());
    console.log(post);

    this.html.set(await PostsService.loadMarkdownContent('/posts/' + post?.fileName))
    console.log(this.html());
  }
}
