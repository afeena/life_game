 body = document.getElementById('body');
 canvas = document.createElement('canvas');
 
 ctx = canvas.getContext('2d');
 canvas.width = 100;
 canvas.height = 100;

 document.body.appendChild(canvas);


function draw_gen(generation){
	ctx.clearRect(0,0,100,100);
	ctx.fillStyle="#FF00FF";
	generation.forEach(function(element){
		if(element.draw){
			ctx.fillRect(element.x, element.y,1,1);
		}}
	);
};



function make_cell(x,y){
	this.x = x,
	this.y = y,
	this.draw = true
	
}


function Game(){
	this.first_gen = [];
	this.prev_gen = [];
	this.new_gen = [];
}


Game.prototype.init_game=function(){
	
	for (var i=0; i<100;i++){
		for (var j=0;j<100;j++){
			var cell = new make_cell(i,j);
			if(Math.random()<0.5){cell.draw=false;}
			this.first_gen.push(cell);
		}
	}
	draw_gen(this.first_gen);
	this.prev_gen=this.first_gen.slice();
}



Game.prototype.make_gen=function(){
	
	this.new_gen=this.prev_gen.slice();
	this.new_gen.forEach(function(element,index,array){
		var n_alive = 0;
		var offset=100;
	
		n_alive += typeof array[index-offset] != 'undefined' && array[index-offset].draw==true;
		n_alive += typeof array[index-offset-1] != 'undefined' && array[index-offset-1].draw==true;
		n_alive += typeof array[index-offset+1] != 'undefined' && array[index-offset+1].draw==true;
		n_alive += typeof array[index-1] != 'undefined' && array[index-1].draw==true;
 		n_alive += typeof array[index+1] != 'undefined' && array[index+1].draw==true;
 		n_alive += typeof array[index+offset] != 'undefined' && array[index+offset].draw==true;
 		n_alive += typeof array[index+offset-1] != 'undefined' && array[index+offset-1].draw==true;
		n_alive += typeof array[index+offset+1] != 'undefined' && array[index+offset+1].draw==true;
	 
		if (element.draw) {
			if (n_alive<2||n_alive>3){
				element.draw=false;
			}
		}
		else {
			if (n_alive==3){
				element.draw=true
			}
		}
	});
    
	draw_gen(this.new_gen);
	this.prev_gen=this.new_gen.slice();
};


var game = new Game;
game.init_game();

function main() {
	
	requestAnimationFrame(main); 
	game.make_gen();
};
main();


 
 


