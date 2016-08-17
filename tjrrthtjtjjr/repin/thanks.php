<?php

 if(isset($_POST['contactform']))
  {
  
  $subject=$_POST['subject']; 
  $to='info@repin.in';
  $redirect_to = 'index.html';
  $message ="name\t".$_POST['name']."\n";
  $message .="Mobile\t".$_POST['mobile']."\n";
  $message .="Email\t".$_POST['email']."\n";
  $message .="Address\t".$_POST['address']."\n";
  $message .="Message\t".$_POST['message']."\n";
  

$headers = 'MIME-Version: 1.0' . "\r\n";

$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

$headers.="From: no-reply@repin.in \n";

$headers .= "Reply-To: ".$to."\n\n";

$result= @mail($to,$subject,$message,$headers);
echo $to,$subject,$message,$headers,$result;
//echo $to;

}










 if(isset($_POST['contactFormBottom']))
  {
  
  $subject=$_POST['subject']; 
  $to='info@repin.in';
  $redirect_to = 'index.html';
  $message ="name\t".$_POST['name']."\n";
  $message .="Mobile\t".$_POST['email']."\n";
  $message .="Email\t".$_POST['phone']."\n";
  $message .="Address\t".$_POST['companyName']."\n";
  $message .="Message\t".$_POST['message']."\n";
  

$headers = 'MIME-Version: 1.0' . "\r\n";

$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

$headers.="From: no-reply@repin.in \n";

$headers .= "Reply-To: info@repin.in\n\n";

$result= @mail($to,$subject,$message,$headers);
echo $to,$subject,$message,$headers,$result;
//echo $to;

}








if(isset($_POST['distributorForm']))
  {
  
  $subject="Distributor Inquiry"; 
  $to='info@repin.in';
  $redirect_to = 'index.html';
  $message ="name\t".$_POST['firm_name']."\n";
  $message .="compny\t".$_POST['company_name']."\n";
  $message .="Office Address\t".$_POST['off_add']."\n";
  $message .="Country\t".$_POST['country_name']."\n";
  $message .="Contact\t".$_POST['telno']."\n";
  $message .="Mobile\t".$_POST['mobno']."\n";
  $message .="Fax\t".$_POST['fax']."\n";
  $message .="Email\t".$_POST['email']."\n";
  $message .="Website\t".$_POST['web']."\n";
  $message .="Status\t".$_POST['Status']."\n";
  $message .="Date of Incorporation\t".$_POST['date_inc']."\n";
  

$headers = 'MIME-Version: 1.0' . "\r\n";

$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

$headers.="From: no-reply@repin.in \n";

$headers .= "Reply-To: info@repin.in\n\n";

$result= @mail($to,$subject,$message,$headers);
echo $to,$subject,$message,$headers,$result;
//echo $to;

}

//echo '123';
echo ("success");
//header('Location: '.$redirect_to."?success=true");

}










if(isset($_POST['contact-form-contact-us']))
  {
  
  $subject=$_POST['subject']; 
  $to='info@repin.in';
  $redirect_to = 'contact.html';
  $message ="Name\t".$_POST['name']."\n";
  $message .="Email\t".$_POST['email']."\n";
  $message .="Country\t".$_POST['country']."\n";
  $message .="Message\t".$_POST['msg']."\n";
  

$headers = 'MIME-Version: 1.0' . "\r\n";

$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

$headers.="From: no-reply@repin.in \n";

$headers .= "Reply-To: info@repin.in\n\n";

$result= @mail($to,$subject,$message,$headers);
echo $to,$subject,$message,$headers,$result;
//echo $to;

}






?>  