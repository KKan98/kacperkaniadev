import { Service } from "@angular/core";
import { PostModel } from "./post.model";
import { marked } from 'marked'

@Service()
export class PostsService {
  static readonly posts: PostModel[] = [
    {
      slug: 'initial-blog',
      title: 'Initial Blog Post',
      summary: 'I figure out how to make easily reausable blog template using angular...',
      footer: {
        creationDate: new Date("2026-08-26"),
        readingTime: 25,
        words: 152
      },
      fileName: 'initial-blog.md'
    }
  ]

  static getPost(slug: string) {
    return this.posts.find(post => post.slug === slug);
  }

  static async loadMarkdownContent(path: string) {
    const response = await fetch(path);

    if(!response.ok) throw new Error('Failed to load: ' + path);

    const markdown = await response.text();

    return await marked.parse(markdown);
  }
}
