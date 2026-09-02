# Create a blog with Angular

I want to share how to make your own blog from zero to deploying it on github pages. Why didn't I use any of the blog-ready solutions like WordPress, Blogger or Medium? It is because I wanted to gain an expierience of creating it from zero and additionaly use Angular, in which I will be diving deeper to understand the language better and see how much different it would be from plain JavaScript.

## IDE

For IDE you can choose whatever IDE you fill comfortable with. I am using VS Code.

## Idea

So the idea for the code is very simple. I want to have a blog that will be staticly hosted on Github Pages. This means we need to have static SPA (single page application). No interactions like CRUD posts from the page, everything will be done within the code.

Because it will be a static SPA, I will need a in memory DB, that will hold data, where the code will be able to figure out, what do I want when I click certain things.

Posts will be separate **.html** files. This would work and I started with that in mind, but creating new posts/editing would not really be something expanding my knowledge and expierience, but be a toll to do. That's why I thought of creating this in markdown **(.md)** and parsing it into HTML, then exposing it for the end user. This means that we will need some parser method, but it will make it much easier to work with in the end when everything is setup.

## Code & Reasoning 

### Create starting project

Run 

```bash
ng new <project-name>
```

it will install a project with dependencies, that is ready to be run on your local machine. Inside the project you will find config files (angular.json), project dependencies (package.json), source code (src/), entry point that bootstraps your app (main.ts), single HTML page loaded when app starts (index.html), root components, and routing (app.routes.ts).

Run

```bash
npm start
```

to see your application. My path was set to **localhost, port: 4200**.

### index.html & App Component

*index.html* in SPA will be your entry HTML point. In Angular we work with concept of **components**. This is very important to understand how they work. 

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
```

Every component is a subset of directives, always associated with a template. 

`@Component`: is a **Decorator** that needs to be used to create a component.  
`selector`: is a way for this component to be called out in our HTML templates.  
`templateUrl`: points to a file that needs to be loaded when the component is called.  
`styleUrl`: points to a file where our styles are loaded for the template.  
`export class App`: here our logic lives for the component.

The component you see is a **standalone** component. This is true for Angular versions 15.2+. Before you needed to explicitly set `standalone: true`. Standalone means that we can use this component by just exporting the class and using the selector within other templates. This is an option developers have when they create components, that they could also be use as modules, but this is no longer recommended approach by Angular.

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

I wanted header and footer to be present on all pages. In Angular it is very easy to set up, we create two components that will represent those elements and we add them to the component tree.

Run
```bash
ng generate component header --skip-tests
```
or shorter
```bash
ng g c header --skip-tests
```
Angular CLI provides us with those commands to help us save some time. They will create basic Angular component with css, HTML and ts files. I am not planning to test the innerHTML of the page so 
I skip the tests.

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

`[routerLink]` will be explained in the next chapter (Routing). Rest is basic HTML code.

Very simple footer:

```html
  <footer>
    <p>© {{ currentYear }} Kacper Kania</p>
  </footer>
```

`{{ currentYear }}` is a way to bind dynamically properties from our .ts file to HTML. It is called **text interpolation** and is one of key features of Angular. In this case I want to always display current year and don't worry about maintaining this in the future.

```typescript
export class Footer {
  currentYear = new Date().getFullYear();
}
```

Then, to always display them, we need to have them wrapping our main content of `app.html`. Import them within your components imports array and add them to the html:
```html
<app-header />
...
<!-- html content -->
...
<app-footer />
```

### Routing

When we created angular app using the CLI command, we also got the *app.routes.ts*. This file consists of routes that our app can use to redirect to other pages. Instead of `href` we will use Angular build in option, that will save us time and memory whenever we try to got to a new page. Instead of making a network request when navigating to a new link, SPA differs in that the browser only makes a request to a web server for the first page, *index.html*. After that client-side router takes over, updating the page content when navigating to a new link instead of triggering a full-page reload.

Within *app.config.ts* angular configured already the way the routing will work. The only addition there will be `withHashLocation()`. Hosting our app will take different url paths. Hash within url works as follows: it appends a hash symbol (`#`) followed by route path to the base URL. The portion of the URL after the `#` is ignored by the web servers, meaning the server always receive a request for the root page. It helps preventing 404 errors on static web hosts.

Let's create home component, it will be a default pathway in our application. I want the component to store some basic info about what is this blog about and hold my posts that would be available to read.

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

### In Memory DB & Posts Service

In memory db will find a use in this app. Because I want to deploy it as a static web app, there is no backend interactions, so I have to make my own data and keep it static. This differs from usual frontend + backend approach, where you normally have a service with CRUD actions.

Now, when routing is set up, I want to display available posts from which the user can choose. This means we need another component, that will take control over all posts we have. Run the command as you have learned already.

Now as a in-memory db we will create our posts. This will be a `static readonly objects array` where each object will define one post. What are the object properties? I decided on as follows: 

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
  fileName: string
}

```
**slug**: unique url part that identifies a page
**title**: will use it to display main topic of post
**summary**: description of a post
**footer**: contains of data that will be displayed under each post
**fileName**: where the markdown for a post is stored

Instead of **fileName** I could have use a for example **template** property and create HTML within this. But this would be awful to work with as I explained in the **Idea** chapter.

Now the decision where to store this array is up to you. I chose to create a separate service for handling markdown parsing and retrieving said posts. You could also keep it within the *posts.ts*.

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
Usually services in Angular will require you to add `@Service` or `Injectable({providedIn: 'root'})` decorator, so they can be injected to your components. This is not a case here, because we work with static array and all methods will direct this. It means that the methods will need to be static as well. Static means arrays data belongs to the class itself, not an instance of a class. That's why access to the posts is only after importing the class within your component, you don't need dependency injection, because there will be no instance of `posts`. If it would only be static it would be initialized at runtime, because we still may modife the array. `Readonly` makes it initialized at compile-time and `posts` are not open to modifications.

Now with created `PostsService` and *posts.ts*, we can import the service to the components and display all posts within in: 

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
    <a class="entry-link" [aria-label]="post.title" [routerLink]="['posts', post.slug]"></a>
  </article>
}
```

This will create the `<article>` for each `post` within `posts`. Pipe the `creationDate` so it is more readable. Then import and insert the posts component within home component and that's it. The only thing missing now is markdown!
### Markdown
### Deploying on Github Pages
### Summary
