import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosService } from 'src/app/pedidos.service';
import { Pedido } from 'src/app/pedido';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  pedido: Pedido = new Pedido(" ", " ", 0);
  datosOriginales: Pedido = new Pedido(" ", " ", 0);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidosService: PedidosService
  ) {}

  ngOnInit() {
    let idPedido: string | null = this.route.snapshot.paramMap.get("id");

    if (idPedido !== null) {
      const url = idPedido ? `getPedido/${idPedido}` : 'getPedido';
      console.log('URL de la solicitud:', url);
      this.pedidosService.getPedido(idPedido).subscribe(
        (pedido: Pedido) => {
          console.log('Respuesta de la solicitud:', pedido);
          if (pedido) {
            this.pedido = { ...pedido };
            this.datosOriginales = { ...pedido };
          } else {
            console.error("No se encontró el pedido");
          }
        },
        error => {
          console.error("Error al obtener el pedido", error);
        }
      );
    }
  }

  editarPedido(pedido: Pedido) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Realmente quieres editar a ${pedido.nombre}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Editar Pedido',
          html: `
            <p>Nombre original: ${this.datosOriginales.nombre}</p>
            <p>Nuevo nombre: ${pedido.nombre !== this.datosOriginales.nombre ? pedido.nombre : 'Sin cambios'}</p>
            <p>Tamaño: ${this.datosOriginales.size}</p>
            <p>Precio original: ${this.datosOriginales.precio}</p>
            <p>Nuevo precio: ${pedido.precio !== this.datosOriginales.precio ? pedido.precio : 'Sin cambios'}</p>
          `,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, guardar',
          cancelButtonText: 'Cancelar'
        }).then((saveResult) => {
          if (saveResult.isConfirmed) {
            this.pedidosService.updatePedido(pedido).subscribe(() => {
              console.log('Pedido editado correctamente');
              this.volver();
            });
          } else if (saveResult.dismiss !== Swal.DismissReason.cancel) {
            console.log('Edición cancelada por el usuario');
          }
        });
      } else if (result.dismiss !== Swal.DismissReason.cancel) {
        console.log('Edición cancelada por el usuario');
      }
    });
  }

  volver() {
    this.router.navigate(['/menu']);
  }

  onSubmit() {
    // Puedes agregar lógica adicional para manejar el envío del formulario si es necesario
  }
}
