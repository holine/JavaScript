<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="zh">
<head>
<meta charset="utf-8">
<meta content="initial-scale=1, minimum-scale=1, width=device-width"
	name="viewport">
<title>Holine笔记</title>
<link href="index.css" rel="stylesheet">
<script type="text/javascript" src="holine.js"></script>
<script type="text/javascript">
Holine({plugins:['browser', 'dialog']});
</script>
</head>
<body>
	<header>Holine笔记</header>
	<main>
	<textarea type="text" id="search" name="q" placeholder="亲，輸入些內容吧……"></textarea></main>
	<footer style="display:none;">
	<ul>
		<li dir="ltr">Copyright © 2013 Holine Studio All rights reserved</li>
	</ul>
	</footer>
	<script type="text/javascript">
	$.ready(function(){$.browser.addEventListener('resize', function(){document.getElementsByTagName('main')[0].style.height = $.browser.size().height - document.getElementsByTagName('header')[0].offsetHeight - document.getElementsByTagName('footer')[0].offsetHeight - 40 + 'px'; document.getElementsByTagName('textarea')[0].style.width = document.getElementsByTagName('main')[0].offsetWidth - 22 + 'px'; document.getElementsByTagName('textarea')[0].style.height = document.getElementsByTagName('main')[0].offsetHeight - 14 + 'px';})});
</script>
</body>
</html>