var game = {

        newLevel : 1,
        w : 1200,
        h : 800,
        fov : 75,
        sound : null,
        soundActive : false,
        impact : null,
        player : {

            speed : 0.20,
            w : 3,
            h : .5,
            d : .5,
            x : 0,
            baton : null,
            score : 0,
            shieldUp : true,
            shield : null,
            invincible : false
        },
        offender : {

            // speed : 0.1025,
            speed : 0.06,
            w : 3,
            h : .5,
            d : .5,
            x : 0,
            baton : null,
            score : 0,
            mesh : null,
            shieldUp : true,
            shield : null,
            ralenti : false
        },
        ball : {

            speed : .125,
            w : .65,
            h : .65,
            d : 1,
            x : 0,
            z : 0,
            vel : {
                x : 0,
                z : 0
            },
            cube : null
        },
        stage : {

            w : 15,
            h : 10,
            z : -5,
            level : 1,
            mesh : null
        },
        reset : function(player){

            var ball_vel_z = game.ball.vel.z;

            var loader = new THREE.FontLoader();

            // Passage au niveau 2
            if(game.player.score === 3 && game.stage.level === 1){
                // Changement du score et du niveau
                game.newLevel = 1;
                game.player.score = 0;
                game.offender.score = 0;
                game.stage.level += 1;
                // Changement de la balle
                view.scene.remove(game.ball.cube);
                game.ball.cube = THREEx.SportBalls.createTennis();
                view.scene.add(game.ball.cube);
                // Changement du terrain
                view.scene.remove(game.stage.mesh);
                img = new THREE.MeshBasicMaterial({ map:THREE.ImageUtils.loadTexture('src/medias/images/tennisField.png')});
                img.map.needsUpdate = true;
                game.stage.mesh = new THREE.Mesh(floor_geometry, img);
                game.stage.mesh.overdraw = true;
                game.stage.mesh.material.side = THREE.DoubleSide;
                game.stage.mesh.rotation.x = 1.57079633;
                game.stage.mesh.position.z = -5;
                view.scene.add( game.stage.mesh );
                view.scene.add( game.stage.mesh );
                // Changement d'adversaire
                view.scene.remove(game.offender.mesh);
                advGeometry = new THREE.PlaneGeometry( 20, 15 );
                advImg = new THREE.MeshBasicMaterial({ map:THREE.ImageUtils.loadTexture('src/medias/images/federer.jpg')});
                img.map.needsUpdate = true;
                game.offender.mesh = new THREE.Mesh(advGeometry, advImg);
                game.offender.mesh.overdraw = true;
                game.offender.mesh.material.side = THREE.DoubleSide;
                game.offender.mesh.rotation.x = -3.14159265/10;
                game.offender.mesh.position.z = -15;
                game.offender.mesh.position.y = 5;
                view.scene.add( game.offender.mesh );
                // Changement de difficulté
                if(!game.offender.ralenti){
                    game.offender.speed = 0.085;
                }
                game.ball.speed = .155;
                // Changement du son correspondant au niveau 2
                game.impact = soundTennis;
                // Affichage du niveau
                var level = view.scene.getObjectByName( "Level" );
                view.scene.remove(level);
                loader.load( 'src/medias/fonts/Three_Light.json', function ( font ) {
                    var geometry = new THREE.TextGeometry("Niveau 2", {
                        font: font,
                        size: 0.5,
                        height: 0.05,
                        curveSegments: 0.5,
                        bevelEnabled: false,
                        bevelThickness: 0.5,
                        bevelSize: 0.5,
                        bevelOffset: 0,
                        bevelSegments: 0.5
                    } );
                    geometry.center();
                    var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});;
                    mesh = new THREE.Mesh( geometry, material );
                    mesh.position.x = -6;
                    mesh.position.y = 5;
                    mesh.position.z = -2;
                    mesh.rotation.x = 0;
                    mesh.rotation.y = 3.14/6
                    mesh.name = "Level";
                    view.scene.add( mesh );
                } );
            }

            // Passage au niveau 3
            if(game.player.score === 3 && game.stage.level === 2){
                // Changement du score et du niveau
                game.newLevel = 1
                game.player.score = 0;
                game.offender.score = 0;
                game.stage.level += 1;
                // Changement de la balle
                view.scene.remove(game.ball.cube);
                game.ball.cube = THREEx.SportBalls.createBasket();
                view.scene.add(game.ball.cube);
                // Changement du terrain
                view.scene.remove(game.stage.mesh);
                img = new THREE.MeshBasicMaterial({ map:THREE.ImageUtils.loadTexture('src/medias/images/basketballField.png')});
                img.map.needsUpdate = true;
                game.stage.mesh = new THREE.Mesh(floor_geometry, img);
                game.stage.mesh.overdraw = true;
                game.stage.mesh.material.side = THREE.DoubleSide;
                game.stage.mesh.rotation.x = 1.57079633;
                game.stage.mesh.position.z = -5;
                view.scene.add( game.stage.mesh );
                view.scene.add( game.stage.mesh );
                // Changement d'adversaire
                view.scene.remove(game.offender.mesh);
                advGeometry = new THREE.PlaneGeometry( 20, 15 );
                advImg = new THREE.MeshBasicMaterial({ map:THREE.ImageUtils.loadTexture('src/medias/images/lebron.jpg')});
                img.map.needsUpdate = true;
                game.offender.mesh = new THREE.Mesh(advGeometry, advImg);
                game.offender.mesh.overdraw = true;
                game.offender.mesh.material.side = THREE.DoubleSide;
                game.offender.mesh.rotation.x = -3.14159265/10;
                game.offender.mesh.position.z = -15;
                game.offender.mesh.position.y = 5;
                view.scene.add( game.offender.mesh );
                // Changement de difficulté
                if(!game.offender.ralenti){
                    game.offender.speed = 0.10;
                }
                game.ball.speed = .185
                // Changement du son correspondant au niveau 3
                game.impact = soundBasket;
                // Affichage du niveau
                var level = view.scene.getObjectByName( "Level" );
                view.scene.remove(level);
                loader.load( 'src/medias/fonts/Three_Light.json', function ( font ) {
                    var geometry = new THREE.TextGeometry("Niveau 3", {
                        font: font,
                        size: 0.5,
                        height: 0.05,
                        curveSegments: 0.5,
                        bevelEnabled: false,
                        bevelThickness: 0.5,
                        bevelSize: 0.5,
                        bevelOffset: 0,
                        bevelSegments: 0.5
                    } );
                    geometry.center();
                    var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});;
                    mesh = new THREE.Mesh( geometry, material );
                    mesh.position.x = -6;
                    mesh.position.y = 5;
                    mesh.position.z = -2;
                    mesh.rotation.x = 0;
                    mesh.rotation.y = 3.14/6
                    mesh.name = "Level";
                    view.scene.add( mesh );
                } );
            }


            // Affichage du Niveau 1
            if(game.stage.level === 1  && game.newLevel === 1){
                game.newLevel = 0;
                loader.load( 'src/medias/fonts/Three_Light.json', function ( font ) {
                    var geometry = new THREE.TextGeometry("Niveau 1", {
                        font: font,
                        size: 0.5,
                        height: 0.05,
                        curveSegments: 0.5,
                        bevelEnabled: false,
                        bevelThickness: 0.5,
                        bevelSize: 0.5,
                        bevelOffset: 0,
                        bevelSegments: 0.5
                    } );
                    geometry.center();
                    var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});;
                    mesh = new THREE.Mesh( geometry, material );
                    mesh.position.x = -6;
                    mesh.position.y = 5;
                    mesh.position.z = -2;
                    mesh.rotation.x = 0;
                    mesh.rotation.y = 3.14/6
                    mesh.name = "Level";
                    view.scene.add( mesh );
                    // Ajout du son correspondant au niveau 1
                    game.impact = soundFootball;
                } );
            }


            // Suppression de l'affichage du score adverse en cas de fin de niveau
            if(game.newLevel === 1 && (game.stage.level === 2 || game.stage.level === 3)){
                var scoreOffender = view.scene.getObjectByName( "scoreOffender" );
                view.scene.remove(scoreOffender);
                game.newLevel = 0;
            }


            // Le joueur marque un point
            if(player === "Player" || (game.player.score == 0 && game.offender.score == 0)){
                loader.load( 'src/medias/fonts/Three_Light.json', function ( font ) {
                    var geometry = new THREE.TextGeometry( game.player.score.toString(), {
                        font: font,
                        size: 0.5,
                        height: 0.05,
                        curveSegments: 0.5,
                        bevelEnabled: false,
                        bevelThickness: 0.5,
                        bevelSize: 0.5,
                        bevelOffset: 0,
                        bevelSegments: 0.5
                    } );
                    geometry.center();
                    var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});;
                    mesh = new THREE.Mesh( geometry, material );
                    mesh.position.x = 2;
                    mesh.position.y = 5;
                    mesh.position.z = 2.5;
                    mesh.rotation.x = -3.14159265/8;
                    mesh.name = "scorePlayer";
                    view.scene.add( mesh );
                } );
            }


            // L'adversaire marque un point
            if(player === "Offender" || (game.player.score == 0 && game.offender.score == 0)) {
                loader.load( 'src/medias/fonts/Three_Light.json', function ( font ) {

                    var geometry = new THREE.TextGeometry( game.offender.score.toString(), {
                        font: font,
                        size: 0.5,
                        height: 0.05,
                        curveSegments: 0.5,
                        bevelEnabled: false,
                        bevelThickness: 0.5,
                        bevelSize: 0.5,
                        bevelOffset: 0,
                        bevelSegments: 0.5
                    } );
                    geometry.center();
                    var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});;
                    mesh = new THREE.Mesh( geometry, material );
                    mesh.position.x = -2.4;
                    mesh.position.y = 5;
                    mesh.position.z = -1;
                    mesh.rotation.x = -3.14159265/8;
                    mesh.name = "scoreOffender";
                    view.scene.add( mesh );
                } );
            }


            // Repositionnement de la balle
            game.ball.z = -5;
            game.ball.x = 0;
            game.ball.vel.x = 0;
            game.ball.vel.z = 0;
            game.offender.x = 0;
            game.player.x = 0;

            setTimeout(function(){

                game.ball.vel.z = ball_vel_z > 0 ? game.ball.speed : -game.ball.speed;

            }, 1000);




        }

    },
    controller = {

        left 	: false,
        right 	: false
    },

    //  Three JS Setup
    view = {
        scene    : new THREE.Scene(),
        camera   : new THREE.PerspectiveCamera( game.fov, window.innerWidth / window.innerHeight, .1, 1000 ),
        renderer : new THREE.WebGLRenderer({alpha:true})
    }

