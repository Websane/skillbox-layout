<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//от кого письмо
$mail->setFrom('from@example.com', 'Mailer');
//кому отправить
$mail->addAddress('websanego@gmail.com');
//тема письма
$mail->Subject = 'Blanchard заявка';

//тело письма
$body = '<h1>Данные пользователя<h1>';
if (trim(!empty($_POST['name']))){
  $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if (trim(!empty($_POST['tel']))){
  $body.='<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>';
}

$mail->Body = $body;
//Отправка
if (!$mail->send()) {
  $message = 'Ошибка';
} else {
  $message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>
