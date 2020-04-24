var game = {

        newLevel : 1,
        w : 1200,
        h : 800,
        fov : 75,
        sound : null,
        soundActive : false,
        impact : null,
        lastHit : null,
        timeoutStart : null,
        lastWinner : null,
        textContainer : document.querySelector('#labels'),
        textToDisplay : null,
        goalContainer : document.querySelector('#goals'),
        helpContainer : document.querySelector('#help'),
        helpText : document.createElement('div'),
        stop : true,
        restartNew : false,
        helpDisplayed : false,
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
            invincible : false,
            barreAgr : false,
            barreRed : false,
            barreCD : null,
            goalText : document.createElement('div')
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
            ralenti : false,
            barreAgr : false,
            barreRed : false,
            barreCD : null,
            goalText : document.createElement('div')
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
        joker :{
            shield:{
                meshFront : null,
                meshBack : null,
                up : false,
                sound : null
            },
            barre:{
                meshFront : null,
                meshBack : null,
                up : false,
                sound : null
            },
            barreMin:{
                meshFront : null,
                meshBack : null,
                up : false,
                sound : null
            },
            destruction:{
                meshFront : null,
                meshBack : null,
                up : false,
                sound : null
            }
        },
        reset : function(player){

            game.player.goalText.textContent = "BUUUT ! Vous avez marqué !"
            game.offender.goalText.textContent = "BUUUT ! Votre adversaire a marqué !"

            var ball_vel_z = game.ball.vel.z;

            var loader = new THREE.FontLoader();

            if(game.offender.score === 3){
                game.goalContainer.appendChild(game.offender.goalText);
                setTimeout(function(){game.goalContainer.removeChild(game.offender.goalText);}, 1000);
                game.textToDisplay = document.createElement('div');
                game.textToDisplay.textContent = 'Vous avez perdu ! Si vous souhaitez rejouer, appuyez sur Entrée !';
                game.textContainer.appendChild(game.textToDisplay);
                game.stop = true;
                game.restartNew = true;
            }

            // Redémarrage du jeu
            if(game.restartNew){
                game.offender.score = 0;
                game.player.score = 0;
                game.stage.level = 1;
                // Changement de la balle
                view.scene.remove(game.ball.cube);
                game.ball.cube = THREEx.SportBalls.createFootball();
                view.scene.add(game.ball.cube);
                // Changement du terrain
                view.scene.remove(game.stage.mesh);
                img = new THREE.MeshBasicMaterial({ map:THREE.ImageUtils.loadTexture('src/medias/images/soccerField.jpg')});
                img.map.needsUpdate = true;
                game.stage.mesh = new THREE.Mesh(floor_geometry, img);
                game.stage.mesh.overdraw = true;
                game.stage.mesh.material.side = THREE.DoubleSide;
                game.stage.mesh.rotation.x = 1.57079633;
                game.stage.mesh.position.z = -5;
                view.scene.add( game.stage.mesh );
                // Changement d'adversaire
                view.scene.remove(game.offender.mesh);
                advGeometry = new THREE.PlaneGeometry( 20, 15 );
                advImg = new THREE.MeshBasicMaterial({ map:THREE.ImageUtils.loadTexture('src/medias/images/zidane.jpg')});
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
                    game.offender.speed = 0.06;
                }
                game.ball.speed = .125;
                // Effacement du score
                var scorePlayer = view.scene.getObjectByName( "scorePlayer" );
                view.scene.remove(scorePlayer);
                // Remise en position du bouclier de l'adversaire
                if(!game.offender.shieldUp){
                    game.offender.shieldUp = true;
                    activateShieldOff();
                }
                // Changement du son correspondant au niveau 1
                game.impact = soundFootball;
                // Affichage du niveau
                var level = view.scene.getObjectByName( "Level" );
                view.scene.remove(level);
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
                } );
                game.restartNew = false;
            }

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
                // Affichage des messages de but et de changement de niveau
                game.goalContainer.appendChild(game.offender.goalText);
                setTimeout(function(){game.goalContainer.removeChild(game.offender.goalText);}, 1000)
                game.textToDisplay = document.createElement('div');
                game.textToDisplay.textContent = 'Vous avez gagné ! Vous passez au niveau 2 ! Appuyez sur Entrée pour jouer !';
                game.textContainer.appendChild(game.textToDisplay);
                game.stop = true;
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
                // Affichage des messages de but et de changement de niveau
                game.goalContainer.appendChild(game.offender.goalText);
                setTimeout(function(){game.goalContainer.removeChild(game.offender.goalText);}, 1000)
                game.textToDisplay = document.createElement('div');
                game.textToDisplay.textContent = 'Vous avez gagné ! Vous passez au niveau 3 ! Appuyez sur Entrée pour jouer !';
                game.textContainer.appendChild(game.textToDisplay);
                game.stop = true;
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
                game.textToDisplay = document.createElement('div');
                game.textToDisplay.textContent = 'Bienvenue dans le jeu Pong de Maxime CARIN ! Pour jouer, appuyez sur Entrée !';
                game.textContainer.appendChild(game.textToDisplay);
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
                if(game.player.score != 0){
                    game.goalContainer.appendChild(game.player.goalText);
                    setTimeout(function(){game.goalContainer.removeChild(game.player.goalText);}, 1000)
                }
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
                if(game.offender.score != 0){
                    game.goalContainer.appendChild(game.offender.goalText);
                    setTimeout(function(){game.goalContainer.removeChild(game.offender.goalText);}, 1000)
                }
            }


            // Repositionnement de la balle
            game.ball.z = -5;
            game.ball.x = 0;
            game.ball.vel.x = 0;
            game.ball.vel.z = 0;
            game.offender.x = 0;
            game.player.x = 0;

            game.lastWinner = ball_vel_z;

            if(!game.stop){
                game.timeoutStart = setTimeout(function(){

                    game.ball.vel.z = ball_vel_z > 0 ? game.ball.speed : -game.ball.speed;

                }, 2000);
            }
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