// Set the size of the renderer to game dimensions
view.renderer.setSize( window.innerWidth - 10, window.innerHeight);

// Put the canvas element into document
document.body.appendChild( view.renderer.domElement);

// Background
class Background{
    initBackground(){
        const skyGeometry = new THREE.BoxGeometry(1500, 1500, 1500)
        const skyMaterials = [
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('src/medias/images/Background1/Ely1_nx.jpg'), //Right
                side: THREE.DoubleSide
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('src/medias/images/Background1/Ely1_px.jpg'), //Left
                side: THREE.DoubleSide
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('src/medias/images/Background1/Ely1_py.jpg'), //Up
                side: THREE.DoubleSide
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('src/medias/images/Background1/Ely1_pz.jpg'), //Down
                side: THREE.DoubleSide
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('src/medias/images/Background1/Ely1_pz.jpg'), //Back
                side: THREE.DoubleSide
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('src/medias/images/Background1/Ely1_pz.jpg'), //Front
                side: THREE.DoubleSide
            })
        ]
        const skyMaterial = THREE.MeshFaceMaterial(skyMaterials)
        this.mesh = new THREE.Mesh(skyGeometry, skyMaterial)
        view.scene.add(this.mesh)
    }
}


// Responsive
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
    view.camera.aspect = window.innerWidth / window.innerHeight;
    view.camera.updateProjectionMatrix();
    view.renderer.setSize( window.innerWidth, window.innerHeight );
}

