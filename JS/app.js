

  var mycanvas = document.querySelector('#mycanvas');
  var ctx = mycanvas.getContext("2d");
  mycanvas.width = window.innerWidth;
  mycanvas.height=window.innerHeight;

 
  var particleArr = [];
  var radiusValue = 8;


  let mouse = {
    x:null,
    y:null,
    radius: (mycanvas.width/10)*(mycanvas.height/10)
  }

  window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
  });

  function Particle(x,y,r,color){
    this.x=x;
    this.y =y;
    this.r = radiusValue;
    this.color = "rgba(" + (parseInt(Math.random()*240)+15) + "," + (parseInt(Math.random()*240)+15) +
     "," + (parseInt(Math.random()*240)+15)+ "," + (parseInt(Math.random()*1)+1) +")";

    this.dx = Math.random()*3 +1;
    this.dy = Math.random()*3 +1;

    particleArr.push(this);
  }

  Particle.prototype.render = function(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle=this.color;
      ctx.closePath();
      ctx.fill();
  }
  Particle.prototype.update = function(){
  /*     valueSS++;
      if(valueSS%1==0){
        this.r--;
        if(valueSS>=51){
            valueSS=0;
        }
      } */

      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
  
      let distance = (dx*dx + dy*dy);
      
      if(distance < mouse.radius + radiusValue){
         
          if(mouse.x < this.x && this.x < mycanvas.width - radiusValue*10){
              this.x +=50;
          }
          if(mouse.x > this.x && this.x > radiusValue*10){
              this.x -=50;
          }
          if(mouse.y < this.y && this.y < mycanvas.height - radiusValue*10 ){
              this.y +=50;
          }
          if(mouse.y > this.y && this.y > radiusValue*10){
              this.y -=50;
          }
      }

      
      this.x += this.dx;
      this.y += this.dy;

      

    if(this.x > mycanvas.width - 50 || this.x <50 ){
        this.dx = -1 * this.dx;
        this.color = "rgba(" + (parseInt(Math.random()*240)+15) + "," + (parseInt(Math.random()*240)+15) +
        "," + (parseInt(Math.random()*240)+15)+ "," + (parseInt(Math.random()*1)+1) +")";   
    }
    if(this.y > mycanvas.height - radiusValue || this.y <radiusValue ){
        this.dy = -1 * this.dy;
        this.color="rgba(" + (parseInt(Math.random()*240)+15) + "," + (parseInt(Math.random()*240)+15) +
        "," + (parseInt(Math.random()*240)+15)+ "," + (parseInt(Math.random()*1)+1) +")";
    }
        

    if(this.r<0){
        for(var i=0;i<particleArr.length;i++){
            if(particleArr[i] === this){
                particleArr.splice(i,1);
            }
        }
        return false;
      }
    return true;
  }



/*   mycanvas.onmousemove = function(event){
    if(event.clientX > radiusValue && event.clientY > radiusValue){
        new Particle(event.clientX,event.clientY,this,this);
    }
  } */
  var valueS = 0;
  var valueSS = 0;
  setInterval(function(){
    ctx.clearRect(0,0,mycanvas.width,mycanvas.height);

    var xPos = parseInt(Math.random()*mycanvas.width)+1;
    var yPos = parseInt(Math.random()*mycanvas.height)+1;
    
    if(xPos < mycanvas.width - radiusValue && xPos > 100){
        if(yPos > 100 && yPos < mycanvas.height -radiusValue){   
             valueS++;
             if(valueS%5 == 0){
                new Particle(xPos,yPos,this,this);
                valueS=0;
             }
        }
    }
    for(var i=0;i<particleArr.length;i++){
        particleArr[i].update() && particleArr[i].render();
    }
    connection();
  },30);

  


  function connection(){
      let opacityValue =1;
      for(let a=0;a<particleArr.length;a++){
          for(let b=0;b<particleArr.length;b++){

              let dx = (particleArr[a].x - particleArr[b].x);
              let dy = (particleArr[a].y - particleArr[b].y);
              let distance =(dx*dx + dy*dy);

            if(distance < (mycanvas.width/5)*(mycanvas.height/5)){
                opacityValue =  1 - (distance/20000);
                ctx.strokeStyle= 'rgba(0,0,0, ' + opacityValue +')';
                ctx.lineWidth=1;
                ctx.beginPath();
                ctx.moveTo(particleArr[a].x,particleArr[a].y);
                ctx.lineTo(particleArr[b].x,particleArr[b].y);
                ctx.stroke();

            }
          }
      }
  }

  window.addEventListener('resize',
  function(){
    mycanvas.width = innerWidth;
    mycanvas.height = innerHeight;
    mouse.radius = ((mycanvas.height/80) * (mycanvas.height/80));
  });

  window.addEventListener('mouseout', function(){
    mouse.x = undefined;
    mouse.y = undefined;
  });