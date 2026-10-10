window.FPSModels.coastalStreet=(T,p={})=>{
  const root=new T.Group(),steel=new T.MeshStandardMaterial({color:0x7c8989,metalness:.52,roughness:.48}),dark=new T.MeshStandardMaterial({color:0x363c3d,roughness:.8}),yellow=new T.MeshStandardMaterial({color:0xd5b755,roughness:.7});let colliders=[];
  const box=(size,pos,mat=steel)=>{const m=new T.Mesh(new T.BoxGeometry(...size),mat);m.position.set(...pos);m.castShadow=m.receiveShadow=true;root.add(m);return m;};
  const cylinder=(radius,height,pos,mat=steel)=>{const m=new T.Mesh(new T.CylinderGeometry(radius,radius,height,12),mat);m.position.set(...pos);m.castShadow=true;root.add(m);return m;};
  if(p.kind==='fence'){
    const length=p.length||20;for(let x=-length/2;x<=length/2;x+=2.5)cylinder(.045,1.1,[x,.55,0]);for(const y of [.42,.95])box([length,.055,.055],[0,y,0]);colliders=[{size:[length,1.15,.14],offset:[0,.575,0]}];
  }else if(p.kind==='sign'){
    const c=document.createElement('canvas');c.width=512;c.height=512;const ctx=c.getContext('2d');ctx.fillStyle=p.dark?'#234e41':'#edeadd';ctx.fillRect(0,0,512,512);ctx.strokeStyle='#b5c6b6';ctx.lineWidth=10;ctx.strokeRect(14,14,484,484);ctx.textAlign='center';ctx.fillStyle=p.dark?'#f1edda':'#254d42';ctx.font='bold 44px sans-serif';ctx.fillText(p.title||'鎌倉高校前駅',256,105);ctx.font='22px sans-serif';ctx.fillText(p.subtitle||'KAMAKURAKŌKŌMAE',256,152);ctx.font='32px sans-serif';ctx.fillText(p.dark?'海の見える街':'江ノ島電鉄',256,245);ctx.font='65px sans-serif';ctx.fillText('→',256,330);ctx.font='22px sans-serif';ctx.fillText(p.dark?'CAFE ·  OPEN':'EN08  /  ENODEN LINE',256,413);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;
    box([1.45,1.55,.11],[0,1.95,0],dark);const panel=new T.Mesh(new T.PlaneGeometry(1.36,1.46),new T.MeshStandardMaterial({map:tex,roughness:.7}));panel.position.set(0,1.95,.065);root.add(panel);for(const x of [-.48,.48])cylinder(.045,1.25,[x,.625,0]);colliders=[{size:[1.45,2.75,.15],offset:[0,1.375,0]}];
  }else if(p.kind==='mirror'){
    const orange=new T.MeshStandardMaterial({color:0xc36a3c,roughness:.6});cylinder(.045,3.6,[0,1.8,0],orange);const back=new T.Mesh(new T.CylinderGeometry(.53,.53,.09,32),orange);back.rotation.x=Math.PI/2;back.position.set(0,3.2,.04);root.add(back);const mirror=new T.Mesh(new T.SphereGeometry(.48,24,16,0,Math.PI*2,0,Math.PI/2),new T.MeshStandardMaterial({color:0xb6cfda,metalness:.9,roughness:.1}));mirror.rotation.x=Math.PI/2;mirror.scale.z=.18;mirror.position.set(0,3.2,.105);root.add(mirror);colliders=[{size:[.15,3.8,.2],offset:[0,1.9,0]}];
  }else if(p.kind==='bollard'){
    cylinder(.075,1,[0,.5,0],yellow);for(const y of [.3,.65])cylinder(.078,.13,[0,y,0],dark);colliders=[{size:[.18,1,.18],offset:[0,.5,0]}];
  }else{
    cylinder(.14,9.2,[0,4.6,0],new T.MeshStandardMaterial({color:0x8e9289,roughness:.95}));box([2.3,.1,.15],[0,8.1,0]);for(const x of [-.8,0,.8])cylinder(.07,.23,[x,8.29,0],new T.MeshStandardMaterial({color:0xcacbb7,roughness:.3}));box([.43,.55,.36],[.25,5.6,0],steel);
    // Every cable ends at another real pole's insulator, never at an arbitrary span.
    for(const x of [-.8,0,.8])box([.12,.045,.12],[x,8.425,0],steel);
    for(const end of p.connections||[]){const length=Math.hypot(end[0],end[2]),sag=Math.min(.55,length*.02);for(const x of [-.8,0,.8]){const points=[];for(let i=0;i<=24;i++){const t=i/24;points.push(new T.Vector3(x+end[0]*t,8.4+end[1]*t-Math.sin(Math.PI*t)*sag,end[2]*t));}root.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),32,.014,4,false),dark));}}colliders=[{size:[.34,9.2,.34],offset:[0,4.6,0]}];
  }
  return {root,colliders};
};

