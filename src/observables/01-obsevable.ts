import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
  next: value => console.log('siguiente [next]:', value),
  error: error => console.warn('error [obs]: ', error),
  complete: () => console.info('completado [obs]')
}

const obs$ = new Observable<string>((subscriber) => {
  subscriber.next('Hola');
  subscriber.next('Mundo');

  subscriber.complete();
});

obs$.subscribe(observer);