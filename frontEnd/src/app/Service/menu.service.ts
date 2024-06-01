import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemMenu } from '../Interface/item-menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://localhost:8080/menu'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