// Elements de jeu

//  Raquettes
var baton_geometry = new THREE.CubeGeometry(game.player.w,game.player.h,game.player.d);
var playerBaton = new THREE.MeshLambertMaterial( { color: 0x14A6F4 } );
var opponentBaton = new THREE.MeshLambertMaterial( { color: 0xF41414 } );

//      Joueur
game.player.baton = new THREE.Mesh( baton_geometry, playerBaton );
game.player.baton.position.y += game.player.h/2;
view.scene.add( game.player.baton );

//      Adversaire
game.offender.baton = new THREE.Mesh( baton_geometry, opponentBaton );
game.offender.baton.position.y += game.offender.h/2;
game.offender.baton.position.z -= 10;
view.scene.add( game.offender.baton );

//  Balle
game.ball.cube = THREEx.SportBalls.createFootball();
game.ball.cube.position.y += game.ball.h/2;
game.ball.z = -5;
view.scene.add( game.ball.cube );

//  Terrain
var floor_geometry = new THREE.PlaneGeometry( 15, 10 );
var img = new THREE.MeshBasicMaterial({ map:THREE.ImageUtils.loadTexture('src/medias/images/soccerField.jpg')});
img.map.needsUpdate = true;
game.stage.mesh = new THREE.Mesh(floor_geometry, img);
game.stage.mesh.overdraw = true;
game.stage.mesh.material.side = THREE.DoubleSide;
game.stage.mesh.rotation.x = 1.57079633;
game.stage.mesh.position.z = -5;
view.scene.add( game.stage.mesh );

