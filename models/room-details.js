// Shared compact interior; keep entrance, medicine table and stair aisle clear.
window.FPSModels.roomDetails=(T,p={})=>{
 const root=new T.Group(),colliders=[],w=p.width||7,d=p.depth||7,l=p.level||3,mat=c=>new T.MeshStandardMaterial({color:c,roughness:.85}),wood=mat(0x936d4d),cream=mat(0xf0e5cb),cloth=mat(0x668a91),dark=mat(0x334450),leaf=mat(0x58764e),red=mat(0xd09c82);
 const box=(size,pos,m,solid=false)=>{const mesh=new T.Mesh(new T.BoxGeometry(...size),m);mesh.position.set(...pos);mesh.castShadow=mesh.receiveShadow=true;root.add(mesh);if(solid)colliders.push({size,offset:pos});return mesh;};
 const cylinder=(r,h,pos,m)=>{const mesh=new T.Mesh(new T.CylinderGeometry(r,r,h,12),m);mesh.position.set(...pos);root.add(mesh);return mesh;};
 const plant=(x,y,z)=>{cylinder(.11,.18,[x,y+.09,z],red);for(let i=0;i<5;i++){const m=new T.Mesh(new T.SphereGeometry(.08,8,6),leaf);m.scale.set(.7,1.8,.7);m.position.set(x+Math.sin(i*2.4)*.06,y+.25+i*.025,z+Math.cos(i*2.4)*.06);m.rotation.z=Math.sin(i)*.5;root.add(m);}};
 // Entrance mat and living corner, left of the central aisle.
 box([1.15,.018,.6],[0,.075,d/2-.6],red);box([1.55,.018,1.6],[-w*.26,.079,.8],cloth);
 const sx=-w*.27,sz=.8;box([1.55,.4,.65],[sx,.3,sz],wood,true);box([1.45,.15,.64],[sx,.57,sz],cloth);box([1.55,.65,.15],[sx,.75,sz-.33],cloth,true);for(const x of [sx-.67,sx+.67]){box([.15,.3,.7],[x,.69,sz],cream);box([.35,.25,.15],[x*.85,.82,sz-.15],red).rotation.z=(x-sx)*.2;}
 // Dining chair stays beside the existing table; medicine remains on that table.
 box([.45,.09,.45],[-1.04,.46,0],wood,true);box([.09,.72,.46],[-1.24,.83,0],wood,true);for(const x of [-1.2,-.87])for(const z of [-.16,.16])box([.045,.42,.045],[x,.25,z],wood);
 cylinder(.07,.12,[.46,1.02,-.25],cream);box([.24,.012,.3],[-.35,.973,-.25],red);plant(.5,.96,.27);
 // Cabinet fronts, books and framed seaside art on the rear wall.
 for(const x of [-w*.3-.29,-w*.3+.29]){box([.54,1.73,.018],[x,.97,-d*.35+.26],cream);cylinder(.025,.08,[x+.17,1,-d*.35+.29],wood).rotation.x=Math.PI/2;}plant(-w*.3,1.9,-d*.35);
 box([1.05,.5,.06],[.35,1.45,-d/2+.18],wood);box([.92,.37,.065],[.35,1.45,-d/2+.22],cloth);box([.92,.10,.07],[.35,1.31,-d/2+.23],cream);box([.26,.18,.075],[.47,1.42,-d/2+.24],leaf);
 for(const y of [1.55,l+1.4]){box([.28,.045,1.2],[-w/2+.27,y,-.6],wood);for(let i=0;i<6;i++)box([.12,.18+i%3*.04,.035],[-w/2+.27,y+.12,-1.05+i*.16],[cream,red,cloth][i%3]);}
 // Bedding details on the existing upstairs bed.
 const bx=-w*.25,bz=-d*.2;box([1.66,.06,1.5],[bx,l+.65,bz+.37],cream);box([1.68,.04,.18],[bx,l+.695,bz+.92],cloth);for(const x of [bx-.37,bx+.37])box([.56,.11,.4],[x,l+.70,bz-.8],cream);
 box([.45,.57,.45],[bx+1.15,l+.29,bz-.65],wood,true);box([.40,.20,.025],[bx+1.15,l+.39,bz-.41],cream);cylinder(.045,.27,[bx+1.15,l+.72,bz-.65],dark);const shade=new T.Mesh(new T.CylinderGeometry(.11,.18,.20,12),new T.MeshStandardMaterial({color:0xffe8b5,emissive:0xc58e45,emissiveIntensity:.35}));shade.position.set(bx+1.15,l+.91,bz-.65);root.add(shade);
 box([1.1,.018,1.2],[-.2,l+.015,1.45],red);box([.65,.055,1.1],[-w/2+.5,l+.95,1.3],wood,true);for(const z of [1,1.6])box([.08,.9,.08],[-w/2+.5,l+.45,z],wood);plant(-w/2+.5,l+.98,1.1);
 // Thin stair and balcony handrails; short enough to jump over.
 const edge=w/2-1.35;for(const z of [-d/2+.5,0,d/2-.65])box([.045,.75,.045],[edge,l+.375,z],wood);box([.055,.055,d-1.15],[edge,l+.76,-.08],wood);
 for(const x of [-1.1,1.1])box([.06,.82,.06],[x,l+.41,d/2+1.05],wood);box([2.3,.06,.06],[0,l+.82,d/2+1.05],wood,true);
 return {root,colliders};
};
