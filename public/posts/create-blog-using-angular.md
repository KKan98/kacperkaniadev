# Create a blog with Angular

I want to share how to make your own blog from zero to deploying it on GitHub Pages. Why didn't I use any of the blog-ready solutions like WordPress, Blogger, or Medium? It is because I wanted to gain experience creating it from zero and additionally use Angular, in which I will dive deeper to understand the language better and see how different it would be from plain JavaScript.

## IDE

For an IDE, you can choose whatever you feel comfortable with. I am using VS Code.

## Idea

The idea for the code is very simple. I want to have a blog that will be statically hosted on GitHub Pages. This means we need a static SPA (single-page application). There will be no interactions like CRUD posts from the page; everything will be done within the code.

Because it will be a static SPA, I will need an in-memory DB that will hold the data the code can use to figure out what I want when I click certain things.

Posts will be separate **.html** files. This would work and I started with that in mind, but creating new posts/editing would not really be something expanding my knowledge and expierience, but would be a toll to do. That's why I thought of creating this in markdown **(.md)** and parsing it into HTML, then exposing it for the end user. This means that we will need some parser method, but it will make it much easier to work with in the end when everything is setup.

## Code & Reasoning

### Create a starting project

Run:

```bash
ng new <project-name>
```

It will install a project with dependencies that is ready to run on your local machine. Inside the project, you will find the config files (angular.json), project dependencies (package.json), source code (src/), the entry point that bootstraps your app (main.ts), the single HTML page loaded when the app starts (index.html), root components, and routing (app.routes.ts).

Run:

```bash
npm start
```

to see your application. My path was set to **localhost:4200**.

### index.html & App Component

*index.html* in an SPA is your entry HTML point. In Angular, we work with the concept of **components**. This is very important to understand how they work.

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
```

Every component is a subset of directives and is always associated with a template.

`@Component`: a **decorator** that needs to be used to create a component.  
`selector`: a way for this component to be referenced in our HTML templates.  
`templateUrl`: points to the file that needs to be loaded when the component is called.  
`styleUrl`: points to the file where our styles are loaded for the template.  
`export class App`: here is where our component logic lives.

The component you see is a **standalone** component. This is true for Angular versions 15.2+. Before that, you needed to explicitly set `standalone: true`. Standalone means we can use this component by exporting the class and using the selector within other templates. This is an option developers have when creating components. They could also be used as modules, but this is no longer the recommended approach in Angular.

Now, App component is already called within *index.html* file. This is the beginning of our component tree that will be created.

```HTML
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>KacperKaniaDev</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```
Take note that `<app-root>` is within `<body>` element. That is all. No other components will be added here, because we only use **App** component as our entry. The rest is default HTML.

### Header & Footer

I wanted the header and footer to be present on all pages. In Angular, it is very easy to set up: we create two components that represent those elements and add them to the component tree.

Run:
```bash
ng generate component header --skip-tests
```
or shorter:
```bash
ng g c header --skip-tests
```
Angular CLI provides us with those commands to help save some time. They create a basic Angular component with CSS, HTML, and TS files. I am not planning to test the `innerHTML` of the page, so I skip the tests.

Header will be used to navigation, I keep it very basic:
```html
<header>
    <div class="navbar">
      <p>Kacper Kania</p>
      <nav>
        <a [routerLink]="['/']">Home</a>
        <a [routerLink]="['/about']">About</a>
      </nav>
    </div>
  </header>
```

`[routerLink]` will be explained in the next chapter (Routing). The rest is basic HTML code.

A very simple footer:

```html
  <footer>
    <p>© {{ currentYear }} Kacper Kania</p>
  </footer>