//  Adversaire
var advGeometry = new THREE.PlaneGeometry( 20, 15 );
var advImg = new THREE.MeshBasicMaterial({ map:THREE.ImageUtils.loadTexture('src/medias/images/zidane.jpg')});
img.map.needsUpdate = true;
game.offender.mesh = new THREE.Mesh(advGeometry, advImg);
game.offender.mesh.overdraw = true;
game.offender.mesh.material.side = THREE.DoubleSide;
game.offender.mesh.rotation.x = -3.14159265/10;
game.offender.mesh.position.z = -15;
game.offender.mesh.position.y = 5;
view.scene.add( game.offender.mesh );

//  Boucliers
//      Adversaire
var shieldGeometryOff = new THREE.PlaneGeometry( 15, 2, 4);
var shieldMaterial = new THREE.MeshPhongMaterial({color:0xFFFFFF, opacity: 0.5, transparent: true});
game.offender.shield = new THREE.Mesh(shieldGeometryOff, shieldMaterial);
game.offender.shield.material.side = THREE.DoubleSide;
game.offender.shield.position.z = -10.3;
view.scene.add(game.offender.shield);

//      Joueur
var shieldGeometryPla = new THREE.PlaneGeometry( 15, 1, 4);
game.player.shield = new THREE.Mesh(shieldGeometryPla, shieldMaterial);
game.player.shield.material.side = THREE.DoubleSide;
game.player.shield.position.z = 0.3;
view.scene.add(game.player.shield);

//  Sons de la balle
var listener = new THREE.AudioListener();
var listenerFond = new THREE.AudioListener();
view.camera.add( listener );
view.camera.add( listenerFond );

//      Football
var soundFootball = new THREE.Audio(listener);
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'src/medias/sounds/football.ogg', function( buffer ) {
    soundFootball.setBuffer( buffer );
    soundFootball.setLoop( false );
    soundFootball.setVolume( 1 );
});

//      Tennis
var soundTennis = new THREE.Audio(listener);
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'src/medias/sounds/tennis.ogg', function( buffer ) {
    soundTennis.setBuffer( buffer );
    soundTennis.setLoop( false );
    soundTennis.setVolume( 1 );
});

//      Basket
var soundBasket = new THREE.Audio(listener);
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'src/medias/sounds/basket.ogg', function( buffer ) {
    soundBasket.setBuffer( buffer );
    soundBasket.setLoop( false );
    soundBasket.setVolume( 1 );
});

//  Son d'ambiance
var sound = new THREE.Audio(listenerFond);
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'src/medias/sounds/musiqueFond.mp3', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( 0.25 );
    game.sound = sound;
});


// Positionnement de la caméra

