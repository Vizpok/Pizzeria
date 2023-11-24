// pedidos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from './pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  baseUrl = 'http://localhost/base_pizzeria'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/getAll.php`);
  }

  getPedido(id?: string | number): Observable<Pedido> {
    const url = id ? `${this.baseUrl}/get.php?idPedido=${id}` : `${this.baseUrl}/get.php`;
    return this.http.get<Pedido>(url);
  }

  addPedido(pedido: Pedido): Observable<any> {
    return this.http.post(`${this.baseUrl}/post.php`, pedido);
  }

  deletePedido(pedido: Pedido): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete.php?idPedido=${pedido.id}`);
  }

  updatePedido(pedido: Pedido): Observable<any> {
    const url = `${this.baseUrl}/update.php`;
    return this.http.post(url, pedido);
  }
}
