export class Pedido {
    constructor(
        public nombre: string,
        public size: string,
        public precio: number,
        public id?: number,
    ) { }

}