```

`{{ currentYear }}` is a way to bind dynamic properties from our `.ts` file to HTML. It is called **text interpolation** and is one of the key features of Angular. In this case, I want to always display the current year and not worry about maintaining it in the future.

```typescript
export class Footer {
  currentYear = new Date().getFullYear();
}
```

Then, to always display them, we need to wrap our main content in `app.html`. Import them into your component's `imports` array and add them to the HTML:
```html
<app-header />
...
<!-- html content -->
...
<app-footer />
```

### Routing

When we created the Angular app using the CLI command, we also got *app.routes.ts*. This file contains the routes our app can use to navigate to other pages. Instead of `href`, we will use Angular's built-in option, which saves us time and memory whenever we navigate to a new page. Instead of making a network request when navigating to a new link, a SPA differs in that the browser only makes a request to the web server for the first page, *index.html*. After that, the client-side router takes over, updating the page content when navigating to a new link instead of triggering a full-page reload.

Within *app.config.ts*, Angular is already configured to handle routing. The only addition there will be `withHashLocation()`. Hosting our app on different URL paths is a common requirement. A hash in the URL works as follows: it appends a hash symbol (`#`) followed by the route path to the base URL. The portion of the URL after the `#` is ignored by web servers, meaning the server always receives a request for the root page. This helps prevent 404 errors on static web hosts.

Let's create a home component. It will be the default page in our application. I want the component to store some basic information about the blog and hold the posts that will be available to read.

*home.ts*:
```typescript
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import  { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Posts } from "../posts/posts";

@Component({
  imports: [FontAwesomeModule, Posts],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
}
```

*home.html*:
```html
<main>
  <article id="panel">
    <h1>Software Development by Kacper Kania</h1>
    <div>
      My journey as a developer. Insights to Web Development. Learn. Create. Share. Repeat.
    </div>
    <div >
      <ul class="social-row">
        <li><a href="https://github.com/KKan98" target="_blank"><fa-icon [icon]="faGithub" /></a></li>
        <li><a href="https://www.linkedin.com/in/kacper-kania-44354518b/" target="_blank"><fa-icon [icon]="faLinkedin" /></a></li>
      </ul>
    </div>
  </article>
  <!-- Component that would display all posts created by me here -->
</main>
```
Now let's register home component, it will be our default page, I want this on `''`.

*app.routes.ts*:
```typescript
export const routes: Routes = [
  {
    path: '',
    component: Home
  },
];
```

Lastly we need to implement `<router-outlet>` within templates. It will take a place in *app.html*, between header and footer components. Logic is as follows: based on the current path described within *app.routes.ts* insert what component's template matches the path.

*app.html*:
```html
<app-header />
<router-outlet></router-outlet>
<app-footer />
```

And that's it. Now we have set up routing, open for extension.

### In-Memory DB & Posts Service

An in-memory DB will be useful in this app. Because I want to deploy it as a static web app, there are no backend interactions, so I have to create my own data and keep it static. This differs from the usual frontend + backend approach, where you normally have a service with CRUD actions.

Now that routing is set up, I want to display the available posts so the user can choose which one to read. This means we need another component that will take control of all the posts we have. Run the generate component command as you have learned already.

As an in-memory DB, we will create our posts. This will be a `static readonly objects array` where each object defines one post. What are the object properties? I decided on the following:

*post.model.ts*:
```typescript
export type PostModel = {
  slug: string,
  title: string,
  summary: string,
  footer: {
    creationDate: Date,
    readingTime: number,
    words: number
  },
  fileName: `${string}.md`
}

```
**slug**: the unique URL part that identifies a page  
**title**: used to display the main topic of the post  
**summary**: a description of the post  
**footer**: contains the data displayed under each post  
**fileName**: where the Markdown for a post is stored

Instead of **fileName**, I could have used a property such as **template** and created the HTML within it. But this would be awful to work with, as I explained in the **Idea** chapter.

Now the decision of where to store this array is up to you. I chose to create a separate service for handling Markdown parsing and retrieving the posts. You could also keep it within *posts.ts*.