//  Tout le terrain
function cameraTerrain(){
    view.camera.position.z = 6;
    view.camera.position.y = 8;
    view.camera.position.x = 0;
    view.camera.rotation.x = -3.14159265/8;
}
cameraTerrain();

//  Camera depuis la raquette du joueur
function cameraPlayer(){
    view.camera.position.x = game.player.baton.position.x;
    view.camera.position.y = game.player.baton.position.y;
    view.camera.position.z = game.player.baton.position.z;
}


// Eclairage
var directionalLight = new THREE.DirectionalLight( 0xcccccc, 1 );

directionalLight.position.set( 0, 1, 0 );
view.scene.add( directionalLight );

var directionalLight2 = new THREE.DirectionalLight( 0xcccccc, 1 );

directionalLight2.position.set( 0, 1, 1 );
view.scene.add( directionalLight2 );

var directionalLight3 = new THREE.DirectionalLight( 0xcccccc, 1 );

directionalLight3.position.set( 10, 1, 0 );
view.scene.add( directionalLight3 );

var directionalLight4 = new THREE.DirectionalLight( 0xcccccc, 1 );

directionalLight4.position.set( -10, 1, 0 );
view.scene.add( directionalLight4 );

// Initialisation du Background
var background = new Background();
background.initBackground();


function render() {

    if(controller.left && game.player.x - (game.player.w/2) > -(game.stage.w/2)){
        game.player.x -= game.player.speed;
        //view.camera.position.x -= 0.5;
    }

    if(controller.right && game.player.x + (game.player.w/2) < (game.stage.w/2)){
        game.player.x += game.player.speed;
        //view.camera.position.x += 0.5;
    }

    if(game.offender.x > game.ball.x && game.offender.x - (game.offender.w/2) > -(game.stage.w/2)){
        game.offender.x -= game.offender.speed;
        //view.camera.position.x -= 0.5;
    }

    if(game.offender.x < game.ball.x && game.offender.x + (game.offender.w/2) < (game.stage.w/2)){
        game.offender.x += game.offender.speed;
        //view.camera.position.x += 0.5;
    }

    game.ball.z += game.ball.vel.z;
    game.ball.x += game.ball.vel.x;

    game.ball.cube.position.z = game.ball.z;
    game.ball.cube.position.x = game.ball.x;
    game.player.baton.position.x = game.player.x;
    game.offender.baton.position.x = game.offender.x;

    // Collision
    if(	game.ball.z - (game.ball.d/2) <= game.stage.z - (game.stage.h/2) + (game.offender.d/2)){

        if( game.ball.x + (game.ball.d/2) > game.offender.x - (game.offender.w/2) &&
            game.ball.x - (game.ball.d/2) < game.offender.x + (game.offender.w/2)){
            game.ball.vel.z -= .005; // Accélération de la balle
            // Rebonds de la balle
            game.ball.vel.z *= -1;
            game.ball.vel.x = (game.ball.x - game.offender.x)/10;
            // Son du rebond de la balle
            game.impact.play();
        }
        else if(game.offender.shieldUp){  // S'il y a un bouclier
            game.ball.vel.z -= .005; // Accélération de la balle
            game.ball.vel.z *= -1; // Rebond de la balle
            // Désactivation du bouclier
            game.offender.shieldUp = false;
            view.scene.remove(game.offender.shield);
            // Son du rebond de la balle
            game.impact.play();
        }
        else{
            // Changement du score
            var scorePlayer = view.scene.getObjectByName( "scorePlayer" );
            view.scene.remove(scorePlayer);
            game.player.score ++;
            // Réactivation du bouclier
            view.scene.add(game.offender.shield);
            game.offender.shieldUp = true;
            // Reset du jeu
            game.reset("Player");
        }
    }

    if(game.ball.z + (game.ball.d/2) >= 0 - (game.player.d/2)){

        if( game.ball.x + (game.ball.d/2) > game.player.x - (game.player.w/2) &&
            game.ball.x - (game.ball.d/2) < game.player.x + (game.player.w/2)){
            game.ball.vel.z += .005; // Accélération de la balle
            // Rebonds de la balle
            game.ball.vel.z *= -1;
            game.ball.vel.x = (game.ball.x - game.player.x)/10;
            // Son du rebond de la balle
            game.impact.play();
        }
        else if(game.player.shieldUp && !game.player.invincible){ // S'il y a un bouclier
            game.ball.vel.z += .005; // Accélération de la balle
            game.ball.vel.z *= -1; // Rebond de la balle
            // Désactivation du bouclier
            game.player.shieldUp = false;
            view.scene.remove(game.player.shield);
            // Son du rebond de la balle
            game.impact.play();
        }
        else if(game.player.invincible){
            game.ball.vel.z += .005; // Accélération de la balle
            game.ball.vel.z *= -1; // Rebond de la balle
            game.impact.play();
        }
        else{
            // Changement du score
            var scoreOffender = view.scene.getObjectByName( "scoreOffender" );
            view.scene.remove(scoreOffender);
            game.offender.score ++;
            // Réactivation du bouclier
            view.scene.add(game.player.shield);
            game.player.shieldUp = true;
            // Reset du jeu
            game.reset("Offender");
        }

    }

    if(game.ball.x > (game.stage.w/2))
        game.ball.vel.x *= -1;

    if(game.ball.x < -(game.stage.w/2))
        game.ball.vel.x *= -1;


    requestAnimationFrame(render);
    view.renderer.render(view.scene, view.camera);
}

