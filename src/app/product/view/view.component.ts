import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  
  product$:Observable<IProduct>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService:ProductService
  ) { }

  ngOnInit(): void {

    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
          this.productService.getProductById(Number.parseInt(params.get('id')))
        ));
  
    }
    
  editProduct(product):void{
      
    this.product$.subscribe(product =>{
      console.log('edit clicked');
      this.router.navigate(['products/edit/'+product.id]);
    });
}

 
}
