(function($) {
	var Browser = function() {
		var that = this;
		this.setIntervalHandle;
		if (typeof (window.addEventListener) == 'undefined') {
			window.attachEvent('onresize', function() {
				that.onresize();
			});
			window.attachEvent('onload', function() {
				that.trigger('load');
			});
		} else {
			window.addEventListener('resize', function() {
				that.onresize();
			}, false);
			window.addEventListener('load', function() {
				that.trigger('load');
			}, false);
		}
	};
	Browser.prototype.size = function(){
		if (document.compatMode == "BackCompat") {
			this.client.width = document.body.clientWidth;
			this.client.height = document.body.clientHeight;
			this.scroll.width = document.body.scrollWidth;
			this.scroll.height = document.body.scrollHeight;
			this.offset.width = document.body.scrollWidth
					+ document.body.scrollLeft;
			this.offset.height = document.body.scrollHeight
					+ document.body.scrollTop;
		} else if (document.compatMode == "CSS1Compat") {
			this.client.width = document.documentElement.clientWidth;
			this.client.height = document.documentElement.clientHeight;
			this.offset.width = document.documentElement.scrollWidth;
			this.offset.height = document.documentElement.scrollHeight;
			this.scroll.width = document.documentElement.scrollWidth;
			this.scroll.height = document.documentElement.scrollHeight;
		}
		if (this.offset.width < this.client.width) {
			this.offset.width = this.client.width;
		}
		if (this.offset.height < this.client.height) {
			this.offset.height = this.client.height;
		}
		return this.offset;
	};
	Browser.depend = new Array();
	Browser.prototype.offset = {
		width : 0,
		height : 0
	};
	Browser.prototype.client = {
		width : 0,
		height : 0
	};
	Browser.prototype.scroll = {
			width:0,
			height:0
	};
	Browser.prototype.delay = 1000;
	Browser.prototype.onresize = function() {
		var that = this;
		clearTimeout(this.setIntervalHandle);
		this.setIntervalHandle = setTimeout(function() {
			clearTimeout (that.setIntervalHandle);
			that.size();
			that.trigger('resize');
		}, this.delay);
	};
	Browser.prototype.onload = function() {
		this.size();
		that.trigger('load');
	};
	Holine.registerPlugins('browser', Browser);
})(window[Holine.variable]);