// Aide

game.helpText.textContent = ""

// Elements de jeu

//  Raquettes

var playerBaton = new THREE.MeshLambertMaterial( { color: 0x14A6F4 } );
var opponentBaton = new THREE.MeshLambertMaterial( { color: 0xF41414 } );
var batonGeometry = null;

//      Joueur
function genererBarrePla(w, h, d){
    if(game.player.baton != null){
        view.scene.remove(game.player.baton);
    }
    game.player.w = w;
    batonGeometry = new THREE.CubeGeometry(w, h, d);
    game.player.baton = new THREE.Mesh( batonGeometry, playerBaton );
    game.player.baton.position.y += game.player.h/2;
    view.scene.add( game.player.baton );
    if(w === 3){
        game.player.barreAgr = false;
        game.player.barreRed = false;
        game.player.barreCD = null;
    }
}
genererBarrePla(game.player.w, game.player.h, game.player.d);


//      Adversaire
function genererBarreOff(w, h, d){
    if(game.offender.baton != null){
        view.scene.remove(game.offender.baton);
    }
    batonGeometry = new THREE.CubeGeometry(w, h, d);
    game.offender.w = w;
    game.offender.baton = new THREE.Mesh( batonGeometry, opponentBaton );
    game.offender.baton.position.y += game.offender.h/2;
    game.offender.baton.position.z -= 10;
    view.scene.add( game.offender.baton );
    if(w === 3){
        game.offender.barreAgr = false;
        game.offender.barreRed = false;
        game.offender.barreCD = null;
    }
}
genererBarreOff(game.offender.w, game.offender.h, game.offender.d);

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

function activateShieldOff(){
    var shieldGeometryOff = new THREE.PlaneGeometry( 15, 2, 4);
    var shieldMaterial = new THREE.MeshPhongMaterial({color:0xFFFFFF, opacity: 0.5, transparent: true});
    game.offender.shield = new THREE.Mesh(shieldGeometryOff, shieldMaterial);
    game.offender.shield.material.side = THREE.DoubleSide;
    game.offender.shield.position.z = -10.3;
    view.scene.add(game.offender.shield);
}
activateShieldOff();

//      Joueur
function activateShieldPla(){
    var shieldMaterial = new THREE.MeshPhongMaterial({color:0xFFFFFF, opacity: 0.5, transparent: true});
    var shieldGeometryPla = new THREE.PlaneGeometry( 15, 1, 4);
    game.player.shield = new THREE.Mesh(shieldGeometryPla, shieldMaterial);
    game.player.shield.material.side = THREE.DoubleSide;
    game.player.shield.position.z = 0.3;
    view.scene.add(game.player.shield);
}
activateShieldPla();


//  Jokers
//      Textures
//          Bouclier supplémentaire

