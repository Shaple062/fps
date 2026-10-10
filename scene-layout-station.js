// Reference-inspired Kamakurakōkōmae crossing. All placements and module paths live here.
window.FPSLayout={
  name:'鎌倉高校前 · 海岸平交道',spawn:[1.5,0,20],spawnYaw:.2,spawnPitch:0,
  bounds:{minX:-85,maxX:85,minZ:-40,maxZ:135},
  environment:{background:0xa2d9ed,fogDensity:.0015,exposure:1.05,far:1300,
    hemisphere:{sky:0xc0e6f3,ground:0xb3ad94,intensity:2},sun:{color:0xfff1d6,intensity:3,position:[-35,65,30]},pointLights:[]},
  modelScripts:['models/enoden-train.js','models/coastal-road.js','models/coastal-shore.js','models/rail-track.js','models/rail-loop.js','models/rail-crossing.js','models/coastal-station.js','models/coastal-sky.js','models/coastal-ocean.js','models/enoshima-island.js','models/coastal-street.js','models/hydrangea.js','models/coastal-house.js','models/room-details.js','models/potion.js','models/player.js','models/weapon-shop.js','models/animal-park.js','models/coastal-terrain.js','models/planted-tree.js','models/seagull-flock.js','models/japanese-cottage.js','models/japanese-townhouse.js','models/high-school.js','models/neighborhood-streets.js','models/residents.js','models/fishing-rod.js','models/fishing-pier.js'],
  patrol:[[-21,0,8],[-10,0,24],[13,0,24],[20,0,5]],
  elements:[
    {id:'sky',model:'coastalSky',position:[0,0,0]},
    {id:'ocean',model:'coastalOcean',position:[0,0,0]},
    {id:'enoshima',model:'enoshimaIsland',position:[30,-.8,-260],rotation:[0,.12,0]},
    {id:'terrain-extension',model:'coastalTerrain',position:[0,0,0]},
    {id:'gulls',model:'seagullFlock',position:[0,0,0]},
    {id:'neighborhood-streets',model:'neighborhoodStreets',position:[0,0,0]},
    {id:'residents',model:'residents',position:[0,0,0]},
    {id:'high-school',model:'highSchool',position:[-12,0,2],collision:true},
    {id:'rear-fence-west',model:'coastalStreet',position:[-21.5,0,47],params:{kind:'fence',length:37},collision:true},
    {id:'rear-fence-east',model:'coastalStreet',position:[21.5,0,47],params:{kind:'fence',length:37},collision:true},
    {id:'cottage-west',model:'japaneseCottage',position:[-31,0,19],rotation:[0,Math.PI/2,0],collision:true},
    {id:'townhouse-east',model:'japaneseTownhouse',position:[30,0,19],rotation:[0,-Math.PI/2,0],collision:true},
    ...[[-6,0,20,'broad'],[-30,0,33,'sakura'],[-4,0,30,'sakura'],[4,0,30,'sakura'],[6,0,20,'broad'],[30,0,33,'pine'],[-3,0,3,'sakura']].map((v,i)=>({id:'planted-tree-'+i,model:'plantedTree',position:v.slice(0,3),params:{kind:v[3]},collision:true})),
    {id:'coastal-home-a',model:'japaneseCottage',position:[-9,0,35],collision:true},
    {id:'coastal-home-b',model:'japaneseTownhouse',position:[9,0,35],collision:true},
    {id:'road',model:'coastalRoad',position:[0,0,0],collision:true},
    {id:'rails',model:'railLoop',position:[0,0,0],params:{halfWidth:36,halfDepth:26,centerZ:16,radius:14}},
    {id:'enoden-305',model:'enodenTrain',position:[-15,.12,-10],rotation:[0,Math.PI/2,0],params:{moving:true},collision:true},
    {id:'station',model:'coastalStation',position:[-15,0,-5.5],collision:true},
    {id:'crossing-left',model:'railCrossing',position:[-4,0,-7],collision:true},
    {id:'crossing-right',model:'railCrossing',position:[4.2,0,-12.5],rotation:[0,Math.PI,0],collision:true},
    {id:'coast-rail-west',model:'coastalStreet',position:[-16.5,0,-16],params:{kind:'fence',length:47},collision:true},
    {id:'coast-rail-east',model:'coastalStreet',position:[28.5,0,-16],params:{kind:'fence',length:23},collision:true},
    {id:'fishing-pier',model:'fishingPier',position:[12,0,-22],collision:true},
    {id:'shore-apron',model:'coastalShore',position:[0,0,-18],params:{width:80,depth:4},collision:true},
    {id:'boundary-right',model:'coastalStreet',position:[40,0,16],rotation:[0,Math.PI/2,0],params:{kind:'fence',length:64},collision:true},
    {id:'boundary-left',model:'coastalStreet',position:[-40,0,16],rotation:[0,Math.PI/2,0],params:{kind:'fence',length:64},collision:true},
    {id:'weapon-shop',model:'weaponShop',position:[-22,0,2],collision:true},
    {id:'animal-zone',model:'animalPark',position:[22,0,2],collision:true},
    {id:'side-rail-left',model:'coastalStreet',position:[-7.6,0,11],rotation:[0,Math.PI/2,0],params:{kind:'fence',length:24},collision:true},
    {id:'station-sign',model:'coastalStreet',position:[6.2,0,2],rotation:[0,-.12,0],params:{kind:'sign'},collision:true},
    {id:'cafe-sign',model:'coastalStreet',position:[6,0,17],rotation:[0,-.1,0],params:{kind:'sign',dark:true,title:'海辺の小さな喫茶',subtitle:'SEASIDE COFFEE'},collision:true},
    {id:'convex-mirror',model:'coastalStreet',position:[5,0,6.4],rotation:[0,-.2,0],params:{kind:'mirror'},collision:true},
    {id:'pole-a',model:'coastalStreet',position:[-5.5,0,10],params:{},collision:true},
    {id:'pole-b',model:'coastalStreet',position:[21.5,0,10],params:{},collision:true},
    {id:'pole-c',model:'coastalStreet',position:[-25,0,-3],params:{},collision:true},
    {id:'pole-d',model:'coastalStreet',position:[2,0,-3],params:{},collision:true},
    ...[5,8,11,14,20,23].map((z,i)=>({id:'hydrangea-right-'+i,model:'hydrangea',position:[5.4,0,z],params:{seed:91+i},collision:true})),
    ...[5,11,17,23].map((z,i)=>({id:'hydrangea-left-'+i,model:'hydrangea',position:[-5.6,0,z],params:{seed:143+i},collision:true})),
    {id:'house-left-a',model:'coastalHouse',position:[-18,0,20],rotation:[0,Math.PI/2,0],params:{color:0xc8c8b6,width:7,depth:7},collision:true},
    {id:'house-left-b',model:'coastalHouse',position:[-18,0,34],rotation:[0,Math.PI/2,0],params:{color:0xd9d2c2,width:7,depth:7},collision:true},
    {id:'house-right-a',model:'coastalHouse',position:[18,0,20],rotation:[0,-Math.PI/2,0],params:{color:0xded6c4,width:7,depth:7},collision:true},
    {id:'house-right-b',model:'coastalHouse',position:[18,0,34],rotation:[0,-Math.PI/2,0],params:{color:0xb8c8c6,width:7,depth:7},collision:true},
    ...[[-18,.96,20],[-18,.96,34],[18,.96,20],[18,.96,34]].map((position,i)=>({id:'potion-'+i,model:'potion',position,params:{kind:i%2?'speed':'heal'}})),
    ...[[-20,0,7],[-11,0,10],[-9,0,22],[-15,0,27],[10,0,7],[12,0,25],[22,0,7],[20,0,22],[-23,0,29],[24,0,30],[-10,0,-8],[16,0,-6]].map((position,i)=>({
      id:'enemy-'+(i+1),model:'enemy',position,collision:true,shootable:true,params:{color:[0xeab79c,0xb9d9c7,0xc5b8e1,0xe7c77d][i%4]},behavior:{health:75,speed:1.6+(i%3)*.2,range:13+(i%3),cooldown:2.5+(i%4)*.25,damage:3,respawnTime:60}
    }))
  ]
};
// Explicit defaults keep every element's transform/collision data inspectable.
window.FPSLayout.elements=window.FPSLayout.elements.map(element=>({rotation:[0,0,0],scale:[1,1,1],collision:false,shootable:false,...element}));










