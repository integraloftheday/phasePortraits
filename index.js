//global variables 
var threeD = false;
var Graph2D;
var Graph3D;
var canvas2D;
var canvas3D;
var ContG =false;

//function Onload
function onLoad(){
  popoverLoad();
  off();
  Graph2D = new vars2D(); 
  Graph2D.setValues();
  Graph3D = new vars3D(); 
  Graph3D.setValues();
  //Start off with a 3D graph
  canvas3D = new p5(sketch3D);
  document.getElementById("button3D").click();
  graphB();
}

//Overlay code
function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
  $('[data-toggle="popover"]').popover("hide")
}

//Popover Intilization
function popoverLoad(){
  $(function () {
    $('[data-toggle="popover"]').popover()
  })
}
//TwoD setup 
function setUp2D(){
  threeD = false;
  // Enable right-click context menu
  document.oncontextmenu = function() { return true; }
  canvas3D.remove();
  canvas2D = new p5(sketch2D);
}

//ThreeD setup
function setUp3D(){
  threeD = true; 
  // suppress right-click context menu
  document.oncontextmenu = function() { return false; }
  canvas2D.remove();
  canvas3D = new p5(sketch3D);
}

//save image
function saveImage(){
  if(threeD){
    canvas3D.saveCanvas('phasePortrait', 'png');
  }
  else{
    canvas2D.saveCanvas("phasePortrait","png");
  }
}

//graph button function
function graphB(){
  if(threeD == false){
    Graph2D.getValues();
    Graph2D.plotG();
    console.log("GRAPH2D");
  }
  else{
    Graph3D.getValues();
    Graph3D.calcPoints();
    Graph3D.graphNow=true;
    console.log("GRAPH3D");
  }
}
//clear button function
function clearB(){
  if(threeD == false){
    Graph2D.clear();
    ContG =false;
    console.log("CLEAR2D");
  }
  else{
    Graph3D.clear();
    console.log("CLEAR3D");
  }
}
//array shortner
function arrShort(ar,num){
  //ar orginal array 
  //num how many variable to keep 
  var ac = []
  var remFrac = Math.round(ar.length/num);
     for(var i=0;i<ar.length; i++){
      if(i%remFrac==0){
        ac.push(ar[i]);
      }
    }
  return(ac);
}


//2D variable class 
class vars2D {
  constructor(){
    this.xEq = "y";
    this.yEq = "-1.70 * x + 0.9 * y";
    this.xInt = 1; 
    this.yInt = 1;
    this.tmin = 0;
    this.tmax = 10; 
    this.tstep = 0.01;
    this.zoom = 1; 
    this.rColor = 0;
    this.gColor = 0;
    this.bColor = 0;
    this.randColor = false;
    this.continous = false;
  }
  setValues(){
    document.getElementById("xEq2D").value = this.xEq; 
    document.getElementById("yEq2D").value = this.yEq; 
    document.getElementById("xInt2D").value = this.xInt;
    document.getElementById("yInt2D").value = this.yInt;
    document.getElementById("tmin2D").value = this.tmin;
    document.getElementById("tmax2D").value = this.tmax;
    document.getElementById("tstep2D").value = this.tstep;
    document.getElementById("rColor2D").value = this.rColor;    
    document.getElementById("gColor2D").value = this.gColor;   
    document.getElementById("bColor2D").value = this.bColor;
    document.getElementById("zoom2D").value = this.zoom;
    document.getElementById("randColor2D").checked = this.randColor;
    document.getElementById("continous2D").checked = this.continous;
  }
  getValues(){
    this.xEq = document.getElementById("xEq2D").value; 
    this.yEq = document.getElementById("yEq2D").value; 
    this.xInt = parseFloat(document.getElementById("xInt2D").value);
    this.yInt = parseFloat(document.getElementById("yInt2D").value);
    this.tmin = parseFloat(document.getElementById("tmin2D").value);
    this.tmax = parseFloat(document.getElementById("tmax2D").value);
    this.tstep = parseFloat(document.getElementById("tstep2D").value);
    this.rColor = parseInt(document.getElementById("rColor2D").value);    
    this.gColor = parseInt(document.getElementById("gColor2D").value);   
    this.bColor = parseInt(document.getElementById("bColor2D").value);
    this.zoom = parseFloat(document.getElementById("zoom2D").value);
    this.randColor = document.getElementById("randColor2D").checked;
    this.continous = document.getElementById("continous2D").checked;
  }
  plotG(){
    if(this.continous == false){
      ContG = false;
      var Evals = Runge4th2D(this.xEq,this.yEq,[this.xInt,this.yInt],this.tstep,this.tmin,this.tmax);
      if(this.randColor == true){
        canvas2D.plot(Evals[1],Evals[2],[math.random()*255,math.random()*255,math.random()*255],this.zoom);
      }
      else{
        canvas2D.plot(Evals[1],Evals[2],[this.rColor,this.gColor,this.bColor],this.zoom);
      }
    }
    else{
      ContG = true;
    }
  }