function ajoutJokShield(x, y, z){
    const jokShieldGeometry = new THREE.PlaneGeometry( 1, 1 );
    textureJokShield = new THREE.MeshBasicMaterial ({transparent : true,
        map : new THREE.TextureLoader().load("src/medias/images/shieldJok.png")});
    var jokShieldMaterial = new THREE.MeshFaceMaterial (textureJokShield);
    game.joker.shield.meshFront = new THREE.Mesh(jokShieldGeometry, jokShieldMaterial);
    game.joker.shield.meshFront.position.x = x;
    game.joker.shield.meshFront.position.y = y;
    game.joker.shield.meshFront.position.z = z;
    game.joker.shield.meshBack = new THREE.Mesh(jokShieldGeometry, jokShieldMaterial);
    game.joker.shield.meshBack.position.x = x;
    game.joker.shield.meshBack.position.y = y;
    game.joker.shield.meshBack.position.z = z;
    game.joker.shield.meshBack.rotation.y = Math.PI;
    view.scene.add(game.joker.shield.meshBack);
    view.scene.add(game.joker.shield.meshFront);
}

//          Agrandissement de la barre
function ajoutJokBarre(x, y, z){
    const jokBarreGeometry = new THREE.PlaneGeometry( 1, 1 );
    textureJokBarre = new THREE.MeshBasicMaterial ({transparent : true,
        map : new THREE.TextureLoader().load("src/medias/images/barreJok.png")});
    var jokBarreMaterial = new THREE.MeshFaceMaterial (textureJokBarre);
    game.joker.barre.meshFront = new THREE.Mesh(jokBarreGeometry, jokBarreMaterial);
    game.joker.barre.meshFront.position.x = x;
    game.joker.barre.meshFront.position.y = y;
    game.joker.barre.meshFront.position.z = z;
    game.joker.barre.meshBack = new THREE.Mesh(jokBarreGeometry, jokBarreMaterial);
    game.joker.barre.meshBack.position.x = x;
    game.joker.barre.meshBack.position.y = y;
    game.joker.barre.meshBack.position.z = z;
    game.joker.barre.meshBack.rotation.y = Math.PI;
    view.scene.add(game.joker.barre.meshBack);
    view.scene.add(game.joker.barre.meshFront);
}

//          Diminution de la barre
function ajoutJokBarreMin(x, y, z){
    const jokBarreMinGeometry = new THREE.PlaneGeometry( 1, 1 );
    textureJokBarreMin = new THREE.MeshBasicMaterial ({transparent : true,
        map : new THREE.TextureLoader().load("src/medias/images/barreMin.png")});
    var jokBarreMinMaterial = new THREE.MeshFaceMaterial (textureJokBarreMin);
    game.joker.barreMin.meshFront = new THREE.Mesh(jokBarreMinGeometry, jokBarreMinMaterial);
    game.joker.barreMin.meshFront.position.x = x;
    game.joker.barreMin.meshFront.position.y = y;
    game.joker.barreMin.meshFront.position.z = z;
    game.joker.barreMin.meshBack = new THREE.Mesh(jokBarreMinGeometry, jokBarreMinMaterial);
    game.joker.barreMin.meshBack.position.x = x;
    game.joker.barreMin.meshBack.position.y = y;
    game.joker.barreMin.meshBack.position.z = z;
    game.joker.barreMin.meshBack.rotation.y = Math.PI;
    view.scene.add(game.joker.barreMin.meshBack);
    view.scene.add(game.joker.barreMin.meshFront);
}

//          Destruction du bouclier adverse
function ajoutJokDestruction(x, y, z){
    const jokDestructionGeometry = new THREE.PlaneGeometry( 1, 1 );
    textureJokDestruction = new THREE.MeshBasicMaterial ({transparent : true,
        map : new THREE.TextureLoader().load("src/medias/images/destruction.png")});
    var jokDestructionMaterial = new THREE.MeshFaceMaterial (textureJokDestruction);
    game.joker.destruction.meshFront = new THREE.Mesh(jokDestructionGeometry, jokDestructionMaterial);
    game.joker.destruction.meshFront.position.x = x;
    game.joker.destruction.meshFront.position.y = y;
    game.joker.destruction.meshFront.position.z = z;
    game.joker.destruction.meshBack = new THREE.Mesh(jokDestructionGeometry, jokDestructionMaterial);
    game.joker.destruction.meshBack.position.x = x;
    game.joker.destruction.meshBack.position.y = y;
    game.joker.destruction.meshBack.position.z = z;
    game.joker.destruction.meshBack.rotation.y = Math.PI;
    view.scene.add(game.joker.destruction.meshBack);
    view.scene.add(game.joker.destruction.meshFront);
}

