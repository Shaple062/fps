window.FPSModels.plantedTree=(T,p={})=>{
 const root=new T.Group(),colliders=[],wood=new T.MeshStandardMaterial({color:0x735745}),soil=new T.MeshStandardMaterial({color:0x8b7860}),leaf=new T.MeshStandardMaterial({color:p.kind==='sakura'?0xf0b8ce:0x558362,roughness:1}),rail=new T.MeshStandardMaterial({color:0x65746c});
 const box=(size,pos,mat)=>{const m=new T.Mesh(new T.BoxGeometry(...size),mat);m.position.set(...pos);m.castShadow=m.receiveShadow=true;root.add(m);};
 box([3,.1,3],[0,.05,0],soil);const trunk=new T.Mesh(new T.CylinderGeometry(.13,.21,3,9),wood);trunk.position.y=1.5;trunk.castShadow=true;root.add(trunk);colliders.push({size:[.42,3,.42],offset:[0,1.5,0]});
 if(p.kind==='pine')for(let i=0;i<3;i++){const crown=new T.Mesh(new T.ConeGeometry(1.3-i*.25,1.9,12),leaf);crown.position.y=2.4+i*.8;root.add(crown);}else for(let i=0;i<9;i++){const crown=new T.Mesh(new T.IcosahedronGeometry(.8,1),leaf);crown.position.set(Math.sin(i*2.4)*.85,3+Math.sin(i)*.45,Math.cos(i*2.4)*.85);crown.scale.y=.75;crown.castShadow=true;root.add(crown);}
 for(const side of [-1,1])for(const axis of ['x','z']){const size=axis==='x'?[3,.07,.07]:[.07,.07,3],pos=axis==='x'?[0,.65,side*1.5]:[side*1.5,.65,0];box(size,pos,rail);colliders.push({size:axis==='x'?[3,.7,.1]:[.1,.7,3],offset:axis==='x'?[0,.35,side*1.5]:[side*1.5,.35,0]});}
 for(const x of [-1.5,1.5])for(const z of [-1.5,1.5])box([.09,.8,.09],[x,.4,z],rail);
 return {root,colliders};
};