render();

game.reset();

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}


function makeScreenshot() {
    html2canvas(document.body, {
        onrendered: function(canvas)
        {
            canvas.toBlob(function(blob) {
                saveAs(blob, "wholePage.png");
            });
        }
    });
}

function accelerationJoueur(){
    game.player.speed += 0.02;
}


let leftAcc;
let rightAcc;



function clearAcc(){
    clearInterval(rightAcc);
    clearInterval(leftAcc);
}

// Controllers
document.onkeydown=function(e){


    if(e.keyCode == 37){
        clearAcc();
        controller.left = true;
        leftAcc = setInterval(accelerationJoueur, 50);
    }

    if(e.keyCode == 39)
    {
        clearAcc();
        controller.right = true;
        rightAcc = setInterval(accelerationJoueur, 50);
    }

    // Caméra de la barre : é
    if(e.keyCode == 50){
        cameraPlayerInt = setInterval(cameraPlayer, 20)
    }

    // Caméra du terrain global : &
    if(e.keyCode == 49){
        clearInterval(cameraPlayerInt);
        cameraTerrain();
    }

    // Plein écran : f
    if(e.keyCode == 70){
        openFullscreen();
    }

    // Screenshot : p
    if(e.keyCode == 80){
        makeScreenshot();
    }

    // Activation ou désactivation de la musique de fond : s
    if(e.keyCode == 83){
        if(!game.soundActive){
            game.sound.play();
            game.soundActive = true;
        }
        else{
            game.sound.stop();
            game.soundActive = false;
        }
    }

    // Activation du mode invincible : i
    if(e.keyCode == 73){
        if(!game.player.invincible){
            game.player.invincible = true;
        }
        else{
            game.player.invincible = false;
        }
    }

    // Activation du mode ralenti de l'adversaire : r
    if(e.keyCode == 82){
        if(!game.offender.ralenti){
            game.offender.ralenti = true;
            game.offender.speed = 0.025
        }
        else{
            game.offender.ralenti = false;
            if(game.stage.level == 1){
                game.offender.speed = 0.06;
            }
            else if(game.stage.level == 2){
                game.offender.speed = 0.085;
            }
            else if(game.stage.level == 3){
                game.offender.speed = 0.10;
            }
        }
    }

    // Désactivation du bouclier adverse : k
    if(e.keyCode == 75){
        if(game.offender.shieldUp){
            game.offender.shieldUp = false;
            view.scene.remove(game.offender.shield);
        }
    }

};

document.onkeyup=function(e){

    if(e.keyCode == 37){
        clearAcc()
        game.player.speed = 0.20;
        controller.left = false;
    }

    if(e.keyCode == 39)
    {
        clearAcc();
        game.player.speed = 0.20;
        controller.right = false;
    }
};