var Holine = function(cfg) {
	if (typeof cfg != 'undefined') {
		if (typeof cfg.variable != 'undefined') {
			Holine.variable = cfg.variable;
		}
		if (typeof window[Holine.variable] == 'undefined') {
			window[Holine.variable] = new Holine();
			window.onload = function() {
				window[Holine.variable].ready.prototype.onload = true;
				window[Holine.variable].ready();
			};
		}
		if (typeof cfg.path != 'undefined') {
			Holine.path = cfg.path;
		}
		var plugins = new Array();
		if (typeof cfg.plugins != 'undefined') {
			plugins = cfg.plugins;
		}
		for ( var i = plugins.length - 1; i > -1; i--) {
			if (typeof (Holine.plugins[plugins[i]]) == 'undefined') {
				Holine.plugins[plugins[i]] = {
					onload : false,
					depend : new Array(),
					object : new Object(),
					init : function() {
					}
				};
				Holine.count++;
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.charset = 'utf-8';
				script.src = Holine.path + '/' + plugins[i] + '.js';
				script.setAttribute('plugin', plugins[i]);
				script.onload = function() {
					Holine.count--;
					Holine.plugins[this.getAttribute('plugin')].onload = true;
					if(Holine.count == 0){
						var i = 1;
						while (i) {
							i = 0;
							for ( var j in Holine.plugins) {
								i++;
								if (typeof window[Holine.variable][j] == 'undefined') {
									if (Holine.plugins[j].depend.length == 0) {
										window[Holine.variable].registerPlugins(j,
												Holine.plugins[j].object,
												Holine.plugins[j].init);
										delete Holine.plugins[j];
									} else {
										for ( var k in Holine.plugins[j].depend){
											if(typeof window[Holine.variable][Holine.plugins[j].depend[i]] != 'undefined'){
												Holine.plugins[j].depend.spclie(k, 1);
											}
										}
									}
								} else {
									delete Holine.plugins[j];
								}
							}
						}
						window[Holine.variable].ready.prototype.ready = true;
						window[Holine.variable].ready();
					}
				};
				document.getElementsByTagName('head')[0].appendChild(script);
			}
		}
	}
};
Holine.count = 0;
Holine.plugins = {};
Holine.path = window.location.href.substr(0, window.location.href
		.lastIndexOf('/'));
Holine.variable = typeof ($) == 'undefined' ? '$' : 'holine';
Holine.registerPlugins = function(plugin, object, init) {
	Holine.plugins[plugin].object = object;
	Holine.plugins[plugin].init = init;
	Holine.plugins[plugin].depend = object.depend;
	if (object.depend.length) {
		Holine({
			plugins : object.depend
		});
	} else {
		window[Holine.variable].registerPlugins(plugin, object, init);
	}
};
Holine.prototype.event = {};
Holine.prototype.plugins = new Array();
Holine.prototype.addEventListener = function(plugin, event, action) {
	if (typeof (this.event[plugin]) == 'undefined') {
		this.event[plugin] = {};
	}
	if (typeof (this.event[plugin][event]) == 'undefined') {
		this.event[plugin][event] = new Array();
	}
	this.event[plugin][event].unshift(action);
};
Holine.prototype.removeEventListener = function(plugin, event, action) {
	if (typeof (this.event[event]) !== 'undefined') {
		this.event[event].push(action);
	}
};
Holine.prototype.trigger = function(plugin, event) {
	if (typeof (this.event[plugin]) != 'undefined'
			&& typeof (this.event[plugin][event]) != 'undefined'
			&& this.event[plugin][event].length) {
		for ( var i = this.event[plugin][event].length - 1; i > -1; i--) {
			this.event[plugin][event][i]();
		}
	}
};
Holine.prototype.registerPlugins = function(plugin, object, init) {
	if (typeof this[plugin] == 'undefined') {
		var that = this;
		this.plugins.push(plugin);
		this[plugin] = new object();
		this[plugin].addEventListener = function(event, action) {
			that.addEventListener(plugin, event, action);
		};
		this[plugin].removeEventListener = function(event, action) {
			that.removeEventListener(plugin, event, action);
		};
		this[plugin].trigger = function(event) {
			that.trigger(plugin, event);
		};
		if (typeof init != 'undefined') {
			init();
		}
		for ( var i in Holine.plugins) {
			for ( var j = Holine.plugins[i].depend.length - 1; j > -1; j--) {
				if (Holine.plugins[i].depend[j] == plugin) {
					Holine.plugins[i].depend.splice(j, 1);
					break;
				}
			}
		}
	}
};
Holine.prototype.ready = function(func) {
	if (typeof (func) == 'undefined') {
		if (window[Holine.variable].ready.prototype.onload
				&& window[Holine.variable].ready.prototype.ready) {
			while (window[Holine.variable].ready.prototype.plugins.length) {
				window[Holine.variable].ready.prototype.plugins.shift()();
			}
		}
	} else {
		window[Holine.variable].ready.prototype.plugins.push(func);
	}
};
Holine.prototype.ready.prototype.onload = false;
Holine.prototype.ready.prototype.ready = false;
Holine.prototype.ready.prototype.plugins = new Array();