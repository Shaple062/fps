// Background terrain continues beyond the playable fences; no exposed rectangular edge.
window.FPSModels.coastalTerrain=(T)=>{
 const root=new T.Group(),geometry=new T.PlaneGeometry(1200,1000,240,240);geometry.rotateX(-Math.PI/2);geometry.translate(0,0,480);const a=geometry.attributes.position;
 for(let i=0;i<a.count;i++){const x=a.getX(i),z=a.getZ(i),outside=Math.max(0,z-47,Math.abs(x)-40);const rise=1-Math.exp(-outside*.065);a.setY(i,-.14+rise*(8+6*Math.sin(x*.045+z*.025)**2)+Math.max(0,z-75)*.025);}
 geometry.computeVertexNormals();const land=new T.Mesh(geometry,new T.MeshStandardMaterial({color:0x8b9970,roughness:1}));land.receiveShadow=true;root.add(land);const heightAt=(x,z)=>{if(z< -20)return -1.2;const u=T.MathUtils.clamp((x+600)/5,0,239.999),v=T.MathUtils.clamp((z+20)/(1000/240),0,239.999),col=Math.floor(u),row=Math.floor(v),fx=u-col,fz=v-row,index=row*241+col,y00=a.getY(index),y10=a.getY(index+1),y01=a.getY(index+241),y11=a.getY(index+242);return fx+fz<=1?y00+fx*(y10-y00)+fz*(y01-y00):y11+(1-fx)*(y01-y11)+(1-fz)*(y10-y11);};return {root,heightAt};
};


