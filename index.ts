import { Observable, interval,range } from 'rxjs';
import { ajax, AjaxResponse, AjaxRequest, AjaxError } from 'rxjs/ajax';
const apiKey = 'e6f38b0049fc0177522baf2baa00026f';
const URL =
  'https://api.openweathermap.org/data/2.5/weather?APPID=' +
  apiKey +
  '&units=metric&q=';
var city = 'Pisa';
const request: AjaxRequest = {
  url: URL + city,
  crossDomain: true,
};
//const temp: Observable<AjaxResponse<any>> = ajax(request);
const numbers = range(0,4);

const obs: Observable<any> = new Observable((subscriber) =>
  interval(10000).subscribe({
    next: () => {
        ajax(request).subscribe({
          next: (res: AjaxResponse<any>) =>
            subscriber.next(res.response.main.temp), 
          error: (err: AjaxError) => console.error('Error: ', err.response),
          complete: () =>{subscriber.unsubscribe()}
        }) }}));
      
obs.subscribe({ // Primo subscriber
  next: (x) => numbers.subscribe({next: ()=> console.log(x),
    error: (err: AjaxError) => console.error('Error: ', err.response),
    complete: ()=> console.log('Fine console')
      }),
  })
obs.subscribe({ // Secondo subscriber
  next: (x) => numbers.subscribe({next: ()=> 
    (document.getElementById('output').innerHTML += x + '<br>'),
    error: (err: AjaxError) => console.error('Error: ', err.response),
    complete: ()=> document.getElementById('output').innerHTML += 'Fine' + '<br>'

  })
});
  
  
