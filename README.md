# 鎌倉高校前 FPS · V3
解壓完整資料夾，雙擊 index.html；Three.js r160，離線 script，無需伺服器。

操作：WASD移動，滑鼠瞄準，左鍵連發／投擲，右鍵瞄準，Space跳躍，Shift奔跑，R換彈，V視角，E藥水／採草，H餵食，1摸動物，Q房門，F上下電車，X車內坐下／站起，G上下動物坐騎，M武器店商城，2/3/4步槍／手槍／手榴彈，B調試飛行（Space上／Ctrl下，不能穿牆），Esc暫停。

六角色只影響外觀，全部開局連發步槍，沒有技能／被動／姿態加成。第三人稱槍掛在右手位置，雙臂前伸。左側工作坊進門後按M，所有武器免費領取，手榴彈每次領一枚。

紅瓶回25血（最多100），藍瓶加速1.5倍15秒；桌上藥水30秒重生。敵人命中3點；正常高處落地扣血。狗、貓、狼不受武器傷害，可摸、可騎；G騎乘後WASD操作、Space跳躍、Shift衝刺，不能穿牆。電車自動沿環線行駛，窗洞與透明玻璃分離。

## 接續開發
- index.html：输入、移动碰撞、相机、射击、光照音效、通用互动／乘车和骑乘。move(pos,delta,radius,height,stepHeight=.24)；动物stepHeight=0，碰撞半径1.45覆盖整个身体。
- scene-layout-station.js：当前场景、模块路径、位置／旋转／缩放／碰撞。scene-layout.js保留旧场景。
- models/*.js：FPSModels[name](THREE,params)返回root、colliders（本地size/offset）、可选update(time,dt,camera,active)与configure(api)。dynamic:true刷新可变碰撞。模型失败独立报错。
- models/player.js：共享Q版人物外观／持枪姿势；systems/characters.js：六外观参数与选角；portraits/用户参考图。无需读取其他场景模型即可换人物。
- rail-loop.js共享轨道路径，enoden-train.js用前后轮组定位；两处路径参数一致。
- animal-park.js：程序猫狗狼、游走、碰撞、摸摸、骑乘，骑乘时停止自主移动。
- weapon-shop.js：店铺建筑；systems/weapons.js：商城、金币、武器、手榴弹；systems/items.js：药效重生；systems/enemies.js：敌人。

新增治疗瓶只改场景：
```js
{id:'heal-new',model:'potion',position:[16,.96,17],params:{kind:'heal',amount:25}}
```
新道具模型加入modelScripts并返回pickup:{kind:'heal',amount:25}或{kind:'speed',multiplier:1.5,duration:15}，不改主循环。

用户自行双击测试，不代跑游戏；修改原文件并覆盖V3。尚未实现多人模式。

電車乘客位置使用車廂本地座標 passenger，WASD 位移轉為本地軸向並限制在中央走道；每幀再轉回世界座標，所以轉彎時也隨車移動。X吸附到鄰近座椅並停用走動，再按X返回走道；座位和走道限制在enoden-train.js，主循環只呼叫walk。


本輪：移除軌道矮柱；enemy.js獨立機器人模型，紅色眼罩／胸燈／頭頂紅色標記，與居民區分。animal-park.js改圓潤身體與臉，自主速度1.6，騎乘速度倍率1.45，坐騎有獨立vy／grounded並支援jump；等待時仍計算重力，避免半空停住。三處青草E採集、20秒重生；H餵食消耗一份草並顯示愛心文字／點頭。开场controls同步列出所有操作。


電線只由場景 powerLinks 指定兩個實際桿位；轉成起點本地座標傳入 coastalStreet.params.connections，三條線落在兩端絕緣子上。末端桿不自行生成 span 延長線。

騎乘動物／乘坐電車免落地傷害；徒步高處落地規則保留。敵人倒下4秒隱藏，擊倒後60秒在原座標滿血重生；玩家距重生點2.5公尺內會延後。behavior.corpseTime／respawnTime可調，HUD為累計擊倒與存活數，不再全部擊倒即結束。

場景擴充：coastal-terrain.js延續道路外的背景起伏（後方Z+升高，可步行及騎乘）；japanese-cottage.js／japanese-townhouse.js各自擴充原可進入的房屋工廠，近景有碰撞，遠景房屋無碰撞。planted-tree.js支援櫻花／松／闊葉，含土床和小圍欄；seagull-flock.js群飛動畫；high-school.js高校外觀。位置與backdropHeight高度全部在場景配置。出生朝海側，玩家死亡後3秒自動重生，保留裝備與場景進度。


居住區按主街、三條橫向支路和四條巷弄配置；neighborhood-streets.js只負責路面。內側巷道在後排住宅前收尾；樹木避開住宅矩形，保持種植床與房屋間距。residents.js提供8位無傷害／無戰鬥居民，住宅含8間近景可進入屋及8間山坡遠景屋。玩家自動重生不呼叫restart，不清掉世界；revivePlayer只重置玩家生命／位置／視角及乘坐狀態。


本輪修正：地形heightAt使用與顯示網格一致的三角形插值，主程式統一讀取地面高度；後方護欄留6公尺入口，可去山坡住宅。groundSnap把山坡屋／樹對齊實際網格高度，遠景屋樹現在有碰撞。移開軌道旁松樹，寵物縮減三隻。
遊戲定位：海岸探索、騎乘動物、搭電車、對抗紅色機器人。建議後續新增短巡遊任務、收集紀念章與可見外觀獎勵；此輪先修地形和辨識，尚未加入任務／獎勵系統。


釣魚：models/fishing-pier.js木平台與3凳、fishing-rod.js程序魚竿；systems/fishing.js獨立蓄力／拋鉤／咬鉤／收魚／圖鑑；fish-catalog.js權重、名稱與參考圖裁切座標。T坐下站起，海邊1切換魚竿，右鍵按住蓄力放開拋鉤，咬鉤彩條指標在中央時左鍵收魚，I圖鑑。1在其他地區仍摸動物。需坐著釣，V仍可換視角；離座取消本次垂釣。
安全區世界X4～20、Z-42～-12：機器人不追擊／開火，玩家不受傷。護欄在X7～17留入口；平台連岸，海邊淺水地面-1.2，可下水，不含游泳／深海探索。
成功收鉤必有魚，四類總概率：3傳說合計20%、5普通30%、8稀有30%、2常見20%；類內均分。中間兩類合計60%。未咬鉤或錯過判定可空手。圖鑑由progress.js保存；魚圖使用透明PNG的CSS裁切，新增只改catalog。fish-art/需隨包保留。
釣獲展示：凳子在碼頭海側邊緣；收魚成功以對應參考圖裁切呈現躍起動畫與魚獲卡片，重新拋鉤清除。此邏輯只在 fishing.js，主循環無需新增。
設定：systems/settings.js 獨立面板，右上角或 ESC 開啟。音量、靈敏度、畫質（像素比例1/1.5/2，流暢關閉陰影）、按鍵提示存 localStorage；主程式只接音量／輸入／渲染與暫停事件。入口操作指南折疊，角色選單保持可見。

存檔：systems/progress.js 每10秒／離頁自動存 localStorage；設定面板可手動存、匯出JSON、匯入JSON。保存角色、武器與彈藥、魚獲、擊倒數、金幣、青草、視角；設定另存。重新開啟回海岸滿血，居民位置、敵人復活倒數、坐騎／車座狀態不存。file://儲存依瀏覽器與檔案位置，搬移或換瀏覽器請用JSON備份。
爆炸：systems/blast.js 半徑25m視覺；enemies.blast傷害9000（原90的100倍），只殺機器人，居民與動物僅擊飛、不死亡，玩家不受手榴彈傷害。各模型blast自行移動／落地，敵人保留60秒重生。residents.js自行散步及bulletBlock擋機器人射線。
列車內裝：enoden-train.js木地板、分格座椅／靠背、吊環／扶手、行李架、路線牌、照明帶。釣魚遮陽棚：fishing-pier.js海側開放，碰撞柱在邊緣，不擋拋鉤。

室內細節：models/room-details.js共用沙發、座椅、櫃門、書本、壁畫、植物、床品、床頭燈與扶手；coastalHouse初始化時附加，保持門口、藥水桌與樓梯通路。入口只新增載入路徑，主循環不增加。植栽由scene-layout-station.js prepare(THREE)依共用軌道路徑驗證種植框4.6m淨距與房屋範圍，沿近街與山坡道路配置；neighborhood-streets.js增加隨地形起伏的山坡連接道路。居民沿12/27/40街道固定往返，1.3m/s，短暫停留；player的civilian模式使用自然擺臂。
