import { Service } from "@angular/core";
import { BlogModel } from "./blog.model";

@Service()
export class BlogService {
  static readonly blogs: BlogModel[] = [
    {
      slug: 'first-blog-post',
      title: 'First Blog Post',
      summary: 'I figure out how to make easily reausable blog template using angular...',
      footer: {
        creationDate: new Date("2026-08-26"),
        readingTime: 25,
        words: 152
      },
      fileName: 'first-blog-post.md'
    }
  ]
}
