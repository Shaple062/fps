// Category probabilities sum to 100%; species are uniform within each category.
window.FPSFishGroups=[{tier:'傳說',chance:.20,names:['遠古巨鯊','深海冠鰭','幻光水母'],art:'sea'},{tier:'普通',chance:.30,names:['橘斑鯛','藍紋魚','金斑魚','紅波魚','綠葉魚'],art:'ordinary'},{tier:'稀有',chance:.30,names:['冰藍雀鯛','黑白燕魚','彩虹隆頭魚','烈橘虎魚','藍月刺尾魚','紅鰭仙魚','珊瑚小丑魚','紫尾錦魚'],art:'rare'},{tier:'常見',chance:.20,names:['海岸小丑魚','金尾小魚'],art:'sea'}];
window.FPSFishCatalog=FPSFishGroups.flatMap((g,group)=>g.names.map((name,i)=>({id:group+'-'+i,name,tier:g.tier,chance:g.chance/g.names.length,art:g.art,index:i,group})));
const fishRects={ordinary:[[.02,.08,.42,.25],[.53,.08,.41,.20],[.30,.31,.40,.31],[.02,.55,.40,.42],[.56,.60,.40,.34]],rare:[[.04,.15,.28,.14],[.35,.11,.28,.24],[.67,.14,.29,.18],[.03,.44,.30,.18],[.35,.43,.29,.17],[.68,.44,.29,.17],[.04,.70,.29,.18],[.34,.74,.31,.15]],seaLegend:[[.18,.36,.63,.27],[.66,.03,.31,.19],[.50,.65,.22,.30]],seaCommon:[[.68,.56,.29,.19],[.33,.025,.29,.305]]};
FPSFishCatalog.forEach(f=>f.rect=(f.group===0?fishRects.seaLegend:f.group===3?fishRects.seaCommon:fishRects[f.art])[f.index]);

