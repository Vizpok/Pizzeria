<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
if (empty($_GET["idPedido"])) {
    exit("No hay id de pedido");
}
$idPedido = $_GET["idPedido"];
$base_pizzeria = include_once "base_pizzeria.php";
$sentencia = $base_pizzeria->prepare("select id, nombre, size, precio from pedidos where id = ?");
$sentencia->execute([$idPedido]);
$pedido = $sentencia->fetchObject();
echo json_encode($pedido);