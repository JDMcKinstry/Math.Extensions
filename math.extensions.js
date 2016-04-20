/**
 *	Math[extensions]()
 */
;;(function() {
	/*	[ 'difference', 'max', 'mean', 'median', 'medianMinMax', 'min', 'minMax', 'maxMin', 'mode', 'range', 'sum' ]	*/
	var args = Array.prototype.slice.call(arguments, 1),
		mathMax = Math.max,
		mathMin = Math.min;

	function getMinMax() {
		var args = arguments,
			araNum = new Array(),
			resType = '',
			compareMin, compareMax;

		for (x in args) {
			var argsX = args[x];
			switch (typeof argsX) {
				case 'number':
					araNum.push(args[x]);
					break;
				case 'string':
					isNaN(parseFloat(args[x].replace(/[^0-9|.]/g,""))) ? resType = args[x].toLowerCase() : araNum.push(parseFloat(args[x].replace(/[^0-9|.]/g,"")));
					break;
				case 'object':
					for (y in argsX) {
						var argsXY = argsX[y];
						if (y == 'compare') {
							switch (typeof argsXY) {
								case 'object':
									compareMin = argsXY.min;
									compareMax = argsXY.max;
									break;
								default:
									compareMin = compareMax = parseFloat((''+argsXY).replace(/[^0-9|.]/g,""));
							}
						}
						else {
							"number" == typeof argsXY && araNum.push(argsXY);
							if ("string" == typeof argsXY) {
								var argsXYZ = parseFloat(argsXY.replace(/[^0-9|.]/g, ""));
								"number" != typeof argsXYZ || isNaN(argsXYZ) || araNum.push(argsXYZ);
							}
						}
					}
					break;
			}
		}

		if (1 < araNum.length) {
			var min, max;
			if (void 0 !== compareMin) min = mathMin.apply(null, araNum.filter(function(v) { return v >= compareMin; }));
			else min = mathMin.apply(null, araNum);

			if (void 0 !== compareMax) max = mathMax.apply(null, araNum.filter(function(v) { return v <= compareMax; }));
			else max = mathMax.apply(null, araNum);

			switch (resType) {
				case "difference":
					araNum.sort(function(a, b) { return a - b; });
					return function() { var a = 0; for (var i=0;i<araNum.length;i++) a -= parseFloat(araNum[i]); return a; }();
				case "max":
					return max;
				case "mean":
					araNum.sort(function(a, b) { return a - b; });
					var sum = function() { var a = 0; for (var i=0;i<araNum.length;i++) a += araNum[i]; return a; }();
					return sum / araNum.length;
				case "median":
					araNum.sort(function(a, b) { return a - b; });
					var half = ~~(araNum.length/2);
					return araNum.length % 2 ? araNum[half] : (araNum[half - 1] + araNum[half]) / 2;
				case "medianminmax":
					araNum.sort(function(a, b) { return a - b; });
					var half = ~~(araNum.length/2);
					return araNum.length % 2 ? araNum[half] : [araNum[half - 1], araNum[half]];
				case "min":
					return min;
				case "mode":
					if (!(araNum instanceof Array) || araNum.length <= 1) return Infinity;
					araNum.sort(function(a, b) { return a - b; });

					var dups = [];
					for (var i = 0; i < araNum.length - 1; i++) if (araNum[i + 1] == araNum[i]) dups.push(araNum[i]);

					if (!dups.length) return -Infinity;

					var objDups = {};
					objDups[dups[0]] = [dups[0]];
					objDups[dups[0]].push(dups[0]);
					for (var i = 1; i < dups.length; i++) {
						if (!objDups[dups[i]]) {
							objDups[dups[i]] = [dups[i]];
							objDups[dups[i]].push(dups[i]);
						}
						else objDups[dups[i]].push(dups[i]);
					}

					var ret = [];

					for (var x in objDups) {
						if (!ret.length) ret.push(parseFloat(x));
						else {
							if (objDups[ret[0]].length == objDups[x].length) ret.push(parseFloat(x));
							else if (objDups[ret[0]].length < objDups[x].length) ret = [parseFloat(x)];
						}
					}

					return ret.length == 1 ? ret[0] : ret.length > 1 ? ret : -Infinity;
				case "obj":
					return { min: min, max: max };
				case "product":
					araNum.sort(function(a, b) { return a - b; });
					return function() { var a = parseFloat(araNum[0]); for (var i=1;i<araNum.length;i++) a *= parseFloat(araNum[i]); return a; }();
				case "quotient":
					araNum.sort(function(a, b) { return a - b; });
					return function() { var a = parseFloat(araNum[0]); for (var i=1;i<araNum.length;i++) a /= parseFloat(araNum[i]); return a; }();
				case "sum":
					araNum.sort(function(a, b) { return a - b; });
					return function() { var a = 0; for (var i=0;i<araNum.length;i++) a += parseFloat(araNum[i]); return a; }();
				default:
					return [ min, max ];
			};
		}

		if (araNum.length) return araNum[0];
		//throw Error("Please check arguments supplied", args.toString());
		return !resType ? [Infinity, -Infinity] : resType == 'min' ? Infinity : -Infinity;
	}
	
	Object.defineProperty(Math, 'difference', {
		value: function() {
			var a = [];
			for (x in arguments) a.push(arguments[x]);
			a.push("difference");
			return getMinMax.apply(this, a);
		}
	});
	
	Object.defineProperty(Math, 'max', {
		value: function() {
			var a = [];
			for (x in arguments) a.push(arguments[x]);
			a.push("max");
			return getMinMax.apply(this, a);
		}
	});
	
	Object.defineProperty(Math, 'mean', {
		value: function() {
			var a = [];
			for (x in arguments) a.push(arguments[x]);
			a.push("mean");
			return getMinMax.apply(this, a);
		}
	});
	
	Object.defineProperty(Math, 'median', {
		value: function() {
			var a = [];
			for (x in arguments) a.push(arguments[x]);
			a.push("median");
			return getMinMax.apply(this, a);
		}
	});

	Object.defineProperty(Math, 'medianMinMax', {
		value: function() {
			var a = [];
			for (x in arguments) a.push(arguments[x]);
			a.push("medianminmax");
			return getMinMax.apply(this, a);
		}
	});

	Object.defineProperty(Math, 'min', {
		value: function() {
			var a = [];
			for (x in arguments) a.push(arguments[x]);
			a.push("min");
			return getMinMax.apply(this, a);
		}
	});

	Object.defineProperty(Math, 'minMax', {
		value: function() {
			var a = [];
			for (x in arguments) a.push(arguments[x]);
			return getMinMax.apply(this, a);
		}
	});

	Object.defineProperty(Math, 'maxMin', {
		value: function() {
			var a = [];
			for (x in arguments) a.push(arguments[x]);
			var ret = getMinMax.apply(this, a);
			return ret instanceof Array ? ret.sort(function(a,b) { return b - a; }) : ret;
		}
	});

	Object.defineProperty(Math, 'mode', {
		value: function() {
			var a = [];
			for (x in arguments) a.push(arguments[x]);
			a.push("mode");
			return getMinMax.apply(this, a);
		}
	});

	Object.defineProperty(Math, 'product', {
		value: function() {
			var a = [];
			for (x in arguments) a.push(arguments[x]);
			a.push("product");
			return getMinMax.apply(this, a);
		}
	});
	
	Object.defineProperty(Math, 'quotient', {
		value: function() {
			var a = [];
			for (x in arguments) a.push(arguments[x]);
			a.push("quotient");
			return getMinMax.apply(this, a);
		}
	});
	
	Object.defineProperty(Math, 'range', {
		value: function() {
			var a = [];
			for (x in arguments) if ((''+arguments[x]).toLowerCase() != 'min' && (''+arguments[x]).toLowerCase() != 'max') a.push(arguments[x]);
			var minMax = getMinMax.apply(this, a);
			return minMax instanceof Array && minMax.length == 2 ? minMax[1] - minMax[0] : Infinity;
		}
	});

	Object.defineProperty(Math, 'sum', {
		value: function() {
			var a = [];
			for (x in arguments) a.push(arguments[x]);
			a.push("sum");
			return getMinMax.apply(this, a);
		}
	});
	
	Object.defineProperty(Math, 'runExample', {
		value: function() {
			if (!console || !console['log']) return void 0;
			var args = arguments.length ? arguments : [9,5,8,1,-3,-3,'09.230.236',6,6,6,-5.7,-2,1,3],
				exts = [ 'difference', 'max', 'mean', 'median', 'medianMinMax', 'min', 'minMax', 'maxMin', 'mode', 'product', 'quotient', 'range', 'sum' ];
			if (args[0] instanceof Array) args = args[0];
			for (x in exts) {
				var str = "Math." + exts[x] + "(" + args.toString() + "):";
				console.log(str + (str.length < 56 ? "\t\t\t" : (str.length < 60 ? "\t\t" : "\t")), Math[exts[x]].apply(Math, args));
			}
			return "Thank you for trying my Math extensions!";
		}
	});

})(Math);
