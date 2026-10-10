window.FPSWeaponSystem=class{
  constructor(T,api){this.T=T;this.api=api;this.coins=100;this.current='rifle';this.opened=false;this.projectiles=[];
    this.catalog={rifle:{name:'步槍',key:'2',price:0,owned:true,capacity:24,ammo:24,damage:34,interval:.14,reload:1.6},pistol:{name:'手槍',key:'3',price:0,owned:false,capacity:12,ammo:12,damage:45,interval:.32,reload:1.1},grenade:{name:'手榴彈',key:'4',price:0,owned:false,capacity:1,ammo:0,damage:9000,interval:.8,reload:0}};
    this.status=document.createElement('div');this.status.style.cssText='position:fixed;right:36px;top:174px;color:#d8f6a1;pointer-events:none';document.body.appendChild(this.status);
    this.panel=document.createElement('div');this.panel.style.cssText='display:none;position:fixed;inset:0;z-index:12;background:#071114dc;align-items:center;justify-content:center';this.panel.innerHTML='<div style="width:380px;padding:28px;background:#152626;border:1px solid #8cae83;border-radius:8px"><h2>工作坊 · 免費裝備</h2><p>全部武器免費領取 · M 關閉</p><div class="goods"></div><button class="primary" style="margin-top:20px">返回遊戲</button></div>';document.body.appendChild(this.panel);this.panel.querySelector('.primary').onclick=()=>this.close();this.refresh();
  }
  get spec(){return this.catalog[this.current];}
  refresh(){this.status.textContent=this.spec.name+' · M 商城 · 2/3/4 切換';const goods=this.panel.querySelector('.goods');goods.replaceChildren();for(const [id,w]of Object.entries(this.catalog)){const button=document.createElement('button');button.style.cssText='display:block;width:100%;padding:12px;margin:8px 0;background:#b9dc96;color:#102014';button.textContent=w.name+' ['+w.key+']　'+(id==='grenade'?'免費領取一枚 · 持有 '+w.ammo:(w.owned?'已擁有':'免費領取'));button.onclick=()=>{if(id==='rifle'||(w.owned&&id!=='grenade'))return;if(this.coins<w.price){this.api.notice('金幣不足');return;}this.coins-=w.price;w.owned=true;if(id==='grenade')w.ammo++;this.api.bought(id,w.ammo);this.refresh();};goods.appendChild(button);}}
  earn(amount){this.coins+=amount;this.refresh();}
  open(){this.opened=true;this.panel.style.display='flex';this.api.pause();this.refresh();}
  close(){this.opened=false;this.panel.style.display='none';this.api.resume();}
  select(id,ammo){const next=this.catalog[id];if(!next?.owned){this.api.notice('先按 M 購買此裝備');return null;}this.spec.ammo=ammo;this.current=id;this.refresh();return next;}
  throw(start,direction){const T=this.T,object=new T.Mesh(new T.SphereGeometry(.11,10,8),new T.MeshStandardMaterial({color:0x60763d,metalness:.3}));object.position.copy(start);this.api.scene.add(object);this.projectiles.push({object,velocity:direction.clone().multiplyScalar(12).add(new T.Vector3(0,3,0)),life:1.6});}
  update(dt){for(let i=this.projectiles.length-1;i>=0;i--){const p=this.projectiles[i];p.life-=dt;p.velocity.y-=12*dt;const next=p.object.position.clone().addScaledVector(p.velocity,dt);if(!this.api.clear(p.object.position,next))p.velocity.multiplyScalar(-.35);else p.object.position.copy(next);if(p.object.position.y<.12){p.object.position.y=.12;p.velocity.y=Math.abs(p.velocity.y)*.3;p.velocity.x*=.7;p.velocity.z*=.7;}if(p.life<=0){this.api.explode(p.object.position.clone());this.api.scene.remove(p.object);p.object.geometry.dispose();p.object.material.dispose();this.projectiles.splice(i,1);}}}
  reset(){for(const p of this.projectiles){this.api.scene.remove(p.object);p.object.geometry.dispose();p.object.material.dispose();}this.projectiles.length=0;for(const [id,w]of Object.entries(this.catalog))if(id!=='grenade')w.ammo=w.capacity;this.current='rifle';this.refresh();}
};







