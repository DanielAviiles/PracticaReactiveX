import { Observable, Observer, Subscriber } from 'rxjs';

const observer: Observer<any> = {
  next: value => console.log('[next]:', value),
  error: error => console.warn('error: ', error),
  complete: () => console.info('completado [obs]')
}

const intervalo$ = new Observable<number>(subs => {
  // Crear contador
  let contador = 0;

  const interval = setInterval(() => {
    contador++;
    subs.next(contador);
    console.log(contador);
  }, 1000);

  setTimeout(() => {
    subs.complete();
  }, 2500);

  return () => {
    clearInterval(interval);
    console.log('Intervalo destruido');
  }
});

const susbs1 = intervalo$.subscribe(observer);
const susbs2 = intervalo$.subscribe(observer);
const susbs3 = intervalo$.subscribe(observer);

susbs1.add(susbs2).add(susbs3);

setTimeout(() => {
  susbs1.unsubscribe();
  // susbs2.unsubscribe();
  // susbs3.unsubscribe();

  console.log('Completado timeout');
}, 6000);