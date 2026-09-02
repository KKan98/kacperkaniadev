import { PostModel } from "./post.model";
import { marked } from 'marked';
import hljs from 'highlight.js/lib/common';

const CONTROL_KEYWORDS = new Set([
  'import', 'export', 'from', 'as', 'default', 'return', 'if', 'else', 'for', 'while',
  'do', 'switch', 'case', 'break', 'continue', 'throw', 'try', 'catch', 'finally',
  'new', 'await', 'async', 'yield', 'delete', 'in', 'of'
]);

function markControlKeywords(html: string) {
  return html.replace(
    /<span class="hljs-keyword">([a-z]+)<\/span>/g,
    (match, keyword: string) =>
      CONTROL_KEYWORDS.has(keyword)
        ? `<span class="hljs-keyword control_">${keyword}</span>`
        : match
  );
}

function markClassProperties(html: string) {
  return html.replace(
    /^(\s+)([A-Za-z_$][\w$]*)(?=\s*[:=][^=])/gm,
    (_match, indent: string, name: string) =>
      `${indent}<span class="hljs-property">${name}</span>`
  );
}

marked.use({
  renderer: {
    code({ text, lang }) {
      const language = lang?.split(/\s+/)[0];
      const highlighted = language && hljs.getLanguage(language)
        ? hljs.highlight(text, { language }).value
        : hljs.highlightAuto(text).value;

      const languageClass = language ? ` language-${language}` : '';
      const decorated = markClassProperties(markControlKeywords(highlighted));
      return `<pre><code class="hljs${languageClass}">${decorated}</code></pre>`;
    }
  }
});

export class PostsService {
  static readonly posts: PostModel[] = [
    {
      slug: 'create-blog-using-angular',
      title: 'Create a blog using Angular',
      summary: 'How to create a blog using angular and deploy it with Github Pages',
      footer: {
        creationDate: new Date("2026-08-30"),
        readingTime: 25,
        words: 152
      },
      fileName: 'create-blog-using-angular.md'
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
