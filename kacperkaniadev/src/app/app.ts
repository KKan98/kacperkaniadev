import { Component } from '@angular/core';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { RouterOutlet } from '@angular/router';
import { Home } from "./home/home";

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
