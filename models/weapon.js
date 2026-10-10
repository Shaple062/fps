window.FPSModels.weapon = (T, p = {}) => {
  const root = new T.Group(), dark = new T.MeshStandardMaterial({color: 0x66777c, metalness: .2, roughness: .65}), accent = new T.MeshStandardMaterial({color: 0xb9e87f, emissive: 0x467821});
  const part = (size, pos, mat = dark) => { const m = new T.Mesh(new T.BoxGeometry(...size), mat); m.position.set(...pos); root.add(m); return m; };
  if(p.kind==='grenade'){const ball=new T.Mesh(new T.SphereGeometry(.12,12,10),new T.MeshStandardMaterial({color:0x718a49,roughness:.55}));root.add(ball);part([.045,.09,.045],[0,.14,0]);root.position.set(.31,-.27,-.55);return {root,muzzle:root};}
  if(p.kind==='pistol'){part([.12,.12,.32],[0,.04,-.1]);part([.1,.23,.12],[0,-.12,.02]);part([.025,.025,.035],[0,.12,-.2],accent);root.position.set(.31,-.27,-.55);const muzzle=new T.Object3D();muzzle.position.set(0,.04,-.27);root.add(muzzle);return {root,muzzle};}
  part([.16, .18, .52], [0, 0, -.12]); part([.08, .07, .36], [0, .025, -.52]);
  part([.13, .23, .14], [0, -.17, -.02]); part([.14, .15, .25], [0, -.02, .22]);
  const ring=new T.Mesh(new T.TorusGeometry(.055,.008,8,32),accent);ring.position.set(0,.14,-.18);root.add(ring);part([.025,.025,.04],[0,.075,-.18]); part([.05, .015, .12], [.083, .035, -.15], accent);
  root.position.set(.31, -.27, -.55);
  const muzzle=new T.Object3D();muzzle.position.set(0,.025,-.7);root.add(muzzle);
  return {root,muzzle};
};



