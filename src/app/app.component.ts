import { Component, OnInit } from '@angular/core';
import { FaceSnap } from './models/face-snap.model';
import { interval, map, Observable, filter, tap, mergeMap, take, delay, switchMap, exhaustMap, concatMap, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // interval$!: Observable<string>;

  // ngOnInit() {
  //   this.interval$ = interval(1000).pipe(
  //     filter(value => value % 3 === 0),
  //     map(value => value % 2 === 0 ?
  //         `Je suis ${value} et je suis pair`:
  //         `Je suis ${value} et je suis impair`
  //     ),
  //     tap(text => this.logger(text))
  //   );
  // }

  // logger(text: string) {
  //   console.log(`log: ${text}`);
  // }
  redTrainsCalled = 0;
  yellowTrainsCalled = 0;

  ngOnInit() {
    // interval(500).pipe(
    //   take(10),
    //   map(value => value % 2 === 0 ? 'rouge' : 'jaune'),
    //   tap(color => console.log(`La lumière s'allume en %c${color}`, `color: ${this.translateColor(color)}`)),
    //   mergeMap(color => this.getTrainObservable$(color)),
    //   tap(train => console.log(`Train %c${train.color} ${train.trainIndex} arrivé !`, `font-weight: bold; color: ${this.translateColor(train.color)}`))
    // ).subscribe();
  }

  getTrainObservable$(color: 'rouge' | 'jaune') {
    const isRedTrain = color === 'rouge';
    isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
    const trainIndex = isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled;
    console.log(`Train %c${color} ${trainIndex} appelé !`, `text-decoration: underline; color: ${this.translateColor(color)}`);
    return of({ color, trainIndex }).pipe(
      delay(isRedTrain ? 5000 : 6000)
    );
  }

  translateColor(color: 'rouge' | 'jaune') {
    return color === 'rouge' ? 'red' : 'yellow';
  }
}
