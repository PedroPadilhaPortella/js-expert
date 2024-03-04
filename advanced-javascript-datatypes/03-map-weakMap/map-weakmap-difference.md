Maybe the next explanation will be more clear for someone.

	var k1 = {a: 1};
	var k2 = {b: 2};

	var map = new Map();
	var wm = new WeakMap();

	map.set(k1, 'k1');
	wm.set(k2, 'k2');

	k1 = null;
	map.forEach(function (val, key) {
		console.log(key, val); // k1 {a: 1}
	});

	k2 = null;
	wm.get(k2); // undefined


As you see, after removing `k1` key from the memory we can still access it inside the map. At the same time removing `k2` key of WeakMap removes it from `wm` as well by reference.

That's why WeakMap hasn't enumerable methods like forEach, because there is no such thing as list of WeakMap keys, they are just references to another objects.
