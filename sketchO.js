
let sketch2D = function(p){
    p.setup = function(){
        p.createCanvas(p.windowWidth, p.windowHeight,p.P2D);
    };
    p.draw = function(){
        if(ContG){
            Graph2D.plotC();
          }
    };
    p.windowResized = function(){
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.convert = function(val, direct, zoomf=1){
        switch(direct){
            case 'x':
              return((zoomf*val+p.windowWidth/2));
            case 'y':
              return((zoomf*(-val)+p.windowHeight/2));
          };
    };

    p.plot = function(x,y,color=55,zoomf=1,connect=true,size=1){
        if(x.length != y.length){
            console.log("Plot x & y not same dim");
             return(1);
           }
           var len = x.length;
           if(len == undefined){
             p.rectMode(p.CENTER);
             p.fill(color);
             p.noStroke();
             p.square(p.convert(x,'x',zoomf), p.convert(y,'y',zoomf), size);
             return(1);
           }
           
           for(var i=0; i<x.length; i++){
             if(connect==false){
             p.rectMode(p.CENTER);
             p.fill(color);
             p.noStroke();
             p.square(p.convert(x[i],'x',zoomf),p.covert(y[i],'y',zoomf),size);
             }
             else{
               p.stroke(color);
               p.line(p.convert(x[i],'x',zoomf),p.convert(y[i],'y',zoomf),p.convert(x[i+1],'x',zoomf),p.convert(y[i+1],'y',zoomf))
             }
           }
    }
}


let sketch3D = function(p){
    p.setup = function(){
        p.createCanvas(p.windowWidth,p.windowHeight,p.WEBGL);
        p.createEasyCam();
    }

    p.draw = function(){
        p.background(255);
        //p.orbitControl();
        if(Graph3D.graphNow){
            Graph3D.plotG();
        }
    }

    p.windowResized = function(){
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    p.plot = function(x,y,z,color=55,zoomf=1,connect=true,size=1){
        if(x.length != y.length){
            console.log("Error Plot x & y & z not same dim");
            return(1);
          }
          
          var len = x.length;
          
          if(len == undefined){
            p.push();
            p.translate(zoomf*x,zoomf*y,zoomf*z);
            p.fill(color);
            p.box(size);
            p.pop();
          }
          
          for(var i=0; i<len-1; i++){
              if(connect==false){
                p.push();
                p.translate(zoomf*x[i],zoomf*y[i],zoomf*z[i]);
                p.fill(color);
                p.box(size);
                p.pop();
              }
              else{
                p.stroke(color);
                p.line(zoomf*x[i],zoomf*y[i],zoomf*z[i],zoomf*x[i+1],zoomf*y[i+1],zoomf*z[i+1]);
                //console.log(x[i],y[i],z[i],x[i+1],y[i+1],z[i+1]);
              }
          }
    }
}