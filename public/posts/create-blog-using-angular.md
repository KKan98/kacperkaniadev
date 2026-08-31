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
### In Memory DB & Posts Service
### Markdown
### Deploying on Github Pages
### Summary
