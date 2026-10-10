window.FPSModels.target = (T) => {
  const root = new T.Group();
  const disk = new T.Mesh(new T.CylinderGeometry(.5, .5, .12, 24), new T.MeshStandardMaterial({color: 0xf1b66c}));
  disk.rotation.x = Math.PI / 2; disk.position.y = 1.6; disk.castShadow = true; root.add(disk);
  const center = new T.Mesh(new T.CylinderGeometry(.17, .17, .14, 20), new T.MeshStandardMaterial({color: 0xa83e36})); center.rotation.x = Math.PI / 2; center.position.y = 1.6; root.add(center);
  const post = new T.Mesh(new T.BoxGeometry(.12, 1.3, .12), new T.MeshStandardMaterial({color: 0x657674})); post.position.y = .65; root.add(post);
  return {root};
};
