window.FPSModels.japaneseTownhouse=(T,p={})=>{
 const model=FPSModels.coastalHouse(T,{...p,width:7,depth:6,color:0xc6d0ca}),wood=new T.MeshStandardMaterial({color:0x6c4e3a});
 for(let i=0;i<12;i++){const slat=new T.Mesh(new T.BoxGeometry(.07,1.1,.07),wood);slat.position.set(-3+i*.55,4.45,3.2);model.root.add(slat);}
 const awning=new T.Mesh(new T.BoxGeometry(2.5,.1,.9),wood);awning.position.set(0,2.5,3.4);model.root.add(awning);return model;
};
