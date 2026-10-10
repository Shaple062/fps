window.FPSModels.railTrack=(T,p={})=>{
  const root=new T.Group(),length=p.length||80;
  const steel=new T.MeshStandardMaterial({color:0x777d7e,metalness:.85,roughness:.3}),wood=new T.MeshStandardMaterial({color:0x5b5348,roughness:.94}),stone=new T.MeshStandardMaterial({color:0x767a75,roughness:.95});
  const box=(size,pos,mat)=>{const m=new T.Mesh(new T.BoxGeometry(...size),mat);m.position.set(...pos);m.castShadow=m.receiveShadow=true;root.add(m);};
  box([length,.11,3.25],[0,.035,0],stone);
  const count=Math.floor(length/.65),sleepers=new T.InstancedMesh(new T.BoxGeometry(.2,.13,2.45),wood,count),dummy=new T.Object3D();for(let i=0;i<count;i++){dummy.position.set(-length/2+i*.65,.13,0);dummy.updateMatrix();sleepers.setMatrixAt(i,dummy.matrix);}sleepers.castShadow=sleepers.receiveShadow=true;root.add(sleepers);
  for(const z of [-.72,.72]){box([length,.12,.065],[0,.23,z],steel);box([length,.045,.13],[0,.3125,z],steel);}
  // Crossing deck is flush and does not introduce a false collision ridge.
  const deck=new T.MeshStandardMaterial({color:0x4d5351,roughness:.92});box([7,.12,2.8],[0,.26,0],deck);
  return {root};
};

