

function EulerMethod3D(StrEq1,StrEq2,StrEq3,IntCond,step=0.1,tmin=0, tmax=10){
    // The functions StrEq1 & StrEq2 are of the form x' = f1(t,x,y,z) and y' = f2(t,x,y,z) z' = f3(t,x,y,z)
    // With StrEq1 = f1 and StrEq2 = f2
    // IntCond=[x(tmin),y(tmin),z(tmin)]
    var x, xt,y,yt,z,t;
    var tVals = [tmin];
    var xVals = [IntCond[0]];
    var yVals = [IntCond[1]];
    var zVals = [IntCond[2]];
    
    const f1 = (math.parse(StrEq1)).compile();
    const f2 = (math.parse(StrEq2)).compile();
    const f3 = (math.parse(StrEq3)).compile();
    
    function f1Eval(t1,x1,y1,z1){
     var scope = {t:t1,x:x1,y:y1,z:z1};
     return(f1.evaluate(scope));
    }
    function f2Eval(t1,x1,y1,z1){
     var scope = {t:t1,x:x1,y:y1,z:z1};
     return(f2.evaluate(scope));
    }
    function f3Eval(t1,x1,y1,z1){
     var scope={t:t1,x:x1,y:y1,z:z1};
      return(f3.evaluate(scope));
    }
    t = tmin;
    x = IntCond[0]; 
    y = IntCond[1];
    z = IntCond[2];
    if(tmin<tmax){
    
      for(t=tmin+step; t<=tmax; t=t+step ){
        xt = x + step*f1Eval(t,x,y,z);
        yt = y + step*f2Eval(t,x,y,z);
        z = z + step*f3Eval(t,x,y,z)
        x=xt;
        y=yt;
        tVals.push(t);
        xVals.push(x);
        yVals.push(y);
        zVals.push(z);
      }
      return([tVals,xVals,yVals,zVals])
  }
  else{
    
    for(t=tmin-step; t>=tmax; t=t-step ){
      xt = x + step*f1Eval(t,x,y,z);
      yt = y + step*f2Eval(t,x,y,z);
      z = z + step*f3Eval(t,z,y,z);
      x=xt;
      y=yt;
      tVals.push(t);
      xVals.push(x);
      yVals.push(y);
      zVals.push(z);
    }
    return([tVals,xVals,yVals,zVals])
  }
  }
  
  function Runge4th3D(StrEq1,StrEq2,StrEq3,IntCond,step=0.1,tmin=0, tmax=10){
      // The functions StrEq1 & StrEq2 are of the form x' = f1(t,x,y,z) and y' = f2(t,x,y,z) z' = f3(t,x,y,z)
    // With StrEq1 = f1 and StrEq2 = f2
    // IntCond=[x(tmin),y(tmin),z(tmin)]
    var x, xt,y,yt,z,t,k1v,k2v,k3v,k4v;
    var tVals = [tmin];
    var xVals = [IntCond[0]];
    var yVals = [IntCond[1]];
    var zVals = [IntCond[2]];
    
    //kvalues 
    function k1(fun,t,x,y,z){return(fun(t,x,y,z));}
    function k2(fun,t,x,y,z,kn1){return(fun(t+step/2,x+(step/2)*kn1,y+(step/2)*kn1,z+(step/2)*kn1));}
    function k3(fun,t,x,y,z,kn2){return(fun(t+step/2,x+(step/2)*kn2,y+(step/2)*kn2,z+(step/2)*kn2));}
    function k4(fun,t,x,y,z,kn3){return(fun(t+step,x+step*kn3,y+step*kn3,z+step*kn3));}
    
    const f1 = (math.parse(StrEq1)).compile();
    const f2 = (math.parse(StrEq2)).compile();
    const f3 = (math.parse(StrEq3)).compile();
    
    function f1Eval(t1,x1,y1,z1){
     var scope = {t:t1,x:x1,y:y1,z:z1};
     return(f1.evaluate(scope));
    }
    function f2Eval(t1,x1,y1,z1){
     var scope = {t:t1,x:x1,y:y1,z:z1};
     return(f2.evaluate(scope));
    }
    function f3Eval(t1,x1,y1,z1){
     var scope={t:t1,x:x1,y:y1,z:z1};
      return(f3.evaluate(scope));
    }
    t = tmin;
    x = IntCond[0]; 
    y = IntCond[1];
    z = IntCond[2];
    if(tmin<tmax){
    
      for(t=tmin+step; t<=tmax; t=t+step ){
        k1v = k1(f1Eval,t,x,y,z);
        k2v = k2(f1Eval,t,x,y,z,k1v);
        k3v = k3(f1Eval,t,x,y,z,k2v);
        k4v = k4(f1Eval,t,x,y,z,k3v);
        xt = x + (step/6)*(k1v+2*k2v+2*k3v+k4v);
        
        k1v = k1(f2Eval,t,x,y,z);
        k2v = k2(f2Eval,t,x,y,z,k1v);
        k3v = k3(f2Eval,t,x,y,z,k2v);
        k4v = k4(f2Eval,t,x,y,z,k3v);
        yt = y + (step/6)*(k1v+2*k2v+2*k3v+k4v);
        
        k1v = k1(f3Eval,t,x,y,z);
        k2v = k2(f3Eval,t,x,y,z,k1v);
        k3v = k3(f3Eval,t,x,y,z,k2v);
        k4v = k4(f3Eval,t,x,y,z,k3v);
        z = z + (step/6)*(k1v+2*k2v+2*k3v+k4v);
        
        x=xt;
        y=yt;
        tVals.push(t);
        xVals.push(x);
        yVals.push(y);
        zVals.push(z);
      }
      return([tVals,xVals,yVals,zVals])
  }
  }
  function Runge4th2D(StrEq1,StrEq2,IntCond,step=0.1,tmin=0, tmax=10){
    // The functions StrEq1 & StrEq2 are of the form x' = f1(t,x,y,) and y' = f2(t,x,y)
  // With StrEq1 = f1 and StrEq2 = f2
  // IntCond=[x(tmin),y(tmin)]
  var x, xt,y,yt,t,k1v,k2v,k3v,k4v;
  var tVals = [tmin];
  var xVals = [IntCond[0]];
  var yVals = [IntCond[1]];
  
  //kvalues 
  function k1(fun,t,x,y){return(fun(t,x,y));}
  function k2(fun,t,x,y,kn1){return(fun(t+step/2,x+(step/2)*kn1,y+(step/2)*kn1));}
  function k3(fun,t,x,y,kn2){return(fun(t+step/2,x+(step/2)*kn2,y+(step/2)*kn2));}
  function k4(fun,t,x,y,kn3){return(fun(t+step,x+step*kn3,y+step*kn3));}
  
  const f1 = (math.parse(StrEq1)).compile();
  const f2 = (math.parse(StrEq2)).compile();
  
  function f1Eval(t1,x1,y1){
   var scope = {t:t1,x:x1,y:y1};
   return(f1.evaluate(scope));
  }
  function f2Eval(t1,x1,y1){
   var scope = {t:t1,x:x1,y:y1};
   return(f2.evaluate(scope));
  }
  
  t = tmin;
  x = IntCond[0]; 
  y = IntCond[1];
  if(tmin<tmax){
  
    for(t=tmin+step; t<=tmax; t=t+step ){
      k1v = k1(f1Eval,t,x,y);
      k2v = k2(f1Eval,t,x,y,k1v);
      k3v = k3(f1Eval,t,x,y,k2v);
      k4v = k4(f1Eval,t,x,y,k3v);
      xt = x + (step/6)*(k1v+2*k2v+2*k3v+k4v);
      
      k1v = k1(f2Eval,t,x,y);
      k2v = k2(f2Eval,t,x,y,k1v);
      k3v = k3(f2Eval,t,x,y,k2v);
      k4v = k4(f2Eval,t,x,y,k3v);
      yt = y + (step/6)*(k1v+2*k2v+2*k3v+k4v);
      
      x=xt;
      y=yt;
      tVals.push(t);
      xVals.push(x);
      yVals.push(y);
    }
    return([tVals,xVals,yVals])
  }
  }