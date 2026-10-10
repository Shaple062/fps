window.FPSModels.coastalOcean=(T)=>{
  const root=new T.Group(),uniforms={time:{value:0},sun:{value:new T.Vector3(-.45,.78,.35).normalize()}};
  const geometry=new T.PlaneGeometry(1400,1700,90,110);geometry.rotateX(-Math.PI/2);
  const material=new T.ShaderMaterial({uniforms,side:T.DoubleSide,
    vertexShader:`uniform float time;varying vec3 world;void main(){vec3 p=position;p.y+=sin(p.x*.2+p.z*.23+time*.7)*.045+sin(p.x*.47-p.z*.16+time*1.1)*.025;world=(modelMatrix*vec4(p,1.)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(world,1.);}`,
    fragmentShader:`uniform float time;uniform vec3 sun;varying vec3 world;
    void main(){float a=world.x*.2+world.z*.23+time*.7,b=world.x*.47-world.z*.16+time*1.1;vec3 normal=normalize(vec3(-cos(a)*.009-cos(b)*.012,1.,-cos(a)*.011+cos(b)*.004));
      float ripple=sin(world.x*3.7+world.z*2.1+time*2.)*sin(world.x*1.3-world.z*3.2-time);normal.xz+=ripple*.045;
      vec3 view=normalize(cameraPosition-world);float fresnel=pow(1.-max(dot(view,normal),0.),4.);float glint=pow(max(dot(reflect(-sun,normal),view),0.),190.);
      float waves=.5+.5*sin(world.z*1.9+sin(world.x*.8)*.8+time*1.2);float distanceToShore=max(0.,-world.z-20.);float foam=pow(waves,18.)*(1.-smoothstep(0.,15.,distanceToShore));
      vec3 color=mix(vec3(.025,.29,.35),vec3(.075,.46,.61),smoothstep(0.,35.,distanceToShore));color=mix(color,vec3(.47,.72,.83),fresnel*.68);color+=vec3(1.,.91,.69)*glint*2.;color=mix(color,vec3(.82,.93,.9),foam*.6);
      float haze=1.-exp(-length(cameraPosition-world)*.0012);color=mix(color,vec3(.47,.72,.83),haze*.6);gl_FragColor=vec4(color,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`});
  const sea=new T.Mesh(geometry,material);sea.position.set(0,-.32,-870);root.add(sea);
  return {root,update(time){uniforms.time.value=time;}};
};