// Apparition des jokers

function apparitionJoker(){
    // Random d'un nombre pour l'apparition ou non du joker
    randomJok = Math.floor(Math.random() * 101);

    // Random de 3 nombres pour la position du joker
    x = Math.floor(Math.random() * 12) - 6;
    z = Math.floor(Math.random() * -9);

    // Apparition joker bouclier
    if(randomJok < 10  && !game.joker.shield.up){
        ajoutJokShield(x, 0.5, z);
        game.joker.shield.up = true;
    }

    // Apparition joker augmentation de la taille de la barre
    if(randomJok < 20 && randomJok > 10 && !game.joker.barre.up){
        ajoutJokBarre(x, 0.5, z);
        game.joker.barre.up = true;
    }

    // Apparition réduction de barre
    if(randomJok < 30 && randomJok > 20 && !game.joker.barreMin.up){
        ajoutJokBarreMin(x, 0.5, z);
        game.joker.barreMin.up = true;
    }

    // Apparition destruction
    if(randomJok < 40 && randomJok > 30 && !game.joker.destruction.up){
        ajoutJokDestruction(x, 0.5, z);
        game.joker.destruction.up = true;
    }
}


//  Sons de la balle
var listener = new THREE.AudioListener();
var listenerFond = new THREE.AudioListener();
var listenerJokB = new THREE.AudioListener();
var listenerJokA = new THREE.AudioListener();
var listenerJokD = new THREE.AudioListener();
var listenerJokDB = new THREE.AudioListener();
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

//  Sons de jokers
//      Bouclier

var soundJokB = new THREE.Audio(listenerJokB);
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'src/medias/sounds/shield.wav', function( buffer ) {
    soundJokB.setBuffer( buffer );
    soundJokB.setLoop( false );
    soundJokB.setVolume( 0.75 );
    game.joker.shield.sound = soundJokB;
});

//      Allongement de la barre

var soundJokA = new THREE.Audio(listenerJokA);
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'src/medias/sounds/augment.wav', function( buffer ) {
    soundJokA.setBuffer( buffer );
    soundJokA.setLoop( false );
    soundJokA.setVolume( 0.75 );
    game.joker.barre.sound = soundJokA;
});

//      Diminution de la barre

var soundJokD = new THREE.Audio(listenerJokD);
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'src/medias/sounds/reduc.wav', function( buffer ) {
    soundJokD.setBuffer( buffer );
    soundJokD.setLoop( false );
    soundJokD.setVolume( 0.75 );
    game.joker.barreMin.sound = soundJokD;
});

//      Destruction du bouclier

