
var gl;
var program;
var bufferID;
var vPosition;
var current;

var house = [
			vec2(-0.75, 0),
			vec2(-1,0),
			vec2(0,1),
			vec2(1,0),
			vec2(0.75,0),
			vec2(0.75,-1),
			vec2(-0.75,-1)//,
			
		];
var octagon = [	
			vec2(-1, -.5),
			vec2(-1, .5),
			vec2(-.5, 1),
			vec2(.5, 1),
			vec2(1, .5),
			vec2(1, -.5),
			vec2(.5, -1),
			vec2(-.5, -1),
		];
		
var pacman = [
			vec2(0,0),
			vec2(.75, .5),
			vec2(.5, .75),
			vec2(.1,.9),
			vec2(-.1,.9),
			vec2(-.5, .75),
			vec2(-.75, .5),
			vec2(-.9,.1),
			vec2(-.9,-.1),
			vec2(-.75, -.5),
			vec2(-.5, -.75),
			vec2(-.1,-.9),
			vec2(.1,-.9),
			vec2(.5, -.75),
			vec2(.75, -.5)
];

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
	
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	//Working triangle
	//var vertices = new Float32Array([-1, -1, 0, 1, 1, -1]);
	
	
	//var vertices = [
	//	vec2(-0.75, 0),
	//	vec2(-1,0),
	//	vec2(0,1),
	//	vec2(1,0),
		//vec2(0,-1) /*Completes square*/
	//	vec2(0.75,0),
	//	vec2(0.75,-1),
	//	vec2(-0.75,-1)//,
		
	//];
	current = house;
		
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
	//  Load shaders and initialize attribute buffers
	 program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
	bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(current), gl.STATIC_DRAW);

    // Associate our shader variables with our data buffer
	vPosition = gl.getAttribLocation( program, "vPosition");
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

    render(current.length);
};




function render(n) {
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}

window.onclick = function(){
	//console.log("clicked");
	var next_set;
	//gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
	if(current == house){
		next_set = octagon;
	}
	else if(current == octagon){
		next_set = pacman;
	}
	else next_set = house;
	
	//gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(next_set), gl.STATIC_DRAW);
	
	//gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	//gl.enableVertexAttribArray( vPosition );
	
	current = next_set;
	//console.log(current);
	render(next_set.length);
}
