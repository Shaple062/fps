// Enemy silhouette deliberately differs from the peaceful human residents.
window.FPSModels.enemy=(T,p={})=>{
 const root=new T.Group(),metal=new T.MeshStandardMaterial({color:0x4c5964,metalness:.4,roughness:.6}),red=new T.MeshBasicMaterial({color:0xff4545}),silver=new T.MeshStandardMaterial({color:0xb3bac0}),legs=[];
 const box=(size,pos,mat)=>{const m=new T.Mesh(new T.BoxGeometry(...size),mat);m.position.set(...pos);m.castShadow=true;root.add(m);return m;};
 box([.55,.65,.35],[0,1.02,0],metal);box([.58,.4,.4],[0,1.57,0],silver);box([.48,.1,.035],[0,1.6,.22],red);box([.25,.18,.05],[0,1.1,.2],red);
 for(const side of [-1,1]){legs.push(box([.18,.7,.22],[side*.17,.39,0],metal));box([.15,.45,.18],[side*.37,1.03,.12],silver);}
 const gun=box([.14,.14,.55],[.31,1.12,.45],metal),muzzle=new T.Object3D();muzzle.position.set(.31,1.12,.74);root.add(muzzle);
 const mark=new T.Mesh(new T.OctahedronGeometry(.11),red);mark.position.y=2.05;root.add(mark);
 return {root,muzzle,animate(t,moving,recoil=0){legs.forEach((leg,i)=>leg.rotation.x=moving?Math.sin(t*9+i*Math.PI)*.35:0);gun.position.z=.45-recoil*.07;mark.rotation.y=t;}};
};