var soundJokDB = new THREE.Audio(listenerJokDB);
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'src/medias/sounds/destru.mp3', function( buffer ) {
    soundJokDB.setBuffer( buffer );
    soundJokDB.setLoop( false );
    soundJokDB.setVolume( 0.75 );
    game.joker.destruction.sound = soundJokDB;
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

// Joker
//  Barre agrandie
function activateBarreAgr(player){
    if(player === "Player"){
        genererBarrePla(4, game.player.h, game.player.d);
        if(game.player.barreCD != null){
            window.clearTimeout(game.player.barreCD);
        }
        game.player.barreCD = setTimeout(function(){ genererBarrePla(3, game.player.h, game.player.d); }, 5000)
        setTimeout(function(){game.player.barreAgr = false;}, 5000);
    }
    else{
        genererBarreOff(4, game.offender.h, game.offender.d);
        if(game.offender.barreCD != null){
            window.clearTimeout(game.offender.barreCD);
        }
        game.offender.barreCD = setTimeout(function(){ genererBarreOff(3, game.offender.h, game.offender.d); }, 5000)
        setTimeout(function(){game.offender.barreAgr = false;}, 5000);
    }
}

//  Barre réduite
function activateBarreReduite(player){
    if(player === "Player"){
        genererBarreOff(2, game.offender.h, game.offender.d);
        if(game.offender.barreCD != null){
            window.clearTimeout(game.offender.barreCD);
        }
        game.offender.barreCD = setTimeout(function(){ genererBarreOff(3, game.offender.h, game.offender.d);}, 5000)
        setTimeout(function(){game.offender.barreRed = false;}, 5000);
    }
    else{
        genererBarrePla(2, game.player.h, game.player.d);
        if(game.player.barreCD != null){
            window.clearTimeout(game.player.barreCD);
        }
        game.player.barreCD = setTimeout(function(){ genererBarrePla(3, game.player.h, game.player.d); }, 5000)
        setTimeout(function(){game.player.barreRed = false;}, 5000);
    }
}


function render() {

    // Rotation des jokers
    //  Bouclier
    if(game.joker.shield.up){
        game.joker.shield.meshFront.rotation.y += 0.01
        game.joker.shield.meshBack.rotation.y += 0.01
    }

    //  Barre
    if(game.joker.barre.up){
        game.joker.barre.meshFront.rotation.y += 0.01
        game.joker.barre.meshBack.rotation.y += 0.01
    }

    //  Réduction barre
    if(game.joker.barreMin.up){
        game.joker.barreMin.meshFront.rotation.y += 0.01
        game.joker.barreMin.meshBack.rotation.y += 0.01
    }

    //  Destruction bouclier
    if(game.joker.destruction.up){
        game.joker.destruction.meshFront.rotation.y += 0.01
        game.joker.destruction.meshBack.rotation.y += 0.01
    }


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

    // Collision avec les jokers
    //  Bouclier
    if(game.joker.shield.up){
        if((game.ball.x - 0.75 < game.joker.shield.meshFront.position.x && game.joker.shield.meshFront.position.x < game.ball.x + 0.75)
        && (game.ball.z - 0.75 < game.joker.shield.meshFront.position.z && game.joker.shield.meshFront.position.z < game.ball.z + 0.75)){
            view.scene.remove(game.joker.shield.meshFront);
            view.scene.remove(game.joker.shield.meshBack);
            game.joker.shield.up = false;
            if(game.lastHit === "Player" && !game.player.shieldUp){
                game.player.shieldUp = true;
                game.joker.shield.sound.play();
                activateShieldPla()
            }
            if(game.lastHit === "Offender" && !game.offender.shieldUp){
                game.offender.shieldUp = true;
                game.joker.shield.sound.play();
                activateShieldOff()
            }
        }
    }

    //  Allongement barre
    if(game.joker.barre.up){
        if((game.ball.x - 0.75 < game.joker.barre.meshFront.position.x && game.joker.barre.meshFront.position.x < game.ball.x + 0.75)
            && (game.ball.z - 0.75 < game.joker.barre.meshFront.position.z && game.joker.barre.meshFront.position.z < game.ball.z + 0.75)) {
            view.scene.remove(game.joker.barre.meshFront);
            view.scene.remove(game.joker.barre.meshBack);
            game.joker.barre.up = false;
            if(game.lastHit === "Player" && !game.player.barreAgr){
                game.player.barreAgr = true;
                game.joker.barre.sound.play();
                activateBarreAgr(game.lastHit);
            }
            if(game.lastHit === "Offender" && !game.offender.barreAgr){
                game.offender.barreAgr = true;
                game.joker.barre.sound.play();
                activateBarreAgr(game.lastHit);
            }
        }
    }

    //  Réduction Barre adverse
    if(game.joker.barreMin.up){
        if((game.ball.x - 0.75 < game.joker.barreMin.meshFront.position.x && game.joker.barreMin.meshFront.position.x < game.ball.x + 0.75)
            && (game.ball.z - 0.75 < game.joker.barreMin.meshFront.position.z && game.joker.barreMin.meshFront.position.z < game.ball.z + 0.75)) {
            view.scene.remove(game.joker.barreMin.meshFront);
            view.scene.remove(game.joker.barreMin.meshBack);
            game.joker.barreMin.up = false;
            if(game.lastHit === "Player" && !game.offender.barreRed){
                game.offender.barreRed = true;
                game.joker.barreMin.sound.play();
                activateBarreReduite(game.lastHit);
            }
            if(game.lastHit === "Offender" && !game.player.barreRed){
                game.player.barreRed = true;
                game.joker.barreMin.sound.play();
                activateBarreReduite(game.lastHit);
            }
        }
    }

    // Destruction bouclier adversaire
    if(game.joker.destruction.up){
        if((game.ball.x - 0.75 < game.joker.destruction.meshFront.position.x && game.joker.destruction.meshFront.position.x < game.ball.x + 0.75)
            && (game.ball.z - 0.75 < game.joker.destruction.meshFront.position.z && game.joker.destruction.meshFront.position.z < game.ball.z + 0.75)) {
            view.scene.remove(game.joker.destruction.meshFront);
            view.scene.remove(game.joker.destruction.meshBack);
            game.joker.destruction.up = false;
            if(game.lastHit === "Player" && game.offender.shieldUp){
                game.offender.shieldUp = false;
                game.joker.destruction.sound.play();
                view.scene.remove(game.offender.shield);
            }
            if(game.lastHit === "Offender" && game.player.shieldUp){
                game.player.shieldUp = false;
                game.joker.destruction.sound.play();
                view.scene.remove(game.player.shield);
            }
        }
    }

    // Collision avec les raquettes
    if(	game.ball.z - (game.ball.d/2) <= game.stage.z - (game.stage.h/2) + (game.offender.d/2)){

        apparitionJoker();

        if( game.ball.x + (game.ball.d/2) > game.offender.x - (game.offender.w/2) &&
            game.ball.x - (game.ball.d/2) < game.offender.x + (game.offender.w/2)){
            game.ball.vel.z -= .005; // Accélération de la balle
            // Rebonds de la balle
            game.ball.vel.z *= -1;
            game.ball.vel.x = (game.ball.x - game.offender.x)/10;
            // Son du rebond de la balle
            game.impact.play();
            // Le dernier joueur a avoir tapé la balle est le joueur : Offender
            game.lastHit = "Offender";

        }
        else if(game.offender.shieldUp){  // S'il y a un bouclier
            game.ball.vel.z -= .005; // Accélération de la balle
            game.ball.vel.z *= -1; // Rebond de la balle
            // Désactivation du bouclier
            game.offender.shieldUp = false;
            view.scene.remove(game.offender.shield);
            // Son du rebond de la balle
            game.impact.play();
            // Le dernier joueur a avoir tapé la balle est le joueur : Player
            game.lastHit = "Offender";
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

        apparitionJoker();

        if( game.ball.x + (game.ball.d/2) > game.player.x - (game.player.w/2) &&
            game.ball.x - (game.ball.d/2) < game.player.x + (game.player.w/2)){
            game.ball.vel.z += .005; // Accélération de la balle
            // Rebonds de la balle
            game.ball.vel.z *= -1;
            game.ball.vel.x = (game.ball.x - game.player.x)/10;
            // Son du rebond de la balle
            game.impact.play();
            // Le dernier joueur a avoir tapé la balle est le joueur : Player
            game.lastHit = "Player";
        }
        else if(game.player.shieldUp && !game.player.invincible){ // S'il y a un bouclier
            game.ball.vel.z += .005; // Accélération de la balle
            game.ball.vel.z *= -1; // Rebond de la balle
            // Désactivation du bouclier
            game.player.shieldUp = false;
            view.scene.remove(game.player.shield);
            // Son du rebond de la balle
            game.impact.play();
            game.lastHit = "Player";
        }
        else if(game.player.invincible){
            game.ball.vel.z += .005; // Accélération de la balle
            game.ball.vel.z *= -1; // Rebond de la balle
            game.impact.play();
            game.lastHit = "Player";
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

    if (e.keyCode == 13 && game.stop) {
        window.clearTimeout(game.timeoutStart);
        game.ball.vel.z = game.lastWinner > 0 ? game.ball.speed : -game.ball.speed;
        game.textContainer.removeChild(game.textToDisplay);
        if(game.stop){
            game.stop = false;
        }
    }

    if(e.keyCode == 72){
        if(game.helpDisplayed){
            game.helpContainer.removeChild(game.helpText);
            game.helpDisplayed = false;
        }
        else{
            game.helpText.innerHTML = "AIDE : <br>" +
                "<- Fleches -> : Déplacements des barres <br>" +
                "& : Afficher la caméra terrain <br>" +
                "é : Afficher la caméra de la barre du joueur <br>" +
                "f : Passer en plein écran (échap pour quitter) <br>" +
                "s : Activer ou désactiver la musique de fond <br>" +
                "h : Afficher ou cacher l'aide <br>" +
                "Codes : <br>" +
                "r : Activer ou désactiver le mode ralenti de l'adversaire <br>" +
                "k : Désactiver le bouclier adverse" ;
            game.helpContainer.appendChild(game.helpText);
            game.helpDisplayed = true;
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