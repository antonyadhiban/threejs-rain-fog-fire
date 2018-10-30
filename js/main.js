// stats code
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()

//WebGL Stuff
if ( WEBGL.isWebGLAvailable() === false ) {
    document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

// require statements
VolumetricFire.texturePath = 'textures/';

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xA9A9A9 );
scene.fog = new THREE.FogExp2( 0xA9A9A9, 0.04 );
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var clock = new THREE.Clock();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})


// SET CONTROLS
controls = new THREE.OrbitControls( camera, renderer.domElement );

// ADD LOD SPHERE
var lod = new THREE.LOD();

for( var i = 0; i < 3; i++ ) {
var geometry = new THREE.IcosahedronBufferGeometry( 1, 3 - i );
var material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} );
var mesh = new THREE.Mesh( geometry, material );
// var sphere = new THREE.Mesh( geometry, material );
lod.addLevel( mesh, i * 75 );
}
scene.add( lod );

// HELPER AXES FOR REFERENCE
var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );




// FIRE 
// var scene = new THREE.Scene();

var tex = THREE.ImageUtils.loadTexture("Fire.png");
var fire = new THREE.Fire( tex );
fire.position.y += 1;

scene.add( fire );
// ********************************

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// create the rain particles
var material = new THREE.PointsMaterial({
    color: 0xfffcc
});

var geometry = new THREE.Geometry();
var x, y, z;

function create_random_points(){
    x = (Math.random() * 800) - 400;
    y = (Math.random() * 800) - 400;
    z = (Math.random() * 800) - 400;
    geometry.vertices.push(new THREE.Vector3(x, y, z));
}

for(var i = 0; i < 10000; i+=1){
    create_random_points();
}

var pointCloud = new THREE.Points(geometry, material);

scene.add(pointCloud);

// ********************************


// SET CAMERA OFFSET
camera.position.z = 20;

var update = function () {

};



function render(){  
    // requestAnimationFrame(render);  
    var elapsed = clock.getElapsedTime();
    geometry.vertices.forEach(function(particle){
        var dX, dY, dZ;    
        // dX = Math.random() * 2 - 1;    
        // dY = Math.random() * 2 - 1;    
        // dZ = Math.random() * 2 - 1;   
        dX = 0;    
        dY = -7;    
        dZ = 0;  
        particle.add(new THREE.Vector3(dX, dY, dZ));  
        // Reset position of particles after it hits a point
        if(particle.y < -200) particle.y += 400;
        
    }) 


    geometry.verticesNeedUpdate = true;  
    update(camera);
    fire.update( elapsed );
    renderer.render(scene, camera);
}



// run game loop (update, render, repeat)
var GameLoop = function () {
    requestAnimationFrame(GameLoop);
    update();
    render();
};

GameLoop();

