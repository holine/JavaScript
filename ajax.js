(function($) {
	function Ajax() {
	}
	Ajax.depend = new Array();
	Ajax.prototype.get = function(cfg) {
		cfg.method = 'GET';
		cfg.async = true;
		if (typeof cfg.data == 'undefined') {
			cfg.data = new Object();
		}
		cfg.data[''] = (new Date()).getTime();
		this.send(cfg);
	};
	Ajax.prototype.post = function(cfg) {
		cfg.method = 'POST';
		cfg.async = true;
		this.send(cfg);
	};
	Ajax.prototype.getSync = function(cfg) {
		cfg.method = 'GET';
		cfg.async = false;
		if (typeof cfg.data == 'undefined') {
			cfg.data = new Object();
		}
		console.log(cfg);
		cfg.data[''] = (new Date()).getTime();
		this.send(cfg);
	};
	Ajax.prototype.postSync = function(cfg) {
		cfg.method = 'POST';
		cfg.async = false;
		this.send(cfg);
	};
	Ajax.prototype.send = function(cfg) {
		if (typeof cfg.callback == 'undefined') {
			cfg.callback = function() {
			};
		}
		if (typeof cfg.error == 'undefined') {
			cfg.error = function() {
			};
		}
		if (typeof cfg.state == 'undefined') {
			cfg.state = new Object();
		}
		for ( var i = 0; i < 5; i++) {
			if (typeof cfg.state[i] == 'undefined') {
				cfg.state[i] = function() {
				};
			}
		}
		var data = new Array();
		for ( var key in cfg.data) {
			data.push(key + '=' + encodeURIComponent(cfg.data[key]));
		}
		if (cfg.method == 'GET') {
			cfg.url = cfg.url + '?' + data.join('&');
			cfg.data = null;
		} else {
			cfg.data = data.join('&');
		}
		var xml = window.XMLHttpRequest ? new XMLHttpRequest()
				: new ActiveXObject("Microsoft.XMLHTTP");
		xml.onreadystatechange = function() {
			cfg.state[this.readyState]();
			if (this.readyState == 4) {
				if (this.status == 200) {
					switch (cfg.type) {
					case 'json':
						cfg.callback(this.status, eval(this.responseText));
						break;
					case 'xml':
						cfg.callback(this.status, this.responseXML);
						break;
					case 'script':
						break;
					default:
						cfg.callback(this.status, this.responseText);
					}
				} else {
					cfg.error(this.status, this);
				}
			}
		};
		xml.open(cfg.method, cfg.url, cfg.async, cfg.username, cfg.password);
		for ( var i in cfg.header) {
			xml.setRequestHeader(i, cfg.header[i]);
		}
		xml.send(cfg.data);
		return xml;
	};
	Holine.registerPlugins('ajax', Ajax);
})(window[Holine.variable]);