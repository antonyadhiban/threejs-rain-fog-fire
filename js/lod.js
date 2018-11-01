if ( WEBGL.isWebGLAvailable() === false ) {
    document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}
var container;
var camera, scene, renderer;
var controls, clock = new THREE.Clock();
var geometry, mesh, lod;
var group = new THREE.Group();
init();
animate();
function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 15000 );
    camera.position.z = 1000;
    controls = new THREE.FlyControls( camera );
    controls.movementSpeed = 1000;
    controls.rollSpeed = Math.PI / 10;
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, 1, 15000 );
    scene.autoUpdate = false;
    var light = new THREE.PointLight( 0xff2200 );
    light.position.set( 0, 0, 0 );
    scene.add( light );
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 0, 1 ).normalize();
    scene.add( light );
    geometry = [
        [ new THREE.IcosahedronBufferGeometry( 2, 4 ), 5 ],
        [ new THREE.IcosahedronBufferGeometry( 2, 3 ), 30 ],
        [ new THREE.IcosahedronBufferGeometry( 2, 2 ), 100 ],
        [ new THREE.IcosahedronBufferGeometry( 2, 1 ), 200 ],
        [ new THREE.IcosahedronBufferGeometry( 2, 0 ), 800 ]
    ];
    var material = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: false } );
    var i, j;
    for ( j = 0; j < 5000; j ++ ) {
        lod = new THREE.LOD();
        for ( i = 0; i < geometry.length; i ++ ) {
            mesh = new THREE.Mesh( geometry[ i ][ 0 ], material );
            mesh.scale.set( 1.5, 1.5, 1.5 );
            mesh.updateMatrix();
            mesh.matrixAutoUpdate = false;
            lod.addLevel( mesh, geometry[ i ][ 1 ] );
        }
        lod.position.x = 4000 * ( 0.5 - Math.random() );
        lod.position.y = 3000 * ( 0.5 - Math.random() );
        lod.position.z = 4000 * ( 0.5 - Math.random() );
        lod.updateMatrix();
        lod.matrixAutoUpdate = false;
        group.add(lod);
        // scene.add( lod );
    }
    scene.add(group);
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    //
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    group.position.y += -70;
    if(group.position.y < -1000) group.position.y += 2000;
    // for(var i = 0; i < group.children.length; i+=1){
    //    console.log(group.children[i]);
    //    group.children[i].position.y += 1;
    // }
    // console.log(group.children[0]);
    controls.update( clock.getDelta() );
    scene.updateMatrixWorld();
    scene.traverse( function ( object ) {
        if ( object instanceof THREE.LOD ) {
            object.update( camera );
        }
    } );
    renderer.render( scene, camera );
}