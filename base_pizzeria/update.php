<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo json_encode(["error" => "Solo acepto peticiones POST"]);
    exit();
}

$jsonPedido = json_decode(file_get_contents("php://input"));

if (!$jsonPedido) {
    echo json_encode(["error" => "No hay datos"]);
    exit();
}

$base_pizzeria = include_once "base_pizzeria.php";
$sentencia = $base_pizzeria->prepare("UPDATE pedidos SET nombre = ?, precio = ? WHERE id = ?");

if (isset($jsonPedido->id)) {
    $resultado = $sentencia->execute([$jsonPedido->nombre, $jsonPedido->precio, $jsonPedido->id]);
    echo json_encode(["resultado" => $resultado]);
} else {
    echo json_encode(["error" => "La propiedad 'id' no está definida en el objeto JSON."]);
}
?>
