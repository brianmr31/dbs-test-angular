import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Message } from './Message';
import { Position } from './Position';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  MAX_PAGE: number = 1;
  order:string = "";

  constructor( private http: HttpClient ) { 

  }

  getCurrentPosition(): Observable<any> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation is not available in this browser.');
      }
    });
  }

  postPosition( position: Position ): Observable<any> {
    console.log( position );
    return this.http.post<Position>("http://localhost:8080/position/", position);
  }

  getMessage(): Observable<Message> {
    return this.http.get<Message>("http://localhost:8080/hello");
  }

  getEmployee( sortby: string, orderby: any, page: number ): Observable<any> {
    this.order = "NONE";
    if( orderby % 3 == 0 ){
      this.order = "ASC";
    } else if( orderby % 3 == 1){
      this.order = "DESC";
    } else {
      this.order = "NONE";
    }
    return this.http.get<any>("http://localhost:8080/employees/"+page+"/"+this.MAX_PAGE+"/"+sortby+"/"+this.order);
  }
}
