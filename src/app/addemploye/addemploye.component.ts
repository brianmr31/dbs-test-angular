import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-employe',
    standalone: true,
    imports: [ ReactiveFormsModule, CommonModule ],
    template: `
        <div class="container">
            <div class="row"> 
                <h3 (click)="printlog()" > Add Employe </h3>
            </div>
            <form [formGroup]="form" (ngSubmit)="onSubmit()" >
                <div class="row"> 
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        <input type="email" class="form-control" formControlName="name" placeholder="name@example.com">
                        <span *ngIf=" form.controls['name'].value != '' && form.controls['name'].valid == false "> *email is required </span>
                    </div>
                </div>
                <div class="row"> 
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                        <textarea class="form-control" formControlName="alamat" rows="3"></textarea>
                    </div>
                </div>

                <button type="submit" [disabled]="!form.valid">Submit</button>
            </form>
            
        </div>
    `,
  })
  export class AddEmployeComponent implements OnInit {
    
    isSubmit: boolean = false;
    form: FormGroup;
    
    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.email] ],
            alamat: ["", [Validators.pattern('^[0-9]*$') ] ]
         });
    }

    ngOnInit(): void {

    }
  
    get f() { return this.form.controls; }

    updateName() {
        this.form.patchValue({
            name: "Hello"
        });
    }

    printlog() {
        console.log( this.form.get("name")?.value );
    }

    onSubmit() {
        if( this.form.valid ){
            console.log( this.form.get("name") );
            this.isSubmit = true;
        } else {
            this.isSubmit = false;
        }
    }
}