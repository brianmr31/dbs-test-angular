import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'

import { RouterModule } from '@angular/router';

import { ListEmployeComponent } from './listemploye.component';

import { EmployeService } from './employe.service';

import { EmployeDto } from './EmployeDto';
import { Position } from './Position';

@Component({
  selector: 'app-employe',
  standalone: true,
  imports: [ RouterModule, ListEmployeComponent, CommonModule ],
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.css'
})
export class EmployeComponent implements OnInit {
  count = 0 ;
  msg = 'Haiil';
  // list: any[] = [];

  constructor( private employeService: EmployeService) {

  }

  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          var longitude = position.coords.longitude;
          var latitude = position.coords.latitude;
          console.log( latitude +","+ longitude );

          var tmp: Position = {
            longp: longitude.toString(),
            latp: latitude.toString()
        }

        this.employeService.postPosition( tmp ).subscribe(( data ) => {
          console.log(data);
        });
      });
    } else {
       console.log("No support for geolocation")
    }
  }

  ngOnInit() {
    this.employeService.getMessage().subscribe(( data ) => {
      this.msg = data.msg;
    });
  }

  hello(){
    console.log("Hallo");
    this.count += 1;
  }
}