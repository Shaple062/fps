window.FPSModels.railCrossing=(T,p={})=>{
  const root=new T.Group(),yellow=new T.MeshStandardMaterial({color:0xe3b842,roughness:.55}),black=new T.MeshStandardMaterial({color:0x242a2b,roughness:.6}),metal=new T.MeshStandardMaterial({color:0x777e78,metalness:.4,roughness:.55}),red=new T.MeshStandardMaterial({color:0xaf2924,emissive:0xc9281e,emissiveIntensity:1.8});
  const box=(size,pos,mat=yellow,parent=root)=>{const m=new T.Mesh(new T.BoxGeometry(...size),mat);m.position.set(...pos);m.castShadow=true;parent.add(m);return m;};
  box([.18,4.6,.18],[0,2.3,0],black);for(let i=0;i<8;i++)box([.185,.26,.185],[0,.35+i*.52,0],yellow);
  for(const angle of [-Math.PI/4,Math.PI/4]){const cross=new T.Group();cross.position.y=4.15;cross.rotation.z=angle;root.add(cross);box([1.42,.19,.095],[0,0,0],yellow,cross);for(const x of [-.51,0,.51])box([.2,.195,.1],[x,0,0],black,cross);}
  const lamps=[];for(const y of [2.85,3.35]){const hood=new T.Mesh(new T.CylinderGeometry(.22,.22,.28,20),black);hood.rotation.x=Math.PI/2;hood.position.set(.26,y,.17);root.add(hood);const bulb=new T.Mesh(new T.CircleGeometry(.16,20),red.clone());bulb.position.set(.26,y,.32);root.add(bulb);lamps.push(bulb);}
  box([.43,.72,.35],[0,.51,0],metal);
  // Raised boom: the player can use the crossing without an invisible barrier.
  const boom=new T.Group();boom.position.set(.18,.95,0);boom.rotation.z=p.raised===false?-Math.PI/2:-.14;root.add(boom);
  box([.085,3.6,.085],[0,1.8,0],yellow,boom);for(let i=0;i<7;i++)box([.09,.22,.09],[0,.2+i*.5,0],black,boom);
  const label=document.createElement('canvas');label.width=256;label.height=384;const c=label.getContext('2d');c.fillStyle='#f3e7c6';c.fillRect(0,0,256,384);c.fillStyle='#342e23';c.textAlign='center';c.font='bold 38px sans-serif';['踏切','注意','CAUTION'].forEach((text,i)=>c.fillText(text,128,95+i*85));const tex=new T.CanvasTexture(label);tex.colorSpace=T.SRGBColorSpace;
  const sign=new T.Mesh(new T.PlaneGeometry(.43,.64),new T.MeshStandardMaterial({map:tex,roughness:.8}));sign.position.set(-.18,1.83,.15);root.add(sign);
  return {root,collider:{size:[.5,4.7,.55],offset:[0,2.35,0]},update(time){lamps.forEach((m,i)=>m.material.emissiveIntensity=((Math.floor(time*1.8)+i)%2)?1.8:.08);}};
};
