window.FPSModels.fishingPier=(T)=>{
 const root=new T.Group(),colliders=[],wood=new T.MeshStandardMaterial({color:0xb19a77}),metal=new T.MeshStandardMaterial({color:0x657c7b}),chairs=[];
 const box=(size,pos,mat,solid=false)=>{const m=new T.Mesh(new T.BoxGeometry(...size),mat);m.position.set(...pos);m.castShadow=m.receiveShadow=true;root.add(m);if(solid)colliders.push({size,offset:pos});};
 box([14,.12,12],[0,.02,0],wood,true);for(let i=0;i<28;i++)box([.018,.012,12],[-7+i*.5,.086,0],metal);
 for(const x of [-6.8,6.8]){box([.09,.8,11],[x,.48,0],metal,true);for(const z of [-5,0,5])box([.13,1,.13],[x,.5,z],metal,true);}
 for(const x of [-4,0,4]){box([.8,.1,.65],[x,.52,-5.25],wood);for(const dx of [-.3,.3])for(const z of [-.22,.22])box([.09,.45,.09],[x+dx,.245,z-5.25],metal);chairs.push(new T.Vector3(x,.08,-5.05));}
 // Open-sided sea-view shelter; posts stay outside the stools and aisle.
 const canvas=new T.MeshStandardMaterial({color:0xe9e0bb,roughness:1,side:T.DoubleSide}),blue=new T.MeshStandardMaterial({color:0x699eab,roughness:1,side:T.DoubleSide});
 for(const x of [-6.3,6.3])for(const z of [-4.4,4.4])box([.14,3.1,.14],[x,1.63,z],wood,true);
 for(const side of [-1,1]){const roof=new T.Mesh(new T.BoxGeometry(7.15,.07,12.4),canvas);roof.position.set(side*3.5,3.45,0);roof.rotation.z=-side*.07;roof.castShadow=true;root.add(roof);for(let i=0;i<6;i++){const stripe=new T.Mesh(new T.BoxGeometry(7.15,.012,.44),blue);stripe.position.set(side*3.5,3.49,-5.5+i*2);stripe.rotation.z=-side*.07;root.add(stripe);}}
 for(const x of [-6.5,6.5])box([.06,.18,12.4],[x,3.2,0],blue);box([13,.12,.12],[0,3.05,4.4],wood);
 for(const x of [-4,0,4]){box([.15,.22,.15],[x,2.82,3.8],new T.MeshStandardMaterial({color:0xffebba,emissive:0xffd695,emissiveIntensity:.45}));}
 return {root,colliders,fishingChairs:()=>chairs.map(v=>root.localToWorld(v.clone())),safeZone:p=>p.x>=4&&p.x<=20&&p.z<=-12&&p.z>=-42};
};