// Explicit pole-to-pole links; terminal poles have no outgoing dangling wires.
window.FPSLayout.powerLinks=[['pole-a','pole-b'],['pole-c','pole-d']];
for(const [from,to]of FPSLayout.powerLinks){const a=FPSLayout.elements.find(e=>e.id===from),b=FPSLayout.elements.find(e=>e.id===to);if(!a||!b)continue;const angle=-(a.rotation?.[1]||0),dx=b.position[0]-a.position[0],dz=b.position[2]-a.position[2];(a.params.connections??=[]).push([dx*Math.cos(angle)+dz*Math.sin(angle),b.position[1]-a.position[1],-dx*Math.sin(angle)+dz*Math.cos(angle)]);}

// Far scenery rests on the same analytic height as coastalTerrain.
const backdropHeight=(x,z)=>{const outside=Math.max(0,z-47,Math.abs(x)-40);return -.14+(1-Math.exp(-outside*.065))*(8+6*Math.sin(x*.045+z*.025)**2)+Math.max(0,z-75)*.025;};
for(const [i,x]of [-62,-47,-27,-8,15,34,51,68].entries()){const z=64+(i%3)*9;FPSLayout.elements.push({id:'hill-house-'+i,groundSnap:true,model:i%2?'japaneseCottage':'japaneseTownhouse',position:[x,backdropHeight(x,z),z],rotation:[0,(i%3-1)*.2,0],scale:[1,1,1],collision:true});}
for(let i=0;i<24;i++){const side=i%2?-1:1,x=side*(44+(i%5)*5),z=9+Math.floor(i/2)*5;FPSLayout.elements.push({id:'boundary-tree-'+i,groundSnap:true,model:'plantedTree',position:[x,backdropHeight(x,z),z],params:{kind:i%4===0?'sakura':i%3?'pine':'broad'},rotation:[0,0,0],scale:[1,1,1],collision:true});}






