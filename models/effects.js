// Geometry for transient effects is independent of the game's main program.
window.FPSModels.effects = (T) => {
  const sphere=new T.SphereGeometry(1,8,6),cone=new T.ConeGeometry(1,1,6),ring=new T.RingGeometry(.65,1,16);
  const material=color=>new T.MeshBasicMaterial({color,transparent:true,opacity:1,depthWrite:false,blending:T.AdditiveBlending,side:T.DoubleSide});
  function mesh(g,color){const m=new T.Mesh(g,material(color));m.userData.sharedGeometry=true;return m;}
  return {
    bullet(color){const root=new T.Group(),core=mesh(sphere,0xfff8df),tail=mesh(cone,color);core.scale.set(.045,.045,.12);tail.rotation.x=-Math.PI/2;tail.position.z=-.55;tail.scale.set(.038,1.1,.038);root.add(core,tail);return root;},
    flash(color){const root=new T.Group();for(let i=0;i<2;i++){const m=mesh(cone,i?0xfff6c7:color);m.rotation.x=Math.PI/2;m.position.z=.13;m.scale.set(i?.07:.13,.35,i?.07:.13);m.rotation.z=i*Math.PI/4;root.add(m);}return root;},
    impact(color,normal){const root=new T.Group(),halo=mesh(ring,color);halo.scale.setScalar(.16);halo.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),normal);root.add(halo);
      const positions=[],velocities=[];for(let i=0;i<9;i++){positions.push(0,0,0);velocities.push(new T.Vector3(Math.random()-.5,Math.random()-.25,Math.random()-.5).addScaledVector(normal,.6).normalize().multiplyScalar(1.5+Math.random()*2.5));}
      const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));const sparks=new T.Points(geometry,new T.PointsMaterial({color,size:.07,transparent:true,opacity:1,depthWrite:false,blending:T.AdditiveBlending}));root.add(sparks);root.userData.sparks=sparks;root.userData.velocities=velocities;return root;
    }
  };
};
