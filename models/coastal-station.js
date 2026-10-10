window.FPSModels.coastalStation=(T)=>{
  const root=new T.Group(),concrete=new T.MeshStandardMaterial({color:0xc2beb1,roughness:.92}),green=new T.MeshStandardMaterial({color:0x3c6c57,roughness:.58}),roofmat=new T.MeshStandardMaterial({color:0x596765,metalness:.3,roughness:.6}),yellow=new T.MeshStandardMaterial({color:0xddc565,roughness:.85});const colliders=[];
  const box=(size,pos,mat,solid=false)=>{const m=new T.Mesh(new T.BoxGeometry(...size),mat);m.position.set(...pos);m.castShadow=m.receiveShadow=true;root.add(m);if(solid)colliders.push({size,offset:pos});return m;};
  box([25,.38,3.4],[0,.19,0],concrete,true);box([25,.025,.36],[0,.395,1.28],yellow);
  for(const x of [-9,-3,3,9])box([.13,2.8,.13],[x,1.77,-.65],green,true);
  box([25,.16,3.6],[0,3.25,0],roofmat);for(let i=0;i<25;i++)box([.075,.065,3.6],[-12+i,3.36,0],roofmat);
  const benchMat=new T.MeshStandardMaterial({color:0x79724b,roughness:.8});for(const x of [-5,5]){box([2.6,.1,.55],[x,.85,-.5],benchMat);box([2.6,.45,.08],[x,1.17,-.83],benchMat);for(const dx of [-1,1])box([.08,.48,.4],[x+dx,.61,-.5],green);}
  const c=document.createElement('canvas');c.width=1024;c.height=256;const ctx=c.getContext('2d');ctx.fillStyle='#eceee2';ctx.fillRect(0,0,1024,256);ctx.fillStyle='#326b4e';ctx.fillRect(0,162,1024,52);ctx.textAlign='center';ctx.fillStyle='#253d37';ctx.font='bold 65px sans-serif';ctx.fillText('鎌倉高校前',512,88);ctx.font='28px sans-serif';ctx.fillText('KAMAKURAKŌKŌMAE  ·  EN08',512,140);ctx.fillStyle='#fff';ctx.font='24px sans-serif';ctx.fillText('七里ヶ浜  ←                       →  腰越',512,198);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;
  const sign=new T.Mesh(new T.PlaneGeometry(3.7,.925),new T.MeshStandardMaterial({map:tex,roughness:.6}));sign.position.set(0,2.23,1.32);root.add(sign);
  return {root,colliders};
};
