// stats code
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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

controls = new THREE.OrbitControls( camera, renderer.domElement );

// create the shape
var geometry = new THREE.BufferGeometry(1, 1, 1);

// create a material, color, image texture
var material = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: false });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

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

for(var i = 0; i < 1000; i+=1){
    create_random_points();
}

// _.times(1000, function(n){
//     x = (Math.random() * 800) - 400;
//   y = (Math.random() * 800) - 400;
//   z = (Math.random() * 800) - 400;
//   geometry.vertices.push(new THREE.Vector3(x, y, z));
// })

var pointCloud = new THREE.Points(geometry, material);
scene.add(pointCloud);


camera.position.z = 10;


var update = function () {

};



function render(){  
    window.requestAnimationFrame(render);  
        // requestAnimationFrame(render);
    geometry.vertices.forEach(function(particle){
        var dX, dY, dZ;    
        // dX = Math.random() * 2 - 1;    
        // dY = Math.random() * 2 - 1;    
        // dZ = Math.random() * 2 - 1;   
        dX = 0;    
        dY = -0.01;    
        dZ = 0;  
        particle.add(new THREE.Vector3(dX, dY, dZ));  
        // particle.parent.add(new THREE.rotation(dY));  
        // particle.rotation.y += 0.05;
        
    }) 
    geometry.verticesNeedUpdate = true;  

    renderer.render(scene, camera);
}



// run game loop (update, render, repeat)
var GameLoop = function () {
    requestAnimationFrame(GameLoop);
    update();
    render();
};

GameLoop();

