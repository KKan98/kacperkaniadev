import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header implements OnInit{
  baseHref = signal<"/kacperkaniadev" | "">('');

  ngOnInit(): void {
    this.baseHref.set(location.hostname === "kkan98.github.io" ? "/kacperkaniadev" : "");

    console.log(this.baseHref(), 'hi');
  }

}
