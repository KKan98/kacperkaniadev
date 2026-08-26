import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import  { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
}
