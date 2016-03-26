<?php
require 'class.phpmailer.php';

$mail = new PHPMailer;

$mail->isMail();
$mail->setFrom($_POST['mail'], $_POST['nombre']);
$mail->addAddress('tienda@multiservicioselmorche.es', 'Tienda');
$mail->addReplyTo('tienda@multiservicioselmorche.es', 'Tienda');
$mail->Subject = $_POST['asunto'];
$mail->Body = $_POST['areadetexto'] . "\n\n---\nEnviado desde la web";

if (!$mail->send()) {
    include $_POST['locale'] . '/correo_enviado_con_error.html';
} else {
    include $_POST['locale'] . '/correo_enviado_con_exito.html';
}

