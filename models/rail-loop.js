// One route definition is shared by track geometry and the moving train.
window.FPSRailRoute=(T,p={})=>{
  const x=p.halfWidth||36,z=p.halfDepth||26,cz=p.centerZ??16,r=p.radius||14,points=[];
  for(const [cx,zc,start]of [[x-r,cz-z+r,-Math.PI/2],[x-r,cz+z-r,0],[-x+r,cz+z-r,Math.PI/2],[-x+r,cz-z+r,Math.PI]])for(let i=0;i<=10;i++){const a=start+i*Math.PI/20;points.push(new T.Vector3(cx+r*Math.cos(a),0,zc+r*Math.sin(a)));}
  return new T.CatmullRomCurve3(points,true,'centripetal');
};
window.FPSModels.railLoop=(T,p={})=>{
  const root=new T.Group(),curve=FPSRailRoute(T,p),length=curve.getLength(),count=Math.ceil(length/.65),wood=new T.MeshStandardMaterial({color:0x5b5348}),steel=new T.MeshStandardMaterial({color:0x777d7e,metalness:.8,roughness:.35});
  const sleepers=new T.InstancedMesh(new T.BoxGeometry(2.45,.13,.2),wood,count),dummy=new T.Object3D();
  for(let i=0;i<count;i++){const u=i/count,v=curve.getPointAt(u),d=curve.getTangentAt(u);dummy.position.copy(v);dummy.position.y=.13;dummy.rotation.y=Math.atan2(d.x,d.z);dummy.updateMatrix();sleepers.setMatrixAt(i,dummy.matrix);}sleepers.receiveShadow=true;root.add(sleepers);
  for(const side of [-1,1]){const points=[];for(let i=0;i<=800;i++){const u=i/800,v=curve.getPointAt(u),d=curve.getTangentAt(u);v.add(new T.Vector3(d.z,0,-d.x).multiplyScalar(side*.72));v.y=.27;points.push(v);}const path=new T.CatmullRomCurve3(points);root.add(new T.Mesh(new T.TubeGeometry(path,800,.065,6,false),steel));}
  return {root};
};

