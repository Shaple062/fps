window.FPSModels.weaponShop=(T)=>{
 const root=new T.Group(),colliders=[],wall=new T.MeshStandardMaterial({color:0xc0c6b8}),wood=new T.MeshStandardMaterial({color:0x765e47}),dark=new T.MeshStandardMaterial({color:0x39474c});let api=null;
 const box=(size,pos,mat,solid=true)=>{const m=new T.Mesh(new T.BoxGeometry(...size),mat);m.position.set(...pos);m.castShadow=m.receiveShadow=true;root.add(m);if(solid)colliders.push({size,offset:pos});};
 box([12,.06,8],[0,.03,0],wall);for(const x of [-6,6])box([.2,3.6,8],[x,1.8,0],wall);box([12,3.6,.2],[0,1.8,-4],wall);for(const x of [-3.5,3.5])box([5,3.6,.2],[x,1.8,4],wall);box([2,1,.2],[0,3.1,4],wall);box([12.4,.2,8.4],[0,3.7,0],dark);box([6,1,.8],[0,.5,-1.8],wood);
 for(const x of [-3,0,3]){box([2,.12,1],[x,1.2,-3],wood);box([.1,.1,.85],[x,1.35,-3],dark,false);box([.3,.2,.45],[x,1.4,-3.2],dark,false);}
 const c=document.createElement('canvas');c.width=512;c.height=128;const g=c.getContext('2d');g.fillStyle='#293a32';g.fillRect(0,0,512,128);g.fillStyle='#d8eda8';g.font='bold 52px sans-serif';g.textAlign='center';g.fillText('工作坊 / ARMORY',256,85);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;const sign=new T.Mesh(new T.PlaneGeometry(5,1),new T.MeshBasicMaterial({map:tex}));sign.position.set(0,2.9,4.12);root.add(sign);
 return {root,colliders,configure(value){api=value;},shopPosition:()=>root.localToWorld(new T.Vector3(0,1,.2))};
};

