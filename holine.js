var Holine = function() {
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
		for ( var i in Holine.config.plugins) {
			for ( var j = Holine.config.plugins[i].depend.length - 1; j > -1; j--) {
				if (Holine.config.plugins[i].depend[j] == plugin) {
					Holine.config.plugins[i].depend.splice(j, 1);
					break;
				}
			}
		}
	}
};
Holine.config = function(cfg) {
	if (typeof cfg.variable != 'undefined') {
		this.config.variable = cfg.variable;

	}
	if (typeof window[this.config.variable] == 'undefined') {
		window[this.config.variable] = new Holine();
	}
	if (typeof this.path != 'undefined') {
		this.config.path = cfg.path;
	}
	if (typeof cfg.plugin != 'undefined') {
		this.config.plugins[cfg.plugin].depend = cfg.depend;
	}
	var plugins = typeof cfg.plugins == 'undefined' ? (typeof cfg.depend == 'undefined' ? new Array()
			: cfg.depend)
			: cfg.plugins;
	var that = this;
	for ( var i = plugins.length - 1; i > -1; i--) {
		if (typeof (Holine.config.plugins[plugins[i]]) == 'undefined') {
			Holine.config.plugins[plugins[i]] = {
				onload : false,
				depend : {}
			};
		}
		this.count++;
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.charset = 'utf-8';
		script.src = this.config.path + '/' + plugins[i] + '.js';
		script.setAttribute('plugin', plugins[i]);
		if (typeof script.onload != 'undefined') {
			script.onload = function() {
				that.config.count--;
				Holine.config.plugins[this.getAttribute('plugin')].onload = true;
			};
		} else {
		}
		document.body.appendChild(script);
	}
};
Holine.registerPlugins = function(plugin, object, init) {
	Holine.config.plugins[plugin].object = object;
	Holine.config.plugins[plugin].init = init;
	if (object.depend.length) {
		this.config({
			plugin : plugin,
			depend : object.depend
		});
	} else {
		window[this.config.variable].registerPlugins(plugin, object, init);
	}
	if (this.config.count == 0) {
		setTimeout(
				function() {
					var i = 1;
					while (i) {
						i = 0;
						for ( var j in Holine.config.plugins) {
							i++;
							if (typeof window[Holine.config.variable][j] == 'undefined') {
								if(Holine.config.plugins[j].depend.length == 0){
									window[Holine.config.variable].registerPlugins(j, Holine.config.plugins[j].object, Holine.config.plugins[j].init);
									delete Holine.config.plugins[j];
								}
							} else {
								delete Holine.config.plugins[j];
							}
						}
					}
				}, 100);
	}
};
Holine.config.count = 0;
Holine.config.plugins = {};
Holine.config.path = window.location.href.substr(0, window.location.href
		.lastIndexOf('/'));
Holine.config.variable = typeof ($) == 'undefined' ? '$' : 'holine';