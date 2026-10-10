window.FPSEnemySystem = class {
  constructor(T, api) {this.T=T; this.api=api; this.units=[]; this.time=0;}
  add(model, entry) {
    this.units.push({model, entry, hp:entry.behavior?.health || 100, shot:1+this.units.length*.6, recoil:0, grounded:false, vy:0, route:this.units.length%4, failed:false, dead:false});
  }
  blast(point,radius){for(const u of this.units){if(u.dead||u.failed)continue;const d=u.model.root.position.clone().sub(point),distance=d.length();if(distance>=radius)continue;d.y=0;if(d.lengthSq()<.01)d.set(1,0,0);this.hit(u.model.root,9000);u.launch=d.normalize().multiplyScalar(10+12*(1-distance/radius));u.launch.y=17;}}
  reset() {this.time=0; for(const [i,u] of this.units.entries()) {u.launch=null;u.hp=u.entry.behavior?.health||100;u.dead=false;u.deathAge=0;u.fall=0;u.failed=false;u.vy=0;u.recoil=0;u.shot=1.5+i*.25;u.model.root.visible=true;u.model.root.rotation.set(0,0,0);u.model.root.position.fromArray(u.entry.position);u.model.animate?.(0,false,0);}}
  hit(root, amount) {
    const u=this.units.find(u=>u.model.root===root && !u.dead); if(!u)return false;
    u.hp-=amount;u.recoil=1;
    // Fire the defeat event at zero HP, before the fall animation or cleanup.
    if(u.hp<=0){u.dead=true;u.fall=0;u.deathAge=0;u.deathY=u.model.root.position.y;this.api.kill(u.model.root.position.clone());} return true;
  }
  update(dt) {
    this.time+=dt;
    for(const u of this.units) {
      if(u.failed)continue;
      try {
        const root=u.model.root;
        if(u.dead){
          u.deathAge+=dt;u.fall=Math.min(1,(u.fall||0)+dt*3);root.rotation.z=-u.fall*Math.PI/2;if(u.launch){u.launch.y-=18*dt;const landing=this.api.move(root.position,u.launch.clone().multiplyScalar(dt),.4,1.95,0);u.launch.x*=Math.exp(-dt);u.launch.z*=Math.exp(-dt);if(landing.grounded){u.launch=null;u.deathY=root.position.y;}}else root.position.y=u.deathY-u.fall*.08;
          root.visible=u.deathAge<(u.entry.behavior?.corpseTime??4);
          if(u.deathAge>=(u.entry.behavior?.respawnTime??60)){
            const spawn=new this.T.Vector3().fromArray(u.entry.position),player=this.api.player();
            // Delay spawning directly on top of the player.
            if(Math.hypot(spawn.x-player.x,spawn.z-player.z)>2.5){u.launch=null;u.hp=u.entry.behavior?.health||100;u.dead=false;u.deathAge=0;u.fall=0;u.vy=0;u.grounded=false;u.recoil=0;u.shot=1.5;root.visible=true;root.position.copy(spawn);root.rotation.set(0,0,0);u.model.animate?.(this.time,false,0);this.api.respawn?.();}
          }
          continue;
        }
        const p=root.position, player=this.api.player(), cfg=u.entry.behavior||{};
        const eye=p.clone().add(new this.T.Vector3(0,1.4,0)), to=player.clone().sub(eye), distance=to.length();
        const visible=!this.api.safe?.()&&distance<30 && this.api.clear(eye,player);
        let goal;
        if(visible)goal=player;
        else {goal=new this.T.Vector3().fromArray(this.api.patrol[u.route]);if(Math.hypot(goal.x-p.x,goal.z-p.z)<1)u.route=(u.route+1)%this.api.patrol.length;}
        const delta=goal.clone().sub(p);delta.y=0;
        const moving=(!visible||distance>(cfg.range||16)*.65)&&delta.length()>1;
        if(delta.lengthSq()>0)root.rotation.y=Math.atan2(delta.x,delta.z);
        u.vy-=18*dt;
        const motion=moving?delta.normalize().multiplyScalar((cfg.speed||2)*dt):new this.T.Vector3();motion.y=u.vy*dt;
        const result=this.api.move(p,motion,.4,1.95);
        if(result.grounded){u.vy=0;u.grounded=true;}
        if(moving && Math.hypot(result.dx,result.dz)<dt*.15)u.route=(u.route+1)%this.api.patrol.length;
        u.shot-=dt;u.recoil=Math.max(0,u.recoil-dt*6);
        if(visible&&distance<(cfg.range||16)&&u.shot<=0&&this.api.active()){
          u.shot=(cfg.cooldown||1.6)+Math.random()*.4;u.recoil=1;
          root.updateMatrixWorld(true);let start=u.model.muzzle.getWorldPosition(new this.T.Vector3());
          const chest=p.clone().add(new this.T.Vector3(0,.94,0));
          // At point-blank range the long muzzle can extend through/past the player.
          // Use the chest origin then, rather than shooting from behind the target.
          const barrel=start.clone().sub(chest),target=player.clone().sub(chest);
          if(distance<1.5||barrel.dot(target)>=target.lengthSq())start=chest;
          // Aim at the torso; accurate near shots and tighter distant scatter.
          const spread=distance<6?0:Math.min(.24,(distance-6)*.018);
          const end=player.clone().add(new this.T.Vector3((Math.random()-.5)*spread,(Math.random()-.5)*spread*.5,(Math.random()-.5)*spread));
          this.api.fire(start,end,cfg.damage||3);
        }
        u.model.animate?.(this.time,moving,u.recoil);
      } catch(e) {u.failed=true;u.model.root.visible=false;this.api.error('敵人 '+u.entry.id,e);}
    }
  }
};




