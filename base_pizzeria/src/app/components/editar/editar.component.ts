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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidosService: PedidosService
  ) {}
    //No olvides instalarlo antes de querer usarlo npm install sweetalert2
    editarPedido(pedido: Pedido) {
      // Almacena los valores originales antes de la edición
      const nombreOriginal = pedido.nombre;
      const precioOriginal = pedido.precio;
    
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
          // Si el usuario hace clic en "Sí, editar", muestra el contenido personalizado dentro del mismo cuadro de diálogo
          Swal.fire({
            title: '¿Quieres guardar los cambios?',
            html: `
              <p>Nombre original: ${nombreOriginal}</p>
              <p>Nombre nuevo: ${pedido.nombre !== nombreOriginal ? pedido.nombre : 'Sin cambios'}</p>
              <p>Tamaño: ${pedido.size}</p>
              <p>Precio original: ${precioOriginal}</p>
              <p>Precio nuevo: ${pedido.precio !== precioOriginal ? pedido.precio : 'Sin cambios'}</p>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'No, cancelar'
          }).then((saveResult) => {
            if (saveResult.isConfirmed) {
              // Si el usuario hace clic en "Sí, guardar", procede con la edición
              this.pedidosService.updatePedido(pedido).subscribe(() => {
                console.log('Pedido editado correctamente');
                this.volver();  // Redirige a la página de menú después de la edición
              });
            } else if (saveResult.dismiss !== Swal.DismissReason.cancel) {
              // Si el usuario cierra el cuadro de diálogo de una manera diferente a hacer clic en "Cancelar"
              console.log('Edición cancelada por el usuario');
              // No redirigir, ya que el usuario ha cancelado la edición
            }
          });
        } else if (result.dismiss !== Swal.DismissReason.cancel) {
          // Si el usuario cierra el primer cuadro de diálogo de una manera diferente a hacer clic en "Cancelar"
          console.log('Edición cancelada por el usuario');
          // No redirigir, ya que el usuario ha cancelado la edición
        }
      });
    }
    

  ngOnInit() {
    let idPedido: string | null = this.route.snapshot.paramMap.get("id");

    if (idPedido !== null) {
      const url = idPedido ? `getPedido/${idPedido}` : 'getPedido';
      console.log('URL de la solicitud:', url);
      this.pedidosService.getPedido(idPedido).subscribe(
        (pedido: Pedido) => {
          console.log('Respuesta de la solicitud:', pedido);
          if (pedido) {
            this.pedido = pedido;
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

  volver() {
    this.router.navigate(['/menu']);
  }

  onSubmit() {
    // Puedes agregar lógica adicional para manejar el envío del formulario si es necesario
  }
}
