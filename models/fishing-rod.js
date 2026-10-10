window.FPSModels.fishingRod=(T)=>{
 const root=new T.Group(),dark=new T.MeshStandardMaterial({color:0x37434b,roughness:.6}),metal=new T.MeshStandardMaterial({color:0xa2b9c1,metalness:.4,roughness:.4});
 const start=new T.Vector3(0,-.2,.1),end=new T.Vector3(.08,1.15,-1.1),d=end.clone().sub(start),shaft=new T.Mesh(new T.CylinderGeometry(.012,.025,d.length(),8),dark);shaft.position.copy(start).add(end).multiplyScalar(.5);shaft.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());root.add(shaft);
 const reel=new T.Mesh(new T.CylinderGeometry(.075,.075,.07,12),metal);reel.rotation.z=Math.PI/2;reel.position.set(.04,-.05,-.02);root.add(reel);
 for(let i=1;i<5;i++){const ring=new T.Mesh(new T.TorusGeometry(.025,.005,5,12),metal);ring.position.lerpVectors(start,end,i/5);root.add(ring);}
 const tip=new T.Object3D();tip.position.copy(end);root.add(tip);root.position.set(.3,-.42,-.45);return {root,tip};
};
