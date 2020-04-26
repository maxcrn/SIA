/**
 * declare THREEx namespace
 * @type {[type]}
 */

/** Source : https://github.com/jeromeetienne/threex.sportballs */

var THREEx	= THREEx	|| {};

/**
 * THREEx extension
 *
 * @constructor
 */
THREEx.SportBalls	= {};


THREEx.SportBalls.createBasket	= function(){
	var texture	= new THREE.TextureLoader().load('https://raw.githubusercontent.com/maxcrn/SIA/master/src/medias/images/BasketballColor.jpg')
	var geometry	= new THREE.SphereGeometry(0.5, 32, 16);
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.01,
	})
	var mesh	= new THREE.Mesh( geometry, material );
	return mesh
}

THREEx.SportBalls.createBeach	= function(){
	var texture	= new THREE.TextureLoader().load('https://raw.githubusercontent.com/maxcrn/SIA/master/src/medias/images/BeachBallColor.jpg')
	var geometry	= new THREE.SphereGeometry(0.5, 32, 16);
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.01,
	})
	var mesh	= new THREE.Mesh( geometry, material );
	return mesh
}

THREEx.SportBalls.createTennis	= function(){
	var textureColor= new THREE.TextureLoader().load('https://raw.githubusercontent.com/maxcrn/SIA/master/src/medias/images/NewTennisBallColor.jpg')
	var textureBump	= new THREE.TextureLoader().load('https://raw.githubusercontent.com/maxcrn/SIA/master/src/medias/images/TennisBallBump.jpg')
	var geometry	= new THREE.SphereGeometry(0.5, 32, 16);
	var material	= new THREE.MeshPhongMaterial({
		map	: textureColor,
		bumpMap	: textureBump,
		bumpScale: 0.01,
	})
	var mesh	= new THREE.Mesh( geometry, material );
	return mesh
}

THREEx.SportBalls.createFootball	= function(){
	var texture	= new THREE.TextureLoader().load('https://raw.githubusercontent.com/maxcrn/SIA/master/src/medias/images/Footballballfree.jpg59a2a1dc-64c8-4bc3-83ef-1257c9147fd1Large.jpg')
	var geometry	= new THREE.SphereGeometry(0.5, 32, 16);
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.01,
	})
	var mesh	= new THREE.Mesh( geometry, material );
	return mesh
}