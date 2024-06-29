import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  showBackButton = false;

  constructor(
    private router: Router,
  ){}

  ngOnInit(): void {
    // TODO: Question: Est-ce que c'est pertinent ?
      this.router.events.subscribe(event => {
        if(event instanceof NavigationEnd){
          this.showBackButton =  event.urlAfterRedirects !== '/';
        }
      })
  }
  onBackClick(){
    this.router.navigateByUrl('')
  }
}
