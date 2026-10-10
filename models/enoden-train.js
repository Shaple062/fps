// Enoden-inspired green / cream single car. Dimensions are in metres; front is +Z.
window.FPSModels.enodenTrain=(T,p={})=>{
  const root=new T.Group(),green=new T.MeshStandardMaterial({color:0x235e50,metalness:.25,roughness:.42}),cream=new T.MeshStandardMaterial({color:0xe5e5ce,metalness:.18,roughness:.5}),metal=new T.MeshStandardMaterial({color:0x727c7b,metalness:.78,roughness:.32}),rubber=new T.MeshStandardMaterial({color:0x20282b,roughness:.87}),glass=new T.MeshStandardMaterial({color:0xc0e8ef,metalness:0,roughness:.1,transparent:true,opacity:.16,depthWrite:false,side:T.DoubleSide}),light=new T.MeshStandardMaterial({color:0xffebbd,emissive:0xffdd91,emissiveIntensity:.65});
  const box=(w,h,d,x,y,z,mat=green)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;root.add(m);return m;};
  function label(text,w,h,bg='#153e36',fg='#f5ecd3'){const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle=bg;ctx.fillRect(0,0,512,128);ctx.fillStyle=fg;ctx.font='bold 52px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,256,66);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshStandardMaterial({map:tex,roughness:.6}));return m;}
  for(const x of [-1.215,1.215]){box(.12,1.17,14.8,x,1.17,0);box(.12,.22,14.8,x,1.9,0,cream);box(.12,.2,14.8,x,3.06,0,cream);for(let i=0;i<=9;i++)box(.12,1.1,.24,x,2.48,-6.96+i*1.53,cream);}for(const z of [-7.34,7.34]){box(2.55,1.12,.12,0,1.14,z);box(2.55,.2,.12,0,3.06,z);for(const x of [-1.23,-.41,.41,1.23])box(.11,1.16,.12,x,2.4,z,cream);}for(const x of [-1.27,1.27])box(.11,.13,14.9,x,1.77,0,green);
  const roofShape=new T.Shape();roofShape.moveTo(-1.3,0);roofShape.quadraticCurveTo(-1.22,.35,0,.4);roofShape.quadraticCurveTo(1.22,.35,1.3,0);roofShape.lineTo(-1.3,0);
  const roof=new T.Mesh(new T.ExtrudeGeometry(roofShape,{depth:14.9,bevelEnabled:false,curveSegments:12}),metal);roof.position.set(0,3.16,-7.45);roof.castShadow=true;root.add(roof);
  box(2.58,.12,14.9,0,3.16,0,metal);box(2.25,.25,14.2,0,.48,0,rubber);
  // Repeated side glazing, window frames and sliding doors.
  for(const side of [-1,1]){
    for(let i=0;i<9;i++){const z=-6.2+i*1.53;for(const dz of [-.59,.59])box(.04,1.01,.045,side*1.286,2.47,z+dz,metal);box(.045,.9,1.07,side*1.312,2.48,z,glass);box(.055,.025,1.08,side*1.34,2.44,z,cream);}
    for(const z of [-4.65,4.65]){box(.055,.75,1.14,side*1.34,1.1,z,green);for(const d of [-.28,.28]){for(const dz of [-.23,.23])box(.065,1.08,.035,side*1.38,2.31,z+d+dz,metal);box(.07,.96,.36,side*1.385,2.31,z+d,glass);}box(.075,1.92,.015,side*1.39,1.78,z,metal);box(.1,.035,1.13,side*1.4,.77,z,metal);}
    for(const z of [-4.9,4.9]){box(.38,.4,1.9,side*.91,.42,z,rubber);for(const dz of [-.55,.55]){const wheel=new T.Mesh(new T.CylinderGeometry(.35,.35,.18,20),rubber);wheel.rotation.z=Math.PI/2;wheel.position.set(side*1.01,.35,z+dz);root.add(wheel);const hub=new T.Mesh(new T.CylinderGeometry(.16,.16,.2,16),metal);hub.rotation.z=Math.PI/2;hub.position.copy(wheel.position);root.add(hub);}}
  }
  for(const end of [-1,1]){
    for(const x of [-.82,0,.82]){box(.57,1,.047,x,2.39,end*7.45,glass);box(.018,.38,.045,x+.12,2.05,end*7.49,rubber);}
    box(.77,.8,.03,0,1.1,end*7.43,green);box(.52,.94,.045,0,2.4,end*7.50,glass);
    for(const x of [-.95,.95]){const lamp=new T.Mesh(new T.CylinderGeometry(.145,.145,.07,20),light);lamp.rotation.x=Math.PI/2;lamp.position.set(x,1.39,end*7.47);root.add(lamp);box(.13,.07,.06,x,.98,end*7.48,new T.MeshStandardMaterial({color:0x853b31}));}
    box(1.6,.18,.18,0,.66,end*7.5,metal);box(.23,.18,.37,0,.56,end*7.64,rubber);
    const destination=label('鎌倉  KAMAKURA',1.35,.27);destination.position.set(0,3.04,end*7.44);if(end<0)destination.rotation.y=Math.PI;root.add(destination);
    const number=label('305',.36,.18);number.position.set(.48,1.37,end*7.48);if(end<0)number.rotation.y=Math.PI;root.add(number);
  }
  // Roof equipment and a diamond pantograph with actual bars.
  box(1.25,.19,1.85,0,3.5,-3,metal);box(1.05,.19,1.4,0,3.5,4,metal);
  const bar=(a,b,r=.026)=>{const d=b.clone().sub(a),m=new T.Mesh(new T.CylinderGeometry(r,r,d.length(),8),metal);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());root.add(m);};
  for(const x of [-.35,.35]){const points=[[x,3.45,1],[x,4.15,.18],[x,4.65,1],[x,4.15,1.82],[x,3.45,1]].map(a=>new T.Vector3(...a));for(let i=0;i<4;i++)bar(points[i],points[i+1]);}box(1.45,.055,.11,0,4.68,1,metal);
  let route=null,progress=.9;
    const passenger=new T.Vector3(0,.76,3.5),bogies=[];let sitting=false;
  for(const z of [-4.9,4.9]){const pivot=new T.Group();pivot.position.z=z;const parts=root.children.filter(m=>m.position.y<.65&&Math.abs(m.position.z-z)<1.3);for(const m of parts){root.remove(m);m.position.z-=z;pivot.add(m);}root.add(pivot);bogies.push({pivot,z});}
  box(2.3,.12,13.5,0,.7,0,cream);for(const x of [-.9,.9])box(.38,.4,8,x,.96,0,green);
  // Warm wooden floor, upholstered benches, luggage rails and hanging straps.
  const seatFabric=new T.MeshStandardMaterial({color:0x567b70,roughness:.95}),timber=new T.MeshStandardMaterial({color:0xb39776,roughness:.85}),ivory=new T.MeshStandardMaterial({color:0xf3e9d2,roughness:.7});
  box(2.22,.018,13.3,0,.77,0,timber);for(let z=-6.4;z<6.5;z+=.55)box(2.21,.005,.012,0,.782,z,metal);
  for(const side of [-1,1]){box(.42,.13,7.9,side*.9,1.21,0,seatFabric);box(.08,.65,7.9,side*1.08,1.53,0,seatFabric);for(let z=-3.5;z<=3.5;z++){box(.43,.008,.014,side*.9,1.28,z,ivory);box(.08,.55,.014,side*1.03,1.55,z,ivory);}box(.38,.045,10,side*.94,2.78,0,metal);for(let z=-5;z<=5;z+=1){box(.025,.16,.32,side*.96,2.85,z,ivory);}bar(new T.Vector3(side*.55,2.94,-5.8),new T.Vector3(side*.55,2.94,5.8),.018);for(let z=-5;z<=5;z+=1.25){box(.025,.24,.025,side*.55,2.82,z,ivory);const handle=new T.Mesh(new T.TorusGeometry(.085,.015,6,16),ivory);handle.position.set(side*.55,2.62,z);root.add(handle);}for(const z of [-4.15,4.15])bar(new T.Vector3(side*.58,.8,z),new T.Vector3(side*.58,3.08,z),.024);}
  box(.18,.018,12,0,3.065,0,new T.MeshStandardMaterial({color:0xffefd4,emissive:0xffd9a0,emissiveIntensity:.85}));
  for(const z of [-6.65,6.65]){box(1.9,.34,.36,0,1.32,z,green);const map=label('江ノ島  →  鎌倉高校前  →  鎌倉',1.85,.22,'#e6dfc5','#24574e');map.position.set(0,2.82,z);if(z>0)map.rotation.y=Math.PI;root.add(map);for(const x of [-.45,0,.45]){const dial=new T.Mesh(new T.CircleGeometry(.065,12),new T.MeshStandardMaterial({color:0xd1ddca,emissive:0x41746b,emissiveIntensity:.25}));dial.position.set(x,1.49,z+(z>0?-.19:.19));if(z>0)dial.rotation.y=Math.PI;root.add(dial);}}
  return {root,dynamic:!!p.moving,get seated(){return sitting;},board(){sitting=false;passenger.set(0,.76,3.5);},ridePosition:()=>root.localToWorld(passenger.clone()),
    toggleSeat(){sitting=!sitting;if(sitting){passenger.x=passenger.x<0?-.9:.9;passenger.y=.45;passenger.z=T.MathUtils.clamp(passenger.z,-3.6,3.6);}else{passenger.x=0;passenger.y=.76;}return sitting;},
    walk(delta){const before=root.localToWorld(passenger.clone());if(!sitting){const local=delta.clone().applyQuaternion(root.quaternion.clone().invert());passenger.x=T.MathUtils.clamp(passenger.x+local.x,-.37,.37);passenger.z=T.MathUtils.clamp(passenger.z+local.z,-6.3,6.3);passenger.y=.76;}const after=root.localToWorld(passenger.clone());return {position:after,grounded:true,dx:after.x-before.x,dz:after.z-before.z};},exitPosition:()=>root.localToWorld(new T.Vector3(2.5,-.12,4.65)),
    canBoard:position=>{const q=root.worldToLocal(position.clone());return Math.abs(q.x)<3&&Math.abs(q.z)<7&&q.y<3;},
    update(time,dt,camera,active){if(!p.moving)return;if(!route)route=FPSRailRoute(T);if(active)progress=(progress+dt*4/route.getLength())%1;const length=route.getLength(),front=route.getPointAt((progress+4.9/length)%1),back=route.getPointAt((progress-4.9/length+1)%1),heading=front.clone().sub(back);root.position.copy(front).add(back).multiplyScalar(.5);root.position.y=.12;root.rotation.y=Math.atan2(heading.x,heading.z);root.updateMatrixWorld(true);for(const b of bogies){const u=(progress+b.z/length+1)%1,point=route.getPointAt(u),tangent=route.getTangentAt(u);point.y=.12;b.pivot.position.copy(root.worldToLocal(point));b.pivot.rotation.y=Math.atan2(tangent.x,tangent.z)-root.rotation.y;}},
    colliders:[
    {size:[2.82,3.55,15.35],offset:[0,1.855,0]},
    {size:[2.3,.7,13],offset:[0,.35,0]},
    {size:[.3,.25,.5],offset:[0,.56,7.64]},
    {size:[.3,.25,.5],offset:[0,.56,-7.64]},
    {size:[1.45,1.25,1.8],offset:[0,4.08,1]}
  ]};
};






