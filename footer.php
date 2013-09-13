<footer>
	<ul>
		<li dir="ltr">Copyright © 2013 Holine Studio All rights reserved</li>
	</ul>
</footer>
<script type="text/javascript">
$.ready(function(){
	$.browser.addEventListener('resize', function(){
		var textarea = document.getElementsByTagName('textarea')[0];
		textarea.style.display = 'none';
		textarea.style.height = $.browser.client.height - document.getElementsByTagName('header')[0].offsetHeight - document.getElementsByTagName('footer')[0].offsetHeight - 56 + 'px';
		textarea.style.width = $.browser.client.width - 82 + 'px';
		textarea.style.display = '';
	})});
	</script>
</body>
</html>