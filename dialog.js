(function($) {
	function Dialog() {
		this.setIntervalHandle;
		this.opacity = 0;
		this.workspace = document.createElement('div');
		this.workspace.style.display = 'none';
		this.workspace.style.position = 'absolute';
		this.workspace.style.top = '0';
		this.workspace.style.left = '0';
		this.workspace.style.width = $.browser.offset.width + 'px';
		this.workspace.style.height = $.browser.offset.height + 'px';
		this.workspace.style.overflow = 'hidden';
		this.workspace.innerHTML = '<iframe width="100%" height="100%" allowTransparency="true" frameborder="no" border="0" scrolling="no" style="position:basolute; top:0; left:0; filter:alpha(opacity=80);"></iframe>';
		this.shadow = this.workspace.getElementsByTagName('iframe')[0];
		document.body.appendChild(this.workspace);
		var html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
		html += '<html>';
		html += '<head>';
		html += '<meta http-equiv=Content-Type content="text/html;charset=utf-8">';
		html += '<style>';
		html += 'body{background:#000000; }';
		html += '</style>';
		html += '</head>';
		html += '<body></body>';
		html += '</html>';
		if (typeof (this.shadow.contentDocument) == 'undefined') {
			this.shadow.contentWindow.document.write(html);
			this.shadow.contentWindow.document.close();
		} else {
			this.shadow.contentDocument.write(html);
			this.shadow.contentDocument.close();
		}
		this.main = document.createElement('div');
		this.main.style.cssText = 'position:fixed; top:50%; left:50%; width:500px; margin-left:-251px; background:#eaeaea; border:1px solid #aaaaaa; border-radius:5px; box-shadow:0 0 8px rgba(0,0,0,0.2);';
		this.title = document.createElement('div');
		this.title.innerHTML = '这里是标题';
		this.title.style.cssText = 'border-bottom: 1px solid #CCCCCC; border-radius: 5px 5px 0 0; font-weight: bold; line-height: 25px; padding: 5px 15px';
		this.main.appendChild(this.title);
		this.contents = document.createElement('div');
		this.contents.innerHTML = '这里是内容';
		this.contents.style.cssText = 'background-color: #FFFFFF; padding: 23px 30px 30px 37px;text-align: left; min-height:80px;';
		this.main.appendChild(this.contents);
		this.footer = document.createElement('div');
		this.footer.innerHTML = '<a href="javascript:void(0)" style="display:button;">确定</a>';
		this.footer.style.cssText = 'border-top: 1px solid #CCCCCC;line-height: 25px;padding: 5px 12px;text-align: right;';
		this.main.appendChild(this.footer);
		this.workspace.appendChild(this.main);
	}
	;
	Dialog.depend = [ 'browser' ];
	Dialog.prototype.show = function() {
		var that = this;
		clearInterval(that.setIntervalHandle);
		this.workspace.style.display = '';
		this.setIntervalHandle = setInterval(function() {
			that.opacity++;
			if (that.opacity > 75) {
				clearInterval(that.setIntervalHandle);
			} else {
				that.shadow.style.opacity = that.opacity / 100;
			that.main.style.opacity = that.opacity / 75;
			}
		}, 10);
	};
	Dialog.prototype.content = function(title, content, button){
		this.title.innerHTML = title;
		this.contents.innerHTML = content;
		this.show();
		this.main.style.marginTop = -0.5 * this.main.offsetHeight + 'px';
	};
	Dialog.prototype.hidd = function() {
		var that = this;
		clearInterval(that.setIntervalHandle);
		this.setIntervalHandle = setInterval(function() {
			that.opacity--;
			if (that.opacity == 0) {
				that.workspace.style.display = 'none';
				clearInterval(that.setIntervalHandle);
			} else {
				that.shadow.style.opacity = that.opacity / 100;
				that.main.style.opacity = that.opacity / 75;
			}
		}, 10);
	};
	Dialog.prototype.resize = function(width, height) {
		if (typeof (width) == 'undefined') {
			this.workspace.style.width = '100%';
		} else {
			this.workspace.style.width = width + 'px';
		}
		if (typeof (height) == 'undefined') {
			this.workspace.style.height = '100%';
		} else {
			this.workspace.style.height = height + 'px';
		}
	};
	Holine.registerPlugins('dialog', Dialog, function() {
		$.browser.addEventListener('resize', function() {
			$.dialog.resize($.browser.offset.width, $.browser.offset.height);
		});
	});
})(window[Holine.variable]);