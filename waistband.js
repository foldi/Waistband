/*global $, Waistband, myOrientationChangeFunction, document, window */
/**
 * Waistband
 * Copyright (C) 2011 Foldi, LLC
 * 
 * @requires jquery.js
 * @author Vince Allen
 */

myOrientationChangeFunction = function () {
	Waistband.Viewport.setSize();
	Waistband.AxisX.update();
	Waistband.LabelAxisX.update();
	Waistband.AxisY.update();
	Waistband.LabelAxisY.update();
};

Waistband = {};

Waistband.Utils = (function () {

	return {
		addEvent: function (el, type, data, listener, use_capture) {

			var capture = use_capture || false;

			if (el.addEventListener) { // W3C
				el.addEventListener(type, function (event) { event.data = data; listener(event); }, capture);
			} else if (el.attachEvent) { // IE
				el.attachEvent("on" + type, function (event) { event.data = data; listener(event); });
			}
		},
		removeEvent: function (obj, event_name, event, use_capture) {

			var i, capture = use_capture || false;

			if (!event_name) {
				if (obj.events) {
					for (i in obj.events) {
						if (obj.events.hasOwnProperty(i)) {
							if (obj.removeEventListener) {
								obj.removeEventListener(i, obj.events[i], capture);
							}
						}
					}
				}
			}

		}
	};

}());

Waistband.Viewport = (function () {

	var div = document.createElement("div");

	div.setAttribute("id", "viewport");
	div.setAttribute("style", "position: absolute; top: 0; left: 0; height: 55px; width: 110px; z-index: 1000; background: #fff; opacity: .75;");

	return {
		div: div,
		width: null,
		height: null,
		init: function () {
			document.getElementsByTagName("body").item(0).appendChild(div);
			this.setSize();
			Waistband.AxisX.init();
			Waistband.LabelAxisX.init();
			Waistband.AxisY.init();
			Waistband.LabelAxisY.init();
		},
		setSize : function () {
			var d = {
				'width' : false,
				'height' : false
			};
			if (typeof(window.innerWidth) !== "undefined") {
				d.width = window.innerWidth;
			} else if (typeof(document.documentElement) !== "undefined" && typeof(document.documentElement.clientWidth) !== "undefined") {
				d.width = document.documentElement.clientWidth;
			} else if (typeof(document.body) !== "undefined") {
				d.width = document.body.clientWidth;
			}
			if (typeof(window.innerHeight) !== "undefined") {
				d.height = window.innerHeight;
			} else if (typeof(document.documentElement) !== "undefined" && typeof(document.documentElement.clientHeight) !== "undefined") {
				d.height = document.documentElement.clientHeight;
			} else if (typeof(document.body) !== "undefined") {
				d.height = document.body.clientHeight;
			}
			this.width = d.width;
			this.height = d.height;
			return d;
		}
	};

}());

Waistband.AxisX = (function () {

	var div = document.createElement("div");

	div.setAttribute("id", "axis_x");

	return {
		div: div,
		init: function () {
			div.setAttribute("style", "position: absolute; top: 20px; left: 0px; border-top: 1px dotted #aaa; height: 1px; width: " + Waistband.Viewport.width + "px;");
			Waistband.Viewport.div.appendChild(div);
		},
		update: function () {
			div.setAttribute("style", "position: absolute; top: 20px; left: 0px; border-top: 1px dotted #aaa; height: 1px; width: " + Waistband.Viewport.width + "px;");
		}

	};

}());

Waistband.LabelAxisX = (function () {

	var div = document.createElement("div"),
		textnode = document.createTextNode("0"),
		id = "label_axis_x";

	div.setAttribute("id", id);
	div.setAttribute("style", "position: absolute; top: 3px; left: 30px; font-family: 'Helvetica'; font-size: 12px;");
	div.appendChild(textnode);

	return {
		unit: "px",
		init: function () {
			Waistband.Viewport.div.appendChild(div);
			this.update();
		},
		update: function () {
			document.getElementById(id).firstChild.nodeValue = "w: " + Waistband.Viewport.width + this.unit;
		}

	};

}());

Waistband.AxisY = (function () {

	var div = document.createElement("div");
	div.setAttribute("id", "axis_y");

	return {
		div: div,
		init: function () {
			div.setAttribute("style", "position: absolute; top: 0; left: 20px; border-left: 1px dotted #aaa; width: 1px; height: " + Waistband.Viewport.height + "px;");
			Waistband.Viewport.div.appendChild(div);
		},
		update: function () {
			div.setAttribute("style", "position: absolute; top: 0; left: 20px; border-left: 1px dotted #aaa; width: 1px; height: " + Waistband.Viewport.height + "px;");
		}

	};

}());

Waistband.LabelAxisY = (function () {

	var div = document.createElement("div"),
		textnode = document.createTextNode("0"),
		id = "label_axis_y";

	div.setAttribute("style", "position: absolute; top: 30px; left: 30px; font-family: 'Helvetica'; font-size: 12px;");
	div.setAttribute("id", id);
	div.appendChild(textnode);

	return {
		unit: "px",
		init: function () {
			Waistband.Viewport.div.appendChild(div);
			this.update();
		},
		update: function () {
			document.getElementById(id).firstChild.nodeValue = "h: " + Waistband.Viewport.height + this.unit;
		}

	};

}());

$(window).resize(function () {
	Waistband.Viewport.setSize();
	Waistband.AxisX.update();
	Waistband.LabelAxisX.update();
	Waistband.AxisY.update();
	Waistband.LabelAxisY.update();
});
