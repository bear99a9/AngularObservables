import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count =>{
    //   console.log(count);
    // })

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 3) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3'));

        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.pipe(map(
      (currentCount: number) => {
        return 'Round: ' + (currentCount + 1);
      }
    )).subscribe({
      next: (currentCount: number) => {
        console.log(currentCount)
      },
      error: (error: any) => {
        console.log(error);
        alert(error.message);
      },
      complete: () => {
        alert('Observable has completed');
        console.log('Completed');
      }
    });
  }

  ngOnDestroy(): void {

    this.firstObsSubscription.unsubscribe();
  }
}
