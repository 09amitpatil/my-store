import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Product } from './product';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  countSubject$ = new Subject<number>();
  constructor(private http: HttpClient) { }

  // shared variable value will be read by the navabar component
  updatedCartCount = 0;

  // this method will be called by the product-list component
  updateCartCount() {
    // ++ will increment the value o the variable of 1
    this.updatedCartCount++;
    this.countSubject$.next(this.updatedCartCount);
  }

  readAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`)
      .pipe(catchError((error: HttpErrorResponse) => {
        return throwError("Error occured while fetching the data.")
      }));
  }

  //read one product record as per the id 
  readOne(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`)
  }

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  insert(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/products`,
                                    JSON.stringify(product),
                                    this.httpOption
    )
  }
  delete(id:number):Observable<Product>{
    return this.http.delete<Product>(`${environment.apiUrl}/products/${id}`);
  }

  update(id:number,product:Product):Observable<Product>{
    return this.http.put<Product>(`${environment.apiUrl}/products/${id}`,
                                  JSON.stringify(product),
                                  this.httpOption);
  }
}