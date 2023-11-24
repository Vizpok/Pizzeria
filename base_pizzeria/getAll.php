<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
$base_pizzeria = include_once "base_pizzeria.php";
$sentencia = $base_pizzeria->query("select id, nombre, size, precio from pedidos");
$pedido = $sentencia->fetchAll(PDO::FETCH_OBJ);
echo json_encode($pedido);