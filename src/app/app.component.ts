import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}

  isActivated: boolean = false;

  private activatedSub: Subscription;

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe({
      next: (bool: boolean) => {
        this.isActivated = bool;
      },
      error: () => {

      },
      complete: () => {

      }
      
    })
  }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }
}
