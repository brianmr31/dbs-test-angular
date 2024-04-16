import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'


import { EmployeService } from './employe.service';
import { EmployeDto } from './EmployeDto';

@Component({
    selector: 'list-employe',
    standalone: true,
    imports: [ CommonModule ],
    template: `
    <div class="row"> 
      <table class="table">
        <thead > 
          <tr >
            <th *ngFor="let column of columns; let x = index" scope="col" 
              (click)="sort( columnsName[x] )" >
              {{column}} 
              <i *ngIf="columnsName[x] !== '' && columnsCurr == columnsName[x] " 
                [ngClass]="{'bi bi-arrow-up-short': orderby % 3 == 0,'bi bi-arrow-down-short': orderby % 3 == 1,'bi bi-arrows-vertical': orderby % 3 == 2}" ></i>
              <i *ngIf="columnsName[x] !== '' && columnsCurr != columnsName[x] " class="bi bi-arrows-vertical" ></i>
            </th>
          </tr>
        </thead> 
        <tbody *ngFor="let list of lists; let i = index" >
          <tr >
            <td [ngClass]="{'bg-light' : i%2 == 0}">{{i+1}}</td>
            <td [ngClass]="{'bg-light' : i%2 == 0}">{{list.name}}</td>
            <td [ngClass]="{'bg-light' : i%2 == 0}">{{list.dob}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div >
      <nav aria-label="Page navigation">
        <ul class="pagination  justify-content-center">
          <li class="page-item" *ngFor="let pagging of paggings;" >
            <a class="page-link" (click)="setPagging(pagging)">
               {{ pagging + 1 }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
    `
  })
export class ListEmployeComponent implements OnInit {

  MAX_PAGE_SHOW: number = 3;

  page: number = 0;
  paggings: any = [];

  columns: string[] = ["No","Name", "DOB"];
  columnsName: string[] = ["","name", "dob"];

  columnsCurr: string = "name";
  orderby: any = 3;

  name: string = "";

  initdata: any = 0;	
  lists: EmployeDto[] = [];

  constructor( private employeService: EmployeService) {

  }

  setPagging(page: number ){
    this.page = page;

    this.employeService.getEmployee( this.name, this.orderby, this.page).subscribe(( data ) => {
      this.lists = data.content;

      this.currentPagging(data.first, data.last, data.totalPages, data.number);
    });
  }

  currentPagging(isFirst: boolean, isLast: boolean, totalPage: number, currentPage: number): void {
    var tmp = currentPage - this.MAX_PAGE_SHOW;
    var loop = 0;
    while ( loop < this.MAX_PAGE_SHOW ) {
      if( tmp > 0 && tmp < currentPage ){
        this.paggings[tmp] = tmp;
        tmp += 1;
      }
      loop +=1;
    }

    tmp = currentPage;
    loop = 0;
    while ( loop < this.MAX_PAGE_SHOW ) { 
      if( tmp < totalPage ){
        this.paggings[tmp] = tmp;
      }
      tmp += 1;
      loop +=1;
    }

    console.log( this.paggings );
  }

  ngOnInit(): void {
    this.page = 0;
    this.name = this.columnsName[1];
    this.employeService.getEmployee("name", 2, this.page).subscribe(( data ) => {
        this.lists = data.content;

        this.currentPagging(data.first, data.last, data.totalPages, data.number);
    });
  }

  sort( sortby: string) {
    this.name = sortby;
    this.columnsCurr = sortby;
    
    if( this.orderby == 3 ){
      this.orderby = 0;
    }
    this.orderby += 1;
    console.log( this.orderby );

    this.employeService.getEmployee( this.name, this.orderby, this.page).subscribe(( data ) => {
      this.lists = data.content;

      this.currentPagging(data.first, data.last, data.totalPages, data.number);
    });
  }
}
