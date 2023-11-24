<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: DELETE");
$metodo = $_SERVER["REQUEST_METHOD"];
if ($metodo != "DELETE" && $metodo != "OPTIONS") {
    exit("Solo se permite método DELETE");
}

if (empty($_GET["idPedido"])) {
    exit("No hay id de pedido para eliminar");
}

$idPedido = $_GET["idPedido"];

$base_pizzeria = include_once "base_pizzeria.php";
if (!$base_pizzeria) {
    exit("Error al conectar a la base de datos");
}

$sentencia = $base_pizzeria->prepare("DELETE FROM pedidos WHERE id = ?");
if (!$sentencia) {
    exit("Error al preparar la sentencia SQL");
}

$resultado = $sentencia->execute([$idPedido]);

if ($resultado) {
    echo json_encode(array("message" => "Pedido eliminado correctamente"));
} else {
    echo json_encode(array("message" => "No se pudo eliminar el pedido"));
}
