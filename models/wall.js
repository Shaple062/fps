window.FPSModels.wall = (T, p = {}) => {
  const root = new T.Group(), w = p.width || 4, h = p.height || 3, d = p.depth || 1;
  const body = new T.Mesh(new T.BoxGeometry(w, h, d), new T.MeshStandardMaterial({color: p.color || 0x304344, roughness: .8}));
  body.position.y = h / 2; body.castShadow = body.receiveShadow = true; root.add(body);
  const trim = new T.Mesh(new T.BoxGeometry(w + .04, .09, d + .04), new T.MeshStandardMaterial({color: 0xa2df73, emissive: 0x5d9e38, emissiveIntensity: .65}));
  trim.position.y = h - .16; root.add(trim);
  return {root, collider:{size:[w,h,d],offset:[0,h/2,0]}};
};
