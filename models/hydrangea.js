window.FPSModels.hydrangea=(T,p={})=>{
  const root=new T.Group();let seed=p.seed||91;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const stone=new T.MeshStandardMaterial({color:0x989a82,roughness:1}),pot=new T.Mesh(new T.BoxGeometry(1.7,.38,1.2),stone);pot.position.y=.19;pot.castShadow=pot.receiveShadow=true;root.add(pot);
  const dummy=new T.Object3D(),leaves=new T.InstancedMesh(new T.SphereGeometry(1,8,5),new T.MeshStandardMaterial({color:0x436c39,roughness:.92}),85);
  for(let i=0;i<85;i++){dummy.position.set((random()-.5)*1.65,.4+random()*.8,(random()-.5)*1.05);dummy.rotation.set(random()*2,random()*6,random()*2);dummy.scale.set(.18+random()*.14,.035,.08+random()*.06);dummy.updateMatrix();leaves.setMatrixAt(i,dummy.matrix);leaves.setColorAt(i,new T.Color().setHSL(.25+random()*.08,.32,.17+random()*.12));}leaves.castShadow=true;root.add(leaves);
  const petals=new T.InstancedMesh(new T.SphereGeometry(1,6,4),new T.MeshStandardMaterial({color:0xffffff,roughness:.75}),840);let k=0;
  for(let cluster=0;cluster<6;cluster++){const center=new T.Vector3((cluster%3-1)*.5,1+random()*.3,(cluster<3?-.25:.25));const hue=[.91,.74,.62][(cluster+(p.seed||0))%3];
    for(let floret=0;floret<35;floret++){const theta=random()*Math.PI*2,phi=Math.acos(random()*2-1),r=.2+random()*.08;const point=center.clone().add(new T.Vector3(Math.sin(phi)*Math.cos(theta)*r,Math.cos(phi)*r,Math.sin(phi)*Math.sin(theta)*r));
      for(let petal=0;petal<4;petal++){const angle=petal*Math.PI/2;dummy.position.copy(point).add(new T.Vector3(Math.cos(angle)*.025,.01,Math.sin(angle)*.025));dummy.rotation.set(.2,angle,0);dummy.scale.set(.032,.012,.022);dummy.updateMatrix();petals.setMatrixAt(k,dummy.matrix);petals.setColorAt(k++,new T.Color().setHSL(hue+random()*.04,.36,.57+random()*.16));}
    }
  }root.add(petals);return {root,collider:{size:[1.7,.9,1.2],offset:[0,.45,0]}};
};
