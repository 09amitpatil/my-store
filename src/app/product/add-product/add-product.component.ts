import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { forbiddenValidator } from '../forbidden-validator';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addForm !: FormGroup;

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        forbiddenValidator('yahoo')
      ]),
        
      price: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(500000)]),

      description: new FormControl(''),
      imageUrl: new FormControl('/assets/images/Redmi 13C 5G.jpeg')
    });
  }

  get f() {
    return this.addForm.controls;
  }

  constructor(private ps: ProductService,
    private router: Router
  ) { }

  addProduct() {
    this.ps.insert(this.addForm.value).subscribe(data => this.router.navigate(['/products']));
  }
}
