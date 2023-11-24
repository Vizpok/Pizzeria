import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/pedido';
import { PedidosService } from 'src/app/pedidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pedidos: Pedido[] = [
    new Pedido("Pizza de jamon", "chica", 50)
  ];

  constructor(private pedidosService: PedidosService) { }

  eliminarPedido(pedido: Pedido) {
    // Utiliza SweetAlert2 para mostrar un cuadro de confirmación personalizado
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Realmente quieres eliminar a ${pedido.nombre}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario hace clic en "Sí, eliminar", procede con la eliminación
        this.pedidosService.deletePedido(pedido).subscribe(() => {
          this.obtenerPedidos();
        });
      }
    });
  }

  ngOnInit() {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.pedidosService.getPedidos().subscribe(
      (pedidos: Pedido[]) => {
        this.pedidos = pedidos;
      },
      (error: any) => {
        console.error('Error al obtener pedidos', error);
      }
    );
  }
}
