<header></header>
<main>
<div style="width:300px; margin:0 auto; ">
	<h1>您需要登陆后才能使用Holine笔记</h1>
	<form action="http://www.google.com.hk/search" method="get">
		<input type="text" id="search" name="q" placeholder="登陆密码">
		<button type="submit" onclick="javascript:redirect(this.form)">
			<span>登陆</span>
		</button>
	</form>
</div>
</main>
<script type="text/javascript">
	$.ready(function(){
		$.browser.addEventListener('load', function(){
			$.browser.size();
			var textarea = document.getElementsByTagName('div')[0];
			textarea.style.paddingBottom = textarea.style.paddingTop = ($.browser.client.height - document.getElementsByTagName('footer')[0].offsetHeight - textarea.offsetHeight - 40) / 2 + 'px';
			})});
</script>