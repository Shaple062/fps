window.FPSModels.player=(T,p={})=>{
 const root=new T.Group(),legs=[],arms=[],mat=c=>new T.MeshStandardMaterial({color:c,roughness:.6}),skin=mat(0xf1c6a7),cloth=mat(p.color||0x416c79),trim=mat(p.trim||0x91b6ba),hair=mat(p.hair||0x342b28),gold=mat(0xd8b568),white=mat(0xffffff),black=mat(0x242228);
 const mesh=(geometry,pos,material,parent=root)=>{const m=new T.Mesh(geometry,material);m.position.set(...pos);m.castShadow=true;parent.add(m);return m;},sphere=(r,pos,m,scale=[1,1,1])=>{const o=mesh(new T.SphereGeometry(r,16,12),pos,m);o.scale.set(...scale);return o;};
 mesh(new T.CylinderGeometry(.22,p.female?.38:.27,.64,12),[0,.95,0],cloth);mesh(new T.CylinderGeometry(.235,.24,.08,12),[0,.95,0],trim);
 sphere(.36,[0,1.54,0],skin,[1,1.08,.9]);sphere(.37,[0,1.72,-.05],hair,[1,.65,.86]);
 for(const side of [-1,1]){sphere(.08,[side*.34,1.52,0],skin);sphere(.09,[side*.14,1.57,.29],white,[1,1.2,.3]);sphere(.065,[side*.14,1.57,.315],black,[1,1.2,.3]);sphere(.018,[side*.12,1.60,.334],white);const leg=mesh(new T.CylinderGeometry(.075,.085,.45,8),[side*.13,.32,0],trim);legs.push(leg);sphere(.095,[side*.13,.1,.05],hair,[1,.7,1.6]);const arm=mesh(new T.CylinderGeometry(.085,.065,.5,8),[side*.31,.98,0],cloth);arms.push(arm);sphere(.075,[side*.31,.71,0],skin);if(p.braids)for(let i=0;i<4;i++)sphere(.09,[side*(.34+i*.014),1.5-i*.17,-.04],hair);}
 if(p.female)mesh(new T.CylinderGeometry(.25,.39,.38,14),[0,.65,0],cloth);
 if(p.crown){mesh(new T.TorusGeometry(.31,.035,6,20),[0,1.89,0],gold).rotation.x=Math.PI/2;for(let i=0;i<7;i++)mesh(new T.ConeGeometry(.045,.16,4),[Math.cos(i*6.28/7)*.3,1.96,Math.sin(i*6.28/7)*.3],gold);}
 if(p.hat){sphere(.34,[0,1.87,0],white,[1,.45,1]);sphere(.065,[0,1.94,.29],trim);}
 if(p.bun)sphere(.14,[0,1.99,-.08],hair);
 if(p.spikes)for(let i=0;i<7;i++){const spike=mesh(new T.ConeGeometry(.09,.25,5),[(i-3)*.08,1.93,-.04],hair);spike.rotation.z=(3-i)*.15;}
 const muzzle=new T.Object3D();muzzle.position.set(.3,1.1,.65);root.add(muzzle);
 return {root,muzzle,animate(t,moving,recoil,mounted=false){legs.forEach((leg,i)=>leg.rotation.x=mounted?-1.15:moving?Math.sin(t*10+i*Math.PI)*.35:0);arms.forEach((arm,i)=>arm.rotation.x=p.civilian?(moving?Math.sin(t*8+i*Math.PI)*.3:0):-1.1-recoil*.25);}};
};


