window.FPSLayout = {
  spawn: [0, 0, 17],
  patrol: [[-16, 0, -15], [16, 0, -15], [16, 0, 12], [-16, 0, 12]],
  elements: [
    {id:'floor', model:'ground', position:[0,0,0], collision:true, collider:{size:[48,.4,48],offset:[0,-.2,0]}},
    {id:'north',model:'wall',position:[0,0,-24],collision:true,params:{width:48,height:5,depth:1}},
    {id:'south',model:'wall',position:[0,0,24],collision:true,params:{width:48,height:5,depth:1}},
    {id:'west',model:'wall',position:[-24,0,0],collision:true,params:{width:1,height:5,depth:48}},
    {id:'east',model:'wall',position:[24,0,0],collision:true,params:{width:1,height:5,depth:48}},
    {id:'barrier-a',model:'wall',position:[-8,0,-2],collision:true,params:{width:6,height:2.5,depth:1}},
    {id:'barrier-b',model:'wall',position:[8,0,-8],collision:true,params:{width:6,height:2.5,depth:1}},
    {id:'crate-a',model:'crate',position:[-5,0,8],collision:true},
    {id:'crate-b',model:'crate',position:[5,0,5],rotation:[0,.25,0],scale:[1,1.5,1],collision:true},
    {id:'crate-c',model:'crate',position:[-13,0,-11],collision:true},
    {id:'crate-d',model:'crate',position:[13,0,12],collision:true},
    {id:'target-a',model:'target',position:[-18,0,-22],shootable:true},
    {id:'target-b',model:'target',position:[18,0,-22],shootable:true},
    ...[[-18,0,-17],[-10,0,-18],[-3,0,-18],[4,0,-19],[12,0,-18],[19,0,-16],[-19,0,-6],[-3,0,-7],[17,0,-3],[-17,0,4],[8,0,1],[19,0,7]]
      .map((position,i)=>({id:'enemy-'+(i+1),model:'enemy',position,collision:true,shootable:true,
        params:{color:[0xeab79c,0xb9d9c7,0xc5b8e1,0xe7c77d][i%4]},
        behavior:{health:75,speed:1.6+(i%3)*.2,range:13+(i%3),cooldown:2.5+(i%4)*.25,damage:3}}))
  ]
};
