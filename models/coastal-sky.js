// Seamless procedural sky: directional noise has no rectangular cloud plane or UV edge.
window.FPSModels.coastalSky=(T)=>{
  const root=new T.Group(),uniforms={time:{value:0},sun:{value:new T.Vector3(-.45,.78,.35).normalize()}};
  const material=new T.ShaderMaterial({uniforms,side:T.BackSide,depthWrite:false,fog:false,toneMapped:false,
    vertexShader:'varying vec3 direction;void main(){direction=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:`varying vec3 direction;uniform float time;uniform vec3 sun;
    float hash(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
    float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
    float cloud(vec3 p){return noise(p)*.52+noise(p*2.02+12.7)*.28+noise(p*4.07+31.3)*.14+noise(p*8.13)*.06;}
    void main(){vec3 rd=normalize(direction);float elevation=max(rd.y,0.);vec3 sky=mix(vec3(.60,.80,.89),vec3(.035,.29,.68),pow(elevation,.45));sky+=vec3(1.,.83,.52)*pow(max(dot(rd,sun),0.),48.)*.35;
      vec3 p=rd*7.+vec3(time*.006,0.,time*.003);float mass=cloud(p),edge=smoothstep(.44,.61,mass),horizon=smoothstep(-.025,.12,rd.y);
      float light=clamp(.78+(mass-cloud(p+sun*.28))*3.,.25,1.);vec3 cumulus=mix(vec3(.43,.54,.64),vec3(1.,.98,.93),light);
      sky=mix(sky,cumulus,edge*horizon*.98);gl_FragColor=vec4(sky,1.);
      #include <colorspace_fragment>
    }`});
  const dome=new T.Mesh(new T.SphereGeometry(900,32,20),material);dome.frustumCulled=false;dome.renderOrder=-1000;root.add(dome);
  return {root,update(time,dt,camera){uniforms.time.value=time;if(camera){root.position.copy(camera.position);root.updateMatrixWorld(true);}}};
};
