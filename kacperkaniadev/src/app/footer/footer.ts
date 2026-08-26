import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  currentYear = new Date().getFullYear();
}
