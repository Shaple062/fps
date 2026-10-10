window.FPSModels.crate = (T, p = {}) => {
  const root = new T.Group(), size = p.size || 1.7;
  const box = new T.Mesh(new T.BoxGeometry(size, size, size), new T.MeshStandardMaterial({color: 0x555b4a, roughness: .75}));
  box.position.y = size / 2; box.castShadow = box.receiveShadow = true; root.add(box);
  const edges = new T.LineSegments(new T.EdgesGeometry(box.geometry), new T.LineBasicMaterial({color: 0xb4bd82})); edges.position.copy(box.position); root.add(edges);
  for (const y of [.22, size - .22]) {
    const band = new T.Mesh(new T.BoxGeometry(size + .025, .1, size + .025), new T.MeshStandardMaterial({color: 0x252f2e})); band.position.y = y; root.add(band);
  }
  return {root, collider:{size:[size,size,size],offset:[0,size/2,0]}};
};