// Assign roadside beds after shared rail geometry is loaded; validate the full bed.
FPSLayout.prepare=T=>{
 const track=FPSLayout.elements.find(e=>e.model==='railLoop'),curve=window.FPSRailRoute?.(T,track?.params||{}),samples=curve?Array.from({length:480},(_,i)=>curve.getPointAt(i/480)):[],used=[];
 const candidates=[[-24,15.8],[-10,15.8],[10,15.8],[24,15.8],[-24,30.8],[24,30.8],[0,36.2],[-24,36.2],[24,36.2]];
 for(const z of [52.8,98.2])for(const x of [-65,-53,-41,-29,-17,-5,7,19,31,43,55,67])candidates.push([x,z]);
 const homes=FPSLayout.elements.filter(e=>/house|home|cottage|townhouse|school|weapon-shop/.test(e.id));
 const valid=([x,z])=>!samples.some(v=>Math.hypot(x-v.x,z-v.z)<4.6)&&!used.some(v=>Math.hypot(x-v[0],z-v[1])<4.5)&&!homes.some(e=>{const a=e.rotation?.[1]||0,dx=x-e.position[0],dz=z-e.position[2],lx=Math.abs(dx*Math.cos(a)-dz*Math.sin(a)),lz=Math.abs(dx*Math.sin(a)+dz*Math.cos(a)),hw=e.model==='weaponShop'?6:e.model==='highSchool'?3:(e.params?.width||7)/2,hd=e.model==='weaponShop'?4:e.model==='highSchool'?2:(e.params?.depth||7)/2;return lx<hw+2.1&&lz<hd+2.1;});
 const trees=FPSLayout.elements.filter(e=>e.model==='plantedTree');for(const tree of trees){const candidate=candidates.find(v=>valid(v));if(!candidate){tree.omit=true;continue;}used.push(candidate);const [x,z]=candidate;tree.position=[x,Math.max(0,backdropHeight(x,z)),z];tree.groundSnap=z>47;}
 FPSLayout.elements=FPSLayout.elements.filter(e=>!e.omit);
};
