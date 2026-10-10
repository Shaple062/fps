window.FPSModels.seagullFlock=(T)=>{
 const root=new T.Group(),birds=[],white=new T.MeshStandardMaterial({color:0xf5f3e9}),dark=new T.MeshStandardMaterial({color:0x626b71});
 for(let i=0;i<18;i++){const bird=new T.Group(),body=new T.Mesh(new T.SphereGeometry(.13,8,6),white);body.scale.set(.65,1,1.7);bird.add(body);const wings=[];for(const side of [-1,1]){const wing=new T.Mesh(new T.BoxGeometry(.55,.025,.13),i%4?white:dark);wing.position.x=side*.28;bird.add(wing);wings.push(wing);}root.add(bird);birds.push({bird,wings,phase:i*.7});}
 return {root,update(t){for(const [i,v]of birds.entries()){const a=t*.075+v.phase*.06;v.bird.position.set(Math.cos(a)*28+(i%6)*2,18+Math.sin(t*.25+v.phase)*2+Math.floor(i/6)*1.5,-30+Math.sin(a)*12+Math.floor(i/6)*3);v.bird.rotation.y=-a;v.wings.forEach((w,j)=>w.rotation.z=Math.sin(t*5+v.phase)*.35*(j?1:-1));}}};
};
