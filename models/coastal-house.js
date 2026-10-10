window.FPSModels.coastalHouse=(T,p={})=>{
  const root=new T.Group(),w=p.width||7,d=p.depth||7,h=6.5,level=3,colliders=[];
  const material=color=>new T.MeshStandardMaterial({color,roughness:.8}),wall=material(p.color||0xd4cbb6),wood=material(0x8a6244),white=material(0xece5d8),blue=material(0x688eaa),dark=material(0x475358);
  const box=(size,pos,mat,solid=true)=>{const m=new T.Mesh(new T.BoxGeometry(...size),mat);m.position.set(...pos);m.castShadow=m.receiveShadow=true;root.add(m);if(solid)colliders.push({size,offset:pos});return m;};
  for(const x of [-w/2,w/2])box([.2,h,d],[x,h/2,0],wall);box([w,h,.2],[0,h/2,-d/2],wall);
  for(const sign of [-1,1])box([(w-1.4)/2,h,.2],[sign*(w+1.4)/4,h/2,d/2],wall);
  box([1.4,.6,.2],[0,2.7,d/2],wall);box([1.4,1.1,.2],[0,5.95,d/2],wall);
  box([w,.06,d],[0,.03,0],white);box([w+.4,.2,d+.4],[0,h,0],dark);
  const door=box([1.35,2.35,.12],[0,1.175,d/2],wood,false),doorShape={size:[1.35,2.35,.12],offset:[0,1.175,d/2]};colliders.push(doorShape);let open=false;
  box([w-1.4,.16,d-.2],[-.7,level-.08,0],wood);
  const count=18,run=d-1;for(let i=0;i<count;i++){const rise=(i+1)*level/count;box([1.2,rise,run/count],[w/2-.7,rise/2,d/2-.5-(i+.5)*run/count],wood);}
  box([1.4,.16,.6],[w/2-.7,level-.08,-d/2+.3],wood);box([2.4,.16,1.2],[0,level-.08,d/2+.5],wood);
  for(const y of [1.5,4.4])for(const x of [-w*.28,w*.28])box([1.25,1.15,.08],[x,y,d/2+.13],blue,false);
  box([1.5,.12,1],[0,.9,0],wood);for(const x of [-.6,.6])for(const z of [-.35,.35])box([.1,.84,.1],[x,.42,z],wood);
  box([1.8,.4,2.4],[-w*.25,level+.2,-d*.2],wood);box([1.7,.22,2.3],[-w*.25,level+.51,-d*.2],blue);box([1.3,.12,.45],[-w*.25,level+.68,-d*.2-.8],white,false);
  box([1.2,1.9,.5],[-w*.3,.95,-d*.35],wood);
  if(FPSModels.roomDetails){const detail=FPSModels.roomDetails(T,{width:w,depth:d,level});root.add(detail.root);colliders.push(...detail.colliders);}
  return {root,colliders,dynamic:true,interactPosition:()=>root.localToWorld(new T.Vector3(0,1,d/2)),interact(){open=!open;door.rotation.y=open?Math.PI/2:0;door.position.set(open?.74:0,1.175,open?d/2-.65:d/2);doorShape.size=open?[.12,2.35,1.35]:[1.35,2.35,.12];doorShape.offset=door.position.toArray();return open?'門已打開':'門已關閉';}};
};

