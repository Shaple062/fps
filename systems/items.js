window.FPSItemSystem=class{
  constructor(api){this.api=api;this.items=[];this.remaining=0;this.speedMultiplier=1;}
  add(root,data){this.items.push({root,data});}
  reset(){this.items.forEach(i=>(i.root.visible=true,i.respawn=0));this.remaining=0;this.speedMultiplier=1;}
  nearest(){const p=this.api.player.pos;return this.items.filter(i=>i.root.visible&&Math.abs(i.root.position.y-p.y)<1.6&&Math.hypot(i.root.position.x-p.x,i.root.position.z-p.z)<1.3).sort((a,b)=>a.root.position.distanceToSquared(p)-b.root.position.distanceToSquared(p))[0];}
  use(){const item=this.nearest();if(!item)return;const p=this.api.player,d=item.data;
    if(d.kind==='heal'){if(p.hp>=100){this.api.notice('生命已滿');return;}p.hp=Math.min(100,p.hp+d.amount);this.api.notice('治療 +'+d.amount+' HP');}
    else if(d.kind==='speed'){this.speedMultiplier=d.multiplier;this.remaining=d.duration;this.api.notice('加速 '+d.duration+' 秒');}
    else return;
    item.root.visible=false;item.respawn=item.data.respawn||30;this.api.sound('pickup');this.api.hud();
  }
  update(dt){for(const i of this.items)if(!i.root.visible){i.respawn-=dt;if(i.respawn<=0)i.root.visible=true;}this.remaining=Math.max(0,this.remaining-dt);if(!this.remaining)this.speedMultiplier=1;const item=this.nearest();this.api.status.textContent=(item?'E 飲用'+(item.data.kind==='heal'?'治療藥水':'加速藥水')+'　':'')+(this.remaining?'加速剩餘 '+Math.ceil(this.remaining)+' 秒':'');}
};

