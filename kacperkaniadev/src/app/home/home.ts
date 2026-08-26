import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import  { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Blog } from "../blog/blog";

@Component({
  imports: [FontAwesomeModule, Blog],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
}
