window.FPSModels.ground = (T, p = {}) => {
  const root = new T.Group();
  const floor = new T.Mesh(new T.BoxGeometry(p.width || 48, .4, p.depth || 48), new T.MeshStandardMaterial({color: 0x172629, roughness: .88}));
  floor.position.y = -.2; floor.receiveShadow = true; root.add(floor);
  const grid = new T.GridHelper(48, 24, 0x41645b, 0x253e3c); grid.position.y = .012; root.add(grid);
  return {root};
};
