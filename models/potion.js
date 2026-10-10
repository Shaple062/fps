window.FPSModels.potion=(T,p={})=>{
  const root=new T.Group(),bottle=new T.Group(),speed=p.kind==='speed',color=speed?0x54dfff:0xff617c;
  const mat=new T.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.25,roughness:.3});
  const part=(geometry,y,material=mat)=>{const mesh=new T.Mesh(geometry,material);mesh.position.y=y;bottle.add(mesh);};
  part(new T.CylinderGeometry(.15,.15,.3,12),.25);part(new T.CylinderGeometry(.065,.065,.13,12),.465);
  part(new T.CylinderGeometry(.085,.085,.07,12),.56,new T.MeshStandardMaterial({color:0xf4dfb1}));
  const mark=new T.Mesh(new T.BoxGeometry(.18,.055,.015),new T.MeshBasicMaterial({color:0xffffff}));mark.position.set(0,.25,.151);bottle.add(mark);
  if(!speed){const vertical=mark.clone();vertical.rotation.z=Math.PI/2;bottle.add(vertical);}
  root.add(bottle);
  return {root,pickup:speed?{kind:'speed',multiplier:p.multiplier||1.5,duration:p.duration||15}:{kind:'heal',amount:p.amount||25},update:t=>{bottle.rotation.y=t;bottle.position.y=Math.sin(t*2)*.045;}};
};
