window.FPSModels.highSchool=(T)=>{
 const root=new T.Group(),colliders=[],wall=new T.MeshStandardMaterial({color:0xe9e0c9}),blue=new T.MeshStandardMaterial({color:0x78a8b5}),dark=new T.MeshStandardMaterial({color:0x48555d});
 const box=(size,pos,mat)=>{const m=new T.Mesh(new T.BoxGeometry(...size),mat);m.position.set(...pos);m.castShadow=m.receiveShadow=true;root.add(m);};
 box([6,7,4],[0,3.5,0],wall);colliders.push({size:[6,7,4],offset:[0,3.5,0]});box([6.4,.18,4.4],[0,7.1,0],dark);
 for(const y of [1.6,3.7,5.8])for(const x of [-2,0,2])box([1.2,1,.08],[x,y,2.06],blue);box([1.3,2,.1],[0,1,2.13],dark);
 const c=document.createElement('canvas');c.width=512;c.height=128;const g=c.getContext('2d');g.fillStyle='#f0e7d2';g.fillRect(0,0,512,128);g.fillStyle='#39483f';g.font='bold 54px sans-serif';g.textAlign='center';g.fillText('鎌倉高校',256,85);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;const sign=new T.Mesh(new T.PlaneGeometry(3,.75),new T.MeshBasicMaterial({map:tex}));sign.position.set(0,6.7,2.15);root.add(sign);return {root,colliders};
};
