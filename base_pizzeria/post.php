<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: *");

$jsonPedido = json_decode(file_get_contents("php://input"));

if (!$jsonPedido) {
    exit(json_encode(["error" => "Datos JSON inválidos"]));
}

try {
    $bd = include_once "base_pizzeria.php";
    
    $sentencia = $bd->prepare("INSERT INTO pedidos (nombre, size, precio) VALUES (?, ?, ?)");
    $resultado = $sentencia->execute([$jsonPedido->nombre, $jsonPedido->size, $jsonPedido->precio]);

    if ($resultado) {
        echo json_encode(["resultado" => true]);
    } else {
        echo json_encode(["error" => "Error al insertar en la base de datos"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Error de la base de datos: " . $e->getMessage()]);
}
?>
