<?php
function tpl($path) {
	$html = file_get_contents ( $path ); 
	$html = str_replace ( array (
			"\n",
			"\r",
			"\t" 
	), array (
			'',
			'',
			'' 
	), $html );
	echo preg_replace('/\s{2,}/', '', $str);
	echo $html;
}
session_start ();
tpl ( 'head.php' );
if ($_SESSION ['passport']) {
	;
} else {
	tpl ( 'login.php' );
}
tpl ( 'footer.php' );