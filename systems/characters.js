window.FPSCharacters=[
 {name:'朱冠醫師',portrait:1,female:true,color:0xf4e7db,trim:0xd9564f,hair:0x644b41,crown:true,braids:true},
 {name:'翠羽守護',portrait:2,female:true,color:0xc7e4cc,trim:0x3f9d82,hair:0x292a32,crown:true,braids:true},
 {name:'赤焰戰士',portrait:3,color:0x282d34,trim:0xcb493d,hair:0x25272a,bun:true},
 {name:'青嵐衛士',portrait:4,color:0xf1eee1,trim:0x4e8394,hair:0x403931,spikes:true},
 {name:'藍鈴使者',portrait:5,female:true,color:0x356b96,trim:0xe17562,hair:0x322c32,hat:true,braids:true},
 {name:'山野遊俠',portrait:6,color:0xe37340,trim:0x35546e,hair:0x302b28}
];
window.FPSCharacterSystem=class{
 constructor(){this.selected=0;this.panel=document.createElement('div');this.panel.style.cssText='display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-height:42vh;overflow:auto;margin:15px 0';document.querySelector('.control-help').before(this.panel);for(const [i,c]of FPSCharacters.entries()){const b=document.createElement('button');b.style.cssText='padding:8px;background:#1a3033;color:white;border:2px solid transparent;border-radius:6px';b.innerHTML='<img alt="" src="portraits/'+c.portrait+'.webp" style="width:100%;height:85px;object-fit:cover;object-position:top;border-radius:4px"><b style="display:block">'+c.name+'</b><small>連發步槍 · 僅外觀不同</small>';b.onclick=()=>{this.selected=i;this.refresh();};this.panel.appendChild(b);}this.refresh();}
 get character(){return FPSCharacters[this.selected];}
 refresh(){[...this.panel.children].forEach((b,i)=>b.style.borderColor=i===this.selected?'#c1ed87':'transparent');}
 reset(){this.panel.style.display='none';}
 choose(){this.panel.style.display='grid';}
};

