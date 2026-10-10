window.FPSModels.enoshimaIsland=(T)=>{
  const root=new T.Group();let seed=458;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const geometry=new T.SphereGeometry(1,64,24),positions=geometry.attributes.position,colors=[];
  for(let i=0;i<positions.count;i++){const x=positions.getX(i),y=positions.getY(i),z=positions.getZ(i),ridge=1+Math.sin(x*13+z*9)*.055+Math.sin(z*27-x*11)*.025;
    positions.setXYZ(i,x*36*ridge,Math.max(-1,y*14*(.8+Math.sin(x*3+1)*.18))*ridge,z*21*ridge);
    const color=new T.Color(y<.15?0x747b6d:0x36614b);color.multiplyScalar(.86+random()*.28);colors.push(color.r,color.g,color.b);
  }
  geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3));geometry.computeVertexNormals();const hill=new T.Mesh(geometry,new T.MeshStandardMaterial({vertexColors:true,roughness:1}));root.add(hill);
  const leaf=new T.InstancedMesh(new T.IcosahedronGeometry(1,1),new T.MeshStandardMaterial({color:0x3d6b4b,roughness:1}),230),dummy=new T.Object3D();let used=0;
  for(let i=0;i<230;i++){const x=(random()-.5)*61,z=(random()-.5)*33,r=x*x/(36*36)+z*z/(21*21);if(r>.86)continue;const y=Math.sqrt(1-r)*12;dummy.position.set(x,y,z);dummy.scale.set(1+random()*1.5,1.1+random()*1.5,1+random());dummy.rotation.y=random()*6;dummy.updateMatrix();leaf.setMatrixAt(used++,dummy.matrix);}leaf.count=used;root.add(leaf);
  const white=new T.MeshStandardMaterial({color:0xdbd8c9,roughness:.8}),dark=new T.MeshStandardMaterial({color:0x6c797b,metalness:.35,roughness:.5});
  const tower=new T.Mesh(new T.CylinderGeometry(.24,.45,9,12),white);tower.position.set(4,18,-2);root.add(tower);
  const deck=new T.Mesh(new T.CylinderGeometry(1.25,.85,.8,16),dark);deck.position.set(4,22,-2);root.add(deck);const cap=new T.Mesh(new T.ConeGeometry(1.1,.65,16),white);cap.position.set(4,22.65,-2);root.add(cap);
  for(let i=0;i<16;i++){const x=-27+i*3.5,y=.8;const house=new T.Mesh(new T.BoxGeometry(2+random()*2,1.5+random()*1.5,2),white);house.position.set(x,y,17);root.add(house);}
  return {root};
};
