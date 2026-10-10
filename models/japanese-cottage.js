window.FPSModels.japaneseCottage=(T,p={})=>{
 const model=FPSModels.coastalHouse(T,{...p,width:6,depth:6,color:0xe2d3b6}),wood=new T.MeshStandardMaterial({color:0x55453c}),roof=new T.MeshStandardMaterial({color:0x4b5962});
 for(const x of [-3,-1.5,1.5,3]){const beam=new T.Mesh(new T.BoxGeometry(.11,6.5,.12),wood);beam.position.set(x,3.25,3.14);model.root.add(beam);}
 for(const side of [-1,1]){const slope=new T.Mesh(new T.BoxGeometry(3.8,.16,6.8),roof);slope.position.set(side*1.55,6.9,0);slope.rotation.z=side*-.32;slope.castShadow=true;model.root.add(slope);}return model;
};
