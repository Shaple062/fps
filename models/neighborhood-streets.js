window.FPSModels.neighborhoodStreets=(T)=>{
 const root=new T.Group(),asphalt=new T.MeshStandardMaterial({color:0x62686a,roughness:1,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),paving=new T.MeshStandardMaterial({color:0xc4c0b1,roughness:1});
 const strip=(w,d,x,z,material,y)=>{const m=new T.Mesh(new T.BoxGeometry(w,.015,d),material);m.position.set(x,y,z);m.receiveShadow=true;root.add(m);};
 for(const z of [12,27,40]){strip(60,4,0,z,paving,.055);strip(60,2.8,0,z,asphalt,.065);}
 for(const x of [-25,-10,10,25]){const length=Math.abs(x)===10?20:30,center=Math.abs(x)===10?22:25;strip(3.5,length,x,center,paving,.055);strip(2.5,length,x,center,asphalt,.065);}
 // Hill access road and two cross streets, following the existing terrain grid.
 const sample=(x,z)=>{const outside=Math.max(0,z-47,Math.abs(x)-40);return -.14+(1-Math.exp(-outside*.065))*(8+6*Math.sin(x*.045+z*.025)**2)+Math.max(0,z-75)*.025;};
 const height=(x,z)=>{const gx=Math.floor((x+600)/5),gz=Math.floor((z+20)/(1000/240)),x0=gx*5-600,z0=gz*(1000/240)-20,fx=(x-x0)/5,fz=(z-z0)/(1000/240),a=sample(x0,z0),b=sample(x0+5,z0),c=sample(x0,z0+1000/240),d=sample(x0+5,z0+1000/240);return Math.max(0,fx+fz<=1?a+fx*(b-a)+fz*(c-a):d+(1-fx)*(c-d)+(1-fz)*(b-d));};
 const slopeRoad=(x0,x1,z0,z1)=>{const nx=Math.ceil((x1-x0)/2),nz=Math.ceil((z1-z0)/2),geometry=new T.PlaneGeometry(x1-x0,z1-z0,nx,nz);geometry.rotateX(-Math.PI/2);geometry.translate((x0+x1)/2,0,(z0+z1)/2);const a=geometry.attributes.position;for(let i=0;i<a.count;i++)a.setY(i,height(a.getX(i),a.getZ(i))+.065);geometry.computeVertexNormals();const m=new T.Mesh(geometry,asphalt);m.receiveShadow=true;root.add(m);};
 slopeRoad(-2,2,40,96);for(const z of [57,94])slopeRoad(-72,72,z-2,z+2);
 return {root};
};