  plotC(){
      var intRand = [math.random(-canvas2D.windowWidth/(2*this.zoom),canvas2D.windowWidth/(2*this.zoom)),math.random(-canvas2D.windowHeight/(2*this.zoom),canvas2D.windowHeight/(2*this.zoom))]; // Generate random value
      var Evals = Runge4th2D(this.xEq,this.yEq,[intRand[0],intRand[1]],this.tstep,this.tmin,this.tmax);
      if(this.randColor == true){
        canvas2D.plot(Evals[1],Evals[2],[math.random()*255,math.random()*255,math.random()*255],this.zoom);
      }
      else{
        canvas2D.plot(Evals[1],Evals[2],[this.rColor,this.gColor,this.bColor],this.zoom);
      }
  }

  clear(){
    canvas2D.background(255);
    this.continous = false
  }

}

//2D variable class 
class vars3D {
  constructor(){
    this.xEq = "10 * (y - x)";
    this.yEq = "x * (24 - z) - y";
    this.zEq = "x * y - 8/3 * z"
    this.xInt = 1; 
    this.yInt = 1;
    this.zInt = 1;
    this.tmin = 0;
    this.tmax = 10; 
    this.tstep = 0.01;
    this.zoom = 5; 
    this.rColor = 	0;
    this.gColor = 0;
    this.bColor = 0;
    this.limitPoints = true;
    this.pointNum = 200;
    this.boxPoints = false;
    this.boxSize = 10;
    this.graphNow = false;
    this.pointHistory = [];
  }
  setValues(){
    document.getElementById("xEq3D").value = this.xEq; 
    document.getElementById("yEq3D").value = this.yEq;
    document.getElementById("zEq3D").value = this.zEq; 
    document.getElementById("xInt3D").value = this.xInt;
    document.getElementById("yInt3D").value = this.yInt;
    document.getElementById("zInt3D").value = this.zInt;
    document.getElementById("tmin3D").value = this.tmin;
    document.getElementById("tmax3D").value = this.tmax;
    document.getElementById("tstep3D").value = this.tstep;
    document.getElementById("rColor3D").value = this.rColor;    
    document.getElementById("gColor3D").value = this.gColor;   
    document.getElementById("bColor3D").value = this.bColor;
    document.getElementById("zoom3D").value = this.zoom;
    document.getElementById("limitPoints3D").checked = this.limitPoints;
    document.getElementById("pointNum3D").value = this.pointNum;
    document.getElementById("boxPoints3D").checked = this.boxPoints;
    document.getElementById("boxSize3D").value = this.boxSize;
  }
  getValues(){
    this.xEq = document.getElementById("xEq3D").value; 
    this.yEq = document.getElementById("yEq3D").value; 
    this.zEq = document.getElementById("zEq3D").value; 
    this.xInt = parseFloat(document.getElementById("xInt3D").value);
    this.yInt = parseFloat(document.getElementById("yInt3D").value);
    this.zInt = parseFloat(document.getElementById("zInt3D").value);
    this.tmin = parseFloat(document.getElementById("tmin3D").value);
    this.tmax = parseFloat(document.getElementById("tmax3D").value);
    this.tstep = parseFloat(document.getElementById("tstep3D").value);
    this.rColor = parseInt(document.getElementById("rColor3D").value);    
    this.gColor = parseInt(document.getElementById("gColor3D").value);   
    this.bColor = parseInt(document.getElementById("bColor3D").value);
    this.zoom = parseFloat(document.getElementById("zoom3D").value);
    this.limitPoints = document.getElementById("limitPoints3D").checked;
    this.pointNum = parseInt(document.getElementById("pointNum3D").value);
    this.boxPoints = document.getElementById("boxPoints3D").checked;
    this.boxSize = parseInt(document.getElementById("boxSize3D").value);

  }
  calcPoints(){
    var Evals = Runge4th3D(this.xEq,this.yEq,this.zEq,[this.xInt,this.yInt,this.zInt],this.tstep,this.tmin,this.tmax);
    if(this.limitPoints){
      Evals[1]=arrShort(Evals[1],this.pointNum);
      Evals[2]=arrShort(Evals[2],this.pointNum);
      Evals[3]=arrShort(Evals[3],this.pointNum);
    }
    (this.pointHistory).push([[this.rColor,this.gColor,this.bColor],[Evals[1],Evals[2],Evals[3]]]); 
  }

  plotG(){
    for(var i=0; i<this.pointHistory.length; i++){
      canvas3D.plot(this.pointHistory[i][1][0],this.pointHistory[i][1][1],this.pointHistory[i][1][2],this.pointHistory[i][0],this.zoom,!this.boxPoints,this.boxSize);
    }
  }

  clear(){
    this.graphNow = false;
    this.pointHistory = [];
  }

}
