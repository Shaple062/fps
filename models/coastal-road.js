window.FPSModels.coastalRoad=(T)=>{
  const root=new T.Group();
  const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const ctx=canvas.getContext('2d');ctx.fillStyle='#77777a';ctx.fillRect(0,0,512,512);
  let seed=1297;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  for(let i=0;i<38000;i++){const a=random()*.2;ctx.fillStyle=random()>.5?'rgba(245,236,220,'+a+')':'rgba(23,28,31,'+a+')';ctx.fillRect(random()*512,random()*512,1+random()*2,1+random()*2);}
  ctx.strokeStyle='#41484b';ctx.lineWidth=.8;for(let i=0;i<8;i++){ctx.beginPath();let x=random()*512,y=random()*512;ctx.moveTo(x,y);for(let j=0;j<6;j++){x+=random()*45-20;y+=random()*25;ctx.lineTo(x,y);}ctx.stroke();}
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.repeat.set(5,5);texture.anisotropy=4;
  const asphalt=new T.MeshStandardMaterial({map:texture,roughness:.95}),concrete=new T.MeshStandardMaterial({color:0xc2bdb0,roughness:.95}),paint=new T.MeshStandardMaterial({color:0xebe7da,roughness:.8});
  const box=(size,pos,mat)=>{const m=new T.Mesh(new T.BoxGeometry(...size),mat);m.position.set(...pos);m.receiveShadow=true;root.add(m);return m;};
  box([80,.2,64],[0,-.1,16],asphalt);
  for(const side of [-1,1]){box([.22,.12,35],[side*3.6,.02,12],concrete);box([.09,.012,35],[side*3.25,.012,12],paint);box([3.4,.11,34],[side*5.5,-.01,12],concrete);}
  for(const z of [7,13,19,25])box([.15,.015,2.4],[0,.019,z],paint);
  for(let i=0;i<7;i++)box([.5,.018,2.8],[-2.4+i*.8,.022,5],paint);
  const cover=new T.Mesh(new T.CylinderGeometry(.38,.38,.025,24),new T.MeshStandardMaterial({color:0x424b4d,metalness:.45,roughness:.85}));cover.position.set(1.3,.015,13);root.add(cover);
  return {root,collider:{size:[80,.2,64],offset:[0,-.1,16]}};
};



