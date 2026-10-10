window.FPSModels.coastalShore=(T,p={})=>{
  const root=new T.Group(),size=[p.width||100,.4,p.depth||4],offset=[0,-.2,0];
  const mesh=new T.Mesh(new T.BoxGeometry(...size),new T.MeshStandardMaterial({color:0xd5c29b,roughness:.95}));mesh.position.fromArray(offset);mesh.receiveShadow=true;root.add(mesh);
  // A solid vertical seawall covers the land/water join without a floating gap.
  const edge=new T.Mesh(new T.BoxGeometry(size[0],.9,.22),new T.MeshStandardMaterial({color:0x8a928b,roughness:.92}));edge.position.set(0,-.45,-size[2]/2+.11);root.add(edge);
  return {root,colliders:[{size,offset},{size:[size[0],.9,.22],offset:[0,-.45,-size[2]/2+.11]}]};
};

