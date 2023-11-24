import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/pedido';
import { PedidosService } from 'src/app/pedidos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  constructor(
    private pedidosService: PedidosService,
    private router: Router,
  ) { }

  volver() {
    this.router.navigate(['/menu']);
  }

  ngOnInit() {
  }

  pedidoModel = new Pedido("", "", 0, undefined);
  //No olvides instalar el alert npm install sweetalert2
  onSubmit() {
    // Verifica que todos los campos requeridos estén llenos
    if (this.pedidoModel.nombre && this.pedidoModel.size && this.pedidoModel.precio > 0) {
      // Muestra el cuadro de diálogo de confirmación
      const mensajeConfirmacion = `
        <p>Nombre: ${this.pedidoModel.nombre}</p>
        <p>Tamaño: ${this.pedidoModel.size}</p>
        <p>Precio: ${this.pedidoModel.precio}</p>
      `;
  
      Swal.fire({
        title: '¿Quieres agregar este producto?',
        html: mensajeConfirmacion,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, agregar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Si el usuario confirma, procede con la adición
          this.pedidosService.addPedido(this.pedidoModel).subscribe(
            (response) => {
              console.log(response); // Imprime la respuesta completa en la consola
              this.router.navigate(['/menu']);
            },
            (error) => {
              console.error(error); // Imprime cualquier error en la consola
              alert('Error al guardar nuevos productos');
            }
          );
        }
      });
    } else {
      // Obtiene la lista de campos que faltan
      const camposFaltantes = [];
      if (!this.pedidoModel.nombre) camposFaltantes.push('Nombre');
      if (!this.pedidoModel.size) camposFaltantes.push('Tamaño');
      if (!(this.pedidoModel.precio > 0)) camposFaltantes.push('Precio');
  
      // Muestra un cuadro de diálogo de error con los campos faltantes
      Swal.fire({
        title: 'Campos incompletos',
        html: `Por favor, completa los siguientes campos:<br>${camposFaltantes.join('<br>')}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
  
}