*posts.service.ts*:
```typescript
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
}
```
Usually services in Angular require you to add the `@Service` or `Injectable({ providedIn: 'root' })` decorator so they can be injected into your components. This is not the case here because we are working with a static array and all methods will direct to it. That means the methods also need to be static. A static property means the data belongs to the class itself, not an instance of the class. That is why access to the posts is possible only after importing the class into your component, you do not need dependency injection because there will be no instance of `posts`. If it was only static, it would be initialized at runtime because we may still modify the array. `Readonly` ensures it is initialized at compile time and that the posts are not open to modification.

Now that `PostsService` and *posts.ts* are created, we can import the service into the components and display all posts within them:

*posts.html*:
```typescript
@for (post of posts; track post.slug) {
  <article class="blog-post">
    <h1>{{ post.title }}</h1>
    <div class="post-summarize">
      {{ post.summary }}
    </div>
    <section class="post-footer">
      <span>{{ post.footer.creationDate | date:'mediumDate'}} · {{ post.footer.readingTime }} min · {{ post.footer.words }} words</span> 
    </section>
  </article>
}
```
*posts.ts*:
```typescript
import { Component } from '@angular/core';
import { PostsService } from './posts.service';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-posts',
  styleUrl: './posts.css',
  templateUrl: './posts.html',
})
export class Posts {

  get posts() {
    return PostsService.posts;
  }
}
```

This will create an `<article>` for each `post` in `posts`. Pipe the `creationDate` so it is more readable. Then import and insert the posts component into the home component, and that is it. The only thing missing now is Markdown!

### Markdown

Let's dive deeper into how the Markdown will work. The idea is as follows: I have a `posts` array in which I keep the data that points to each Markdown file. I need to reach that Markdown file and connect it to a post. Then the Markdown file will need to be parsed into HTML and loaded into the content of a page. When navigating to the page, we should get params  the file, and when component initializes we fetch, parse and display. So how do we do this?

Markdown files will be kept in public/posts path. Extension is `.md`. No magic here, we just create the content of a page within far easier language to navigate than HTML.

How do we reach that file? In the `posts` array, we keep `fileName`, and we enforce that the extension ends with `.md` (using a template literal in `PostModel`). Let's use `[routerLink]` to navigate to the post. We need to create an anchor and place it under `</section>`:
```html
  <a class="entry-link" [aria-label]="post.title" [routerLink]="['posts', post.slug]"></a>
```

Import `RouterLink` in *posts.ts*.

I now need a `post-details` component that will load the parsed Markdown as `innerHTML`. Create the component within the posts folder. We will use the `:slug` param.

Register the route in *app.routes.ts*:
```typescript
  {
    path: 'posts/:slug',
    component: PostDetails
  },
```
It takes `post.slug` value and navigates to `posts/:slug`. Because `:slug` is a param, we can inject `ActivatedRoute` class (provided by Angular) and get an information about a route associated with the component. We are interested in `:slug` param. Then we use the param to find the post we want to parse and then parse it. The result HTML will be replacing current `innerHTML` property.

To parse the Markdown file, we will use the [marked](https://www.npmjs.com/package/marked) library. Create a method within *posts.service* to load the Markdown content and run it when the *post-details* component initializes. I use the `OnInit` interface so the class must implement `ngOnInit()`. This is a lifecycle hook that runs when the component is initialized. The final versions will look as follows:

*posts.service.ts*:
```typescript
import { PostModel } from "./post.model";
import { marked } from 'marked';

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
```

*post-details*:
```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
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
    const post = PostsService.getPost(this.slug());
    this.html.set(await PostsService.loadMarkdownContent('posts/' + post?.fileName))
  }
}
```
In *post-details.ts*, I used signals, but they are not required.

*post-details.html*:
```html
<article class="markdown-content" [innerHTML]="html()"></article>
```
I utilize property binding by wrapping `innerHTML` with brackets (`[]`).

That's it.

Now everytime we click on a post within `posts` that are displayed on a home page, we will be redirected to `posts/:slug` and corresponding markdown file will be fetched, parsed and placed within *post-details.html*.

### Deploying on Github Pages
### Summary
