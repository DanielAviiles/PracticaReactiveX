import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<any> = {
  next: value => console.log('[next]:', value),
  error: error => console.warn('error: ', error),
  complete: () => console.info('completado [obs]')
}

const intervalo$ = new Observable<number>(subs => {
  const intervalID = setInterval(() =>
    subs.next(Math.random()), 1000
  );

  return () => {
    clearInterval(intervalID)
    console.log('Intervalo destruido');
  };
});

const subsject$ = new Subject();
const intervalSubject = intervalo$.subscribe(subsject$);

// const subs1 = intervalo$.subscribe(ramd => console.log('subs1', ramd));
// const subs2 = intervalo$.subscribe(ramd => console.log('subs2', ramd));

const subs1 = subsject$.subscribe(observer);
const subs2 = subsject$.subscribe(observer);

setTimeout(() => {
  subsject$.next(10);
  subsject$.complete();
  intervalSubject.unsubscribe();
}, 3500);