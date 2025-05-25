
let 全局路径 = [];
let 全局色块 = [];
let 图片缓存 = {}

const cw = " ▲ "
const cs = " ▼ "
const ca = " ◂ "
const cd = " ▸ "
const z = "[ ]"
const k = "   "
const qi = " q "
const zo = " @ "
const x = " x "

const sh = [cw,cs,ca,cd]
const isceshixunlu = false; //启用自定义地图
const ceshixunlu = [
    [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,zo,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,z ,  ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,z ,  ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,z ,z ,  ,z ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,z ,  ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,z ,  ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  , z,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,z ,  ,  ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  , z,  ,  ,  ,  ,cw,  ,cw,  ,  ,  ,z ,  ,z ,z ,z ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  , z,  ,  ,  ,  ,z ,  ,z ,  ,  ,  ,z ,  ,  ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  , z,qi,  ,  ,  ,z ,  ,z ,  ,  ,  ,z ,  ,  ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  , z, z, z,z ,z ,z ,  ,z ,z ,z , z,z ,  ,z ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  , z,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,z ,  ,  ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  , z,  ,  ,  ,  ,  ,  ,cw,  ,  ,  ,z ,  ,  ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  , z,  ,  ,  ,  ,  ,  ,z ,z ,z ,  ,z ,  ,z ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,z ,  ,  ,  ,  ,  ],
    [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ]
]
const debug = false; //显示查找范围信息

let zhuan = []; //随机生成的砖
let changshicishu = 0;//尝试次数
let jieshu = false; //结束
let zhaodao = false; //找到
let zhuankuan = [] //砖块预设
let cizhen = [] //刺预设
let zod = {i:0,j:0} //终点
let cud = {i:0,j:0} //起点
let jisuanliang = 0//计算量
let 寻路限制 = 0
//地图
const di = new Proxy([], {
    get(target, prop, receiver) {
        const index = parseInt(prop, 10);
        if (!isNaN(index) && (index < 0 || index >= target.length)) {
            return new Proxy([], {
                get(target, prop, receiver) {
                    return z;
                }
            });
        }
        return Reflect.get(target, prop, receiver);
    }
});
//预设
{
    zhuankuan.push(
        [
            {w:2},
            {a:2},
            {s:2},
        ]
    )
    zhuankuan.push(
        [
            {d:1},
            {w:2}
        ]
    )
    zhuankuan.push(
        [
            {a:1},
            {w:2}
        ]
    )
    zhuankuan.push(
        [
            {a:1},
            {s:2}
        ]
    )
    zhuankuan.push(
        [
            {d:1},
            {s:2}
        ]
    )
    zhuankuan.push(
        [
            {d:2},
            {a:1},
            {s:2},
        ]
    )
    zhuankuan.push(
        [
            {d:1}
        ]
    )
    zhuankuan.push(
        [
            {s:1}
        ]
    )
    zhuankuan.push(
        [
            {s:4}
        ]
    )
    zhuankuan.push(
        [
            {a:1}
        ]
    )

    cizhen.push([
        [
            [,,,,],
            [,,cw,,],
            [,,cw,,],
            [,,,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,cw,,],
            [,,cs,,],
            [,,,,],
            [,,,,],
        ]
    ])
    cizhen.push([
        [
            [,,,,],
            [,,cd,,],
            [,,cd,,],
            [,,,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,cd,,],
            [,,k,,],
            [,,,,],
            [,,,,],
        ]
    ])
    cizhen.push([
        [
            [,,,,],
            [,,,,],
            [,cw,cw,cw,],
            [,,,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,,,],
            [,cw,k,cw,],
            [,,,,],
            [,,,,],
        ]
    ])

    cizhen.push([
        [
            [,,,,],
            [,,,,],
            [,,cw,cd,],
            [,,,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,,,],
            [,,cw,k,],
            [,,,,],
            [,,,,],
        ]
    ])

    cizhen.push([
        [
            [,,,,],
            [,,,,],
            [,,cw,,],
            [,cw,,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,,,],
            [,,,,],
            [,cw,,,],
            [,,,,],
        ]
    ])


    cizhen.push([
        [
            [,,,,],
            [,,cw,,],
            [,cd,,cd,],
            [,,cs,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,,,],
            [,,k,,],
            [,,,,],
            [,,,,],
        ]
    ])

    cizhen.push([
        [
            [,,z,,],
            [,,,,],
            [,,k,,],
            [,,cw,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,cs,,],
            [,,k,,],
            [,,,,],
            [,,,,],
        ]
    ])
    cizhen.push([
        [
            [,,,,],
            [,,,,],
            [,z,z,,],
            [,z,z,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,z,z,,],
            [,k,z,,],
            [,,,,],
            [,,,,],
        ]
    ])

    cizhen.push([
        [
            [,k,z,k,],
            [,k,k,k,],
            [,k,k,k,],
            [,k,k,k,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,,,],
            [,,cw,,],
            [,,cs,,],
            [,,,,],
        ]
    ])
    cizhen.push([
        [
            [, ,,,],
            [,,ca,,],
            [,,ca,,],
            [,,ca,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,k,,],
            [,,k,,],
            [,,k,,],
            [,,,,],
        ]
    ])
    cizhen.push([
        [
            [, ,,,],
            [,,cw,,],
            [,,cs,,],
            [,,cw,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,cw,,],
            [,,cs,,],
            [,,k,,],
            [,,,,],
        ]
    ])
    cizhen.push([
        [
            [, ,,,],
            [,,,,],
            [,z,cd,z,],
            [,,,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,,,],
            [,z,z,z,],
            [,,,,],
            [,,,,],
        ]
    ])
    cizhen.push([
        [
            [, ,,,],
            [,cw,cw,,],
            [,ca,z,,],
            [,,,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,k,,,],
            [,,,,],
            [,,,,],
            [,,,,],
        ]
    ])
    cizhen.push([
        [
            [, ,,,],
            [,,,,],
            [,,cw,cs,],
            [,,,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,,,],
            [,,,k,],
            [,,,,],
            [,,,,],
        ]
    ])
    cizhen.push([
        [
            [, ,,,],
            [,,cw,,],
            [,,cd,,],
            [,,cs,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,k,,],
            [,,,,],
            [,,k,,],
            [,,,,],
        ]
    ])
    cizhen.push([
        [
            [, ,,,],
            [,z,z,z,],
            [,z,z,z,],
            [,z,z,z,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,,,],
            [,,k,,],
            [,,,,],
            [,,,,],
        ]
    ])
    cizhen.push([
        [
            [, ,,,],
            [,z,z,z,],
            [,z,z,z,],
            [,,,,],
            [,,,,],
        ],
        [
            [,,,,],
            [,,k,,],
            [,,,,],
            [,,,,],
            [,,,,],
        ]
    ])
}
//随机生成地图
function shengchengditu(youjiema = false){
    //console.log("生成地图");
    zhaodao = false;
    jieshu = false;
    jisuanliang = 0;
    寻路限制 = 5000
    全局路径 = [];
    zhuan = [];
    zod = {i:0,j:0}
    cud = {i:0,j:0}

    {
        for(let i = 0; i < 19; i++){
            di[i] = new Proxy([], {
                get(target, prop, receiver) {
                    const index = parseInt(prop, 10);
                    if (!isNaN(index) && (index < 0 || index >= target.length)) {
                        return z;
                    }
                    return Reflect.get(target, prop, receiver);
                }
            });
            for(let j = 0; j < 25; j++){
                di[i][j] = k
                if (Math.random() > 0.965) {
                    di[i][j] = z
                    zhuan.push({i,j})
                }
            }
        }
    }
    {
        zhuan.forEach(ij => {
            let xuanzhong = zhuankuan[random(0,zhuankuan.length-1)]
            
            for (let i = 0; i < xuanzhong.length; i++) {
                const element = xuanzhong[i];
                if(element.w){
                    for (let jj = 0; jj < element.w; jj++) {
                        ij.i -= 1
                        di[ij.i][ij.j] = z
                    }
                }
                if(element.a){
                    for (let jj = 0; jj < element.a; jj++) {
                        ij.j += 1
                        di[ij.i][ij.j] = z
                    }
                }
                if(element.s){
                    for (let jj = 0; jj < element.s; jj++) {
                        ij.i += 1
                        di[ij.i][ij.j] = z
                    }
                }
                if(element.d){
                    for (let jj = 0; jj < element.d; jj++) {
                        ij.j -= 1
                        di[ij.i][ij.j] = z
                    }
                }
            }
        });
    }
    {
        for (let index = 0; index < random(3,9); index++) {
            i = random(0,18)
            j = random(0,24)
            if(di[i][j] == k && di[i+1][j] == k){
                di[i][j] = cw
                di[i+1][j] = cs
            }
        }
        for (let index = 0; index < random(2,5); index++) {
            i = random(3,15)
            j = random(3,21)
            if(di[i+1][j] == k){
                di[i+1][j] = cs
            }
            if(di[i-1][j] == k){
                di[i-1][j] = cw
            }
            if(di[i][j+1] == k){
                di[i][j+1] = ca
            }
            if(di[i][j-1] == k){
                di[i][j-1] = cd
            }
        }

        for (let i = 1; i < 18; i++) {
            for (let j = 1; j < 24; j++) {
                if(di[i][j] == k){
                    if(di[i][j+1] == z){
                        if(Math.random() > 0.1){
                            continue;
                        }
                        di[i][j] = cd
                    }
                    if(di[i][j-1] == z){
                        if(Math.random() > 0.1){
                            continue;
                        }
                        di[i][j] = ca
                    }
                    if(di[i+1][j] == z){
                        if(Math.random() > 0.4){
                            continue;
                        }
                        di[i][j] = cw
                    }
                    if(di[i-1][j] == z){
                        if(Math.random() > 0.4){
                            continue;
                        }
                        di[i][j] = cs
                    }
                }
                
            }
        }
        for(let i = 0; i < 19; i++){
            for(let j = 0; j < 25; j++){
                if(di[i][j] == cw){
                    if(di[i-1][j] != z){
                        if(random(0,10) > 8){
                            di[i-1][j] = k
                        }
                    }
                }
                if(di[i][j] == cs){
                    if(di[i+1][j] != z){
                        if(random(0,10) > 8){
                            di[i+1][j] = k
                        }
                    }
                }
                if(di[i][j] == ca){
                    if(di[i][j+1] != z){
                        if(random(0,10) > 8){
                            di[i][j+1] = k
                        }
                    }
                }
                if(di[i][j] == cd){
                    if(di[i][j-1] != z){
                        if(random(0,10) > 8){
                            di[i][j-1] = k
                        }
                    }
                }
            }
        }

        for (let i = 0; i < 19; i++) {
            for (let j = 0; j < 25; j++) {
                cizhen.forEach(aa => {
                    let xiugai = true
                    let aaa = aa[0]
                    for (let ii = -2; ii <= 2; ii++) {
                        for (let jj = -2; jj <= 2; jj++) {
                            if(aaa[2+ii][2+jj]!=undefined){
                                if(aaa[2+ii][2+jj]!=di[i+ii][j+jj]){
                                    xiugai = false
                                }
                            }
                        }
                    }
                    let aaaa = aa[1]
                    if(xiugai){
                        for (let ii = -2; ii <= 2; ii++) {
                            for (let jj = -2; jj <= 2; jj++) {
                                if(aaaa[2+ii][2+jj]!=undefined){
                                    di[i+ii][j+jj] = aaaa[2+ii][2+jj]
                                }
                            }
                        }
                    }
    
                })


            }
        }


    }
    {
        wanjiaweizhi = []
        for (let i = 0; i < 19; i++) {
            for (let j = 0; j < 25; j++) {
                if(di[i][j] == k && di[i+1][j] == z && i != 18){
                    wanjiaweizhi.push({i,j})
                }
            }
        }
        
        let wanjia = wanjiaweizhi[random(0,wanjiaweizhi.length-1)]

        cud.i = wanjia.i
        cud.j = wanjia.j

        let maxjuli = 8
        zod = {i:cud.i,j:cud.j}
        wanjiaweizhi.forEach(ij => {
            if(( juli(ij.i,ij.j,cud.i,cud.j) > maxjuli)){
                maxjuli = juli(ij.i,ij.j,cud.i,cud.j)
                zod = {i:ij.i,j:ij.j}
            }
        })
        //console.log("zod被更新为"+zod.i+" "+zod.j);
        
    }
    if(isceshixunlu == true){
        for (let i = 0; i < 19; i++) {
            for (let j = 0; j < 25; j++) {
                let ccc = ceshixunlu[i][24-j];
                if(ccc != undefined){       
                    if(ccc == qi){
                        cud = {i,j}
                    }else if(ccc == zo){
                        zod = {i,j}
                    }else{
                        di[i][j] = ccc
                    }
                }else{
                    di[i][j] = k
                }
            }
        }
    }
    youjie(youjiema)
    

}
//保证有解
function youjie(youjiema){
    {
        //寻路辅助单位
        let zhuangtanjingguo = {}
        全局色块 = []
        全局路径 = []
        let 更新返回路径 = null
        const p = {
            j:0,
            i:0,
            js:1, // -1 / 1
            is:0,   // 
            s:" & ",
            g:1,
            shangci : {i :-1,j:-1},
            guaiwandengdai : 0,
            huaxingjuli : 0,
            update:function(shuzu,ij,lose){
                let i = ij.i
                let j = ij.j
                jisuanliang++
                const key = this.i+":"+this.j+":"+this.is+":"+this.js+":"
                    +this.guaiwandengdai+":"
                    +this.zuo +":"
                    +this.mubiao+":"
                    +this.yiduan+":"
                    +this.cishu+":"
                    +this.cishu
                if(zhuangtanjingguo[key] == true){

                    //已经发生过了
                    return false
                }
                zhuangtanjingguo[key] = true;
                //移动逻辑  跳跃之后 用while循环调用  直到返回 false时  为结束一次跳跃
                if(this.i == this.shangci.i && this.j == this.shangci.j){
                    this.cishu ++;
                    if(this.cishu>6){
                        //console.log("卡死");
                        return false
                    }else{
                        if(this.guaiwandengdai <2){
                            //拐弯等待帧数
                            this.guaiwandengdai++
                        }else{
                            this.js*= -1
                        }
        
                    }
                }
        
                if(zod.i == this.i && zod.j == this.j){
                    console.log("找到终点" + this.i + " " + this.j);
                    jieshu = true;
                    zhaodao = true;
                    return false
                }
        
                this.shangci = {i:this.i,j:this.j}
        
                let isbuyidong = false
                //先竖直移动
                let ifangxiangsudu = Math.abs(this.is);
                let 延缓记录 = false
                if(this.yiduan == false){
                    ifangxiangsudu = 1;
                    this.yiduan = true;
                }
                for (let kk = 0; kk < ifangxiangsudu; kk++) {
                    if(this.is > 0){
                        //上是 i-
                        let ycw = di[this.i - 1][this.j];
                        if(ycw != z
                            && sh.indexOf(ycw) == -1
                        ){
                            this.i -= 1
                        }else{
                            if(ycw == z){
                                if(di[this.i - 1][this.j+this.js] != z && sh.indexOf(di[this.i - 1][this.j+this.js]) == -1
                                && di[this.i][this.j+this.js] != z && sh.indexOf(di[this.i][this.j+this.js]) == -1){
                                    延缓记录 = true
                                    this.i -= 1
                                }else{
                                    this.is = 0
                                }
        
                                //顶头  速度归0
                            }else{
                                //是刺  终止
        
                                if(ycw == cs && this.js!=0 &&  // 顶上的刺是朝下的
                                    di[this.i - 1][this.j+this.js] != z && sh.indexOf(di[this.i - 1][this.j+this.js]) == -1 //目标位置可走
                                    && (di[this.i][this.j+this.js] == k ||di[this.i][this.j+this.js] == cw || di[this.i][this.j+this.js] == (this.js == 1?cd:ca) )){ //水平上刺有缝隙
                                        //交错和纵横 允许本次穿刺
                                    this.i -= 1
                                    延缓记录 = true
                                }else if( di[this.i - 1][this.j+this.js] != z && sh.indexOf(di[this.i - 1][this.j+this.js]) == -1
                                 && di[this.i][this.j+this.js] != z && sh.indexOf(di[this.i][this.j+this.js]) == -1
                                ){
                                    //顶头了
                                    this.i -= 1
                                    延缓记录 = true
                                }else if(this.js!=0 && di[this.i - 1][this.j] == (this.js == 1?ca:cd)  && 
                                    di[this.i - 1][this.j+this.js] != z && sh.indexOf(di[this.i - 1][this.j+this.js]) == -1
                                    && (di[this.i][this.j+this.js] == cw)){
                                        //允许过纵横2
                                    this.i -= 1
                                    延缓记录 = true
                                }else{
                                    return false;
                                }
                            }
        
                        }
                    }else{
                        //下落
                        let ycw = di[this.i + 1][this.j];
                        if(ycw != z 
                            && sh.indexOf(ycw) == -1
                        ){
                            //不是砖也不是刺
                            this.i += 1
        
                        }else if(ycw == z){
                            //是砖
                            if(this.i != 18){
                                this.is = 0
                                if(this.js!=0 && di[this.i + 1][this.j + this.js] !=z){
                                    isbuyidong = true //停一帧  防止滑砖
                                }
        
                                break
                            }else{
                                //console.log("出地图");
                                return false;
                            }
                        }else{
                            if(sh.indexOf(ycw) != -1
                            ){
        
                                if(ycw == cw && this.js!=0 && 
                                    di[this.i + 1][this.j+this.js] != z && sh.indexOf(di[this.i + 1][this.j+this.js]) == -1
                                    && (di[this.i][this.j+this.js] == k ||di[this.i][this.j+this.js] == cs || di[this.i][this.j+this.js] == (this.js == 1?cd:ca) )){
                                        //允许过纵横
                                    this.i += 1
                                    延缓记录 = true
                                }
                                else if(this.js!=0 && di[this.i + 1][this.j] == (this.js == 1?ca:cd) && 
                                    di[this.i + 1][this.j+this.js] != z && sh.indexOf(di[this.i + 1][this.j+this.js]) == -1
                                    && (di[this.i][this.j+this.js] == cs)){
                                        //允许过纵横2
                                    this.i += 1
                                    延缓记录 = true
                                }else{
                                    this.huaxingjuli ++
                                    if(this.huaxingjuli >= 1){
                                        return false;
                                    }
                                    if(this.is < -1){
                                        this.is = -1
                                    }
                                }
                                //return false;
                            }
                        }
                    }


                    //-----------------------------------检查是否可跳跃
                    //if(di[p.i][p.j] == k){
                        全局色块.push({i:p.i,j:p.j,k:1}) 
                    //}
                    if(延缓记录 == false){
                        更新返回路径 = {i:p.i,j:p.j,shang:lose}
                        if((di[i+1][j] == z || di[p.i+1][p.j] == z ) && p.i!= 18){
                            //出发点是落脚点  或者当前位置是落脚点  则可以起跳
                            if(debug == true) di[p.i][p.j] = (di[p.i+1][p.j] == z)  ? ` * ` : ` , `
                            全局色块.push({i:p.i,j:p.j,k:di[p.i][p.j] = (di[p.i+1][p.j] == z)  ? 3 : 2}) 
                            shuzu.push({i:p.i,j:p.j,shang:lose})
                        }
                        lose = 更新返回路径
                    }

                    //-----------------------------------检查是否景过终点
                    if(zod.i == this.i && zod.j == this.j){
                        console.log("找到终点" + this.i + " " + this.j);
                        jieshu = true;
                        zhaodao = true;
                        return false
                    }
                }
                
                this.is -= this.g;
                
                this.j += this.js
                if(di[this.i][this.j] == z|| sh.indexOf(di[this.i][this.j]) != -1 || isbuyidong == true){
                    this.j -= this.js //水平移动撞 回弹
                }
                
                if(this.js == 0){
                    if(this.mubiao >= 0){
                        this.mubiao -= 1
                    }else{
                        if(this.zuo == true){
                            this.js = -1
                        }else{
                            this.js = 1
                        }
                    }
                }

                if(延缓记录 == true){
                        更新返回路径 = {i:p.i,j:p.j,shang:lose}
                        if((di[i+1][j] == z || di[p.i+1][p.j] == z ) && p.i!= 18){
                            //出发点是落脚点  或者当前位置是落脚点  则可以起跳
                            if(debug == true) di[p.i][p.j] = (di[p.i+1][p.j] == z)  ? ` * ` : ` , `
                            全局色块.push({i:p.i,j:p.j,k:di[p.i][p.j] = (di[p.i+1][p.j] == z)  ? 3 : 2}) 
                            shuzu.push({i:p.i,j:p.j,shang:lose})
                        }
                        lose = 更新返回路径
                    }

                return true
            },
            cishu : 0,
            yiduan : false,
            zuo : false,
            mubiao : false,
            //跳跃力度  是否是二段跳  是否是向左跳  延时几帧移动
            jump:function(lidu,er = false,zuo,mubiao = 1){
                //跳跃
                this.guaiwandengdai = 0 //拐弯前的等待帧数
                this.zuo = zuo
                this.mubiao = mubiao //延时移动
                this.yiduan = er
                this.cishu = 0
                this.huaxingjuli = 0 //允许在刺上滑行的帧数
                this.is = Math.min(lidu, 3);
            }
        }
        dancixunlu()
        function dancixunlu(){
            p.i = cud.i
            p.j = cud.j
            
            let jieguojihe = [{i:p.i,j:p.j}]

            let iiii = 0
            let yichaxun = {};
            
            while(jieshu == false && jisuanliang < 寻路限制){
                //yichaxun = {}
                jisuanliang++

                //排序
                jieguojihe.sort((a,b)=>{
                    return quanzhong(a.i,a.j,zod.i,zod.j) - quanzhong(b.i,b.j,zod.i,zod.j)
                })

                let ij = jieguojihe[0];
                if(ij.shang){
                    let key = ij.i +","+ ij.j +":"+ ij.shang.i +","+ ij.shang.j;
                    yichaxun[key] = true;
                }
                jieguojihe.splice(0, 1);
                let yunxingjump = jumpfun(ij,iiii)
                jieguojihe = [...jieguojihe , ...yunxingjump]
                jieguojihe = jieguojihe.filter(ij => {
                    
                    let key = ij.i +","+ ij.j +":"+ ij.shang.i +","+ ij.shang.j;
                    if (yichaxun[key] == undefined) {
                        return true;
                    }
                    return false;
                });

                if(jieshu == true){
                    //已经找到了掉了随时可以结束
                    let hui = yunxingjump["huisu"]
                    let huisushuzi = 0
                    //console.log("回溯开始");                        
                    while(hui != undefined && hui.shang != undefined){
                        全局路径.push(hui)
                        if(huisushuzi <= 9){
                            if(di[hui.i][hui.j] != z && sh.indexOf(di[hui.i][hui.j]) == -1)
                                di[hui.i][hui.j] = ` ${huisushuzi} `
                        }else if(huisushuzi <= 99){
                            if(di[hui.i][hui.j] != z && sh.indexOf(di[hui.i][hui.j]) == -1)
                                di[hui.i][hui.j] = ` ${huisushuzi}`
                        }else{
                            if(di[hui.i][hui.j] != z && sh.indexOf(di[hui.i][hui.j]) == -1)
                                di[hui.i][hui.j] = `${huisushuzi}`
                        }
                        //console.log(huisushuzi  + " : " + hui.i,",",hui.j," => ",hui.shang.i,",",hui.shang.j);

                        huisushuzi++
                        hui = hui.shang
                    }
                    return;
                }
                if(jieguojihe.length == 0){
                    console.log("数组怎么没元素了");
                    
                    jieshu = true
                }
            }
                
            /*
            while (jieshu == false && jisuanliang <寻路限制) {
                jisuanliang++
                iiii++
                let newjieguo = []

                jieguojihe.forEach(ij => {
                    if(jieshu == true) return;
                    yichaxun = {} //重置去重
                    let yunxingjump = jumpfun(ij,iiii)
                    newjieguo = [...newjieguo , ...yunxingjump]

                    if(jieshu == true){
                        //已经找到了掉了随时可以结束
                        let hui = yunxingjump["huisu"]
                        let huisushuzi = 0
                        console.log("回溯开始");                        
                        while(hui != undefined && hui.shang != undefined){
                            全局路径.push(hui)
                            if(huisushuzi <= 9){
                                if(di[hui.i][hui.j] != z && sh.indexOf(di[hui.i][hui.j]) == -1)
                                    di[hui.i][hui.j] = ` ${huisushuzi} `
                            }else if(huisushuzi <= 99){
                                if(di[hui.i][hui.j] != z && sh.indexOf(di[hui.i][hui.j]) == -1)
                                    di[hui.i][hui.j] = ` ${huisushuzi}`
                            }else{
                                if(di[hui.i][hui.j] != z && sh.indexOf(di[hui.i][hui.j]) == -1)
                                    di[hui.i][hui.j] = `${huisushuzi}`
                            }
                            //console.log(huisushuzi  + " : " + hui.i,",",hui.j," => ",hui.shang.i,",",hui.shang.j);

                            huisushuzi++
                            hui = hui.shang
                        }
                        return;
                    }
                    // 去重
                    newjieguo = newjieguo.filter(ij => {
                        const key = ij.i +","+ ij.j;
                        if (yichaxun[key] == undefined) {
                            yichaxun[key] = true;
                            return true;
                        }
                        return false;
                    });

                    //排序
                    newjieguo.sort((a,b)=>{
                        return juli(a.i,a.j,zod.i,zod.j) - juli(b.i,b.j,zod.i,zod.j)
                    })
                    //查找最近的点
                    //newjieguo = [newjieguo[0]]

                })
                if(newjieguo.length == 0){
                    jieshu = true
                    //console.log("查询数组归零 ", iiii);
                }else{
                    jieguojihe = newjieguo
                    //console.log("查询数组长度 ", newjieguo.length);
                }
            }
            */
            
        }
        
        function jumpfun(ij,iiii){
            let i = ij.i
            let j = ij.j
            let jieguo = [];
            let cundang = {i:i,j:j,is:p.js}
            //di[p.i][p.j] = ` ${iiii} `
            let er = false;//是否是二段跳
            let lidu = 2
            if(di[i+1][j] != z){
                er = false;
                lidu = 2;
            }
            //如果上面三个全是被堵死的  不用测大部分了
            if(true){
                
                for (let ii = 0; ii < 3; ii++) {
                    p.js = ii == 0?-1:1
                    if(ii == 2) p.js = 0
                    p.i = cundang.i
                    p.j = cundang.j
                    let lose = ij;
                    p.jump(1,er,ii == 0,ii == 2? 99:0)
                    更新返回路径 = ij
                    while (p.update(jieguo,ij,lose) == true) {
                        lose = 更新返回路径
                        let zhenjieguo = {i:p.i,j:p.j,shang:lose}; //记录当前节点
                        if(di[p.i][p.j] == z){
                            continue;
                        }
                        if(di[p.i][p.j] == k){
                            全局色块.push({i:p.i,j:p.j,k:1}) 
                            if(debug == true) di[p.i][p.j] = ` . `
                        }
                        if((di[i+1][j] == z || di[p.i+1][p.j] == z ) && p.i!= 18){
                            //出发点是落脚点  或者当前位置是落脚点  则可以起跳
                            if(debug == true) di[p.i][p.j] = (di[p.i+1][p.j] == z)  ? ` * ` : ` , `
                            全局色块.push({i:p.i,j:p.j,k:di[p.i][p.j] = (di[p.i+1][p.j] == z)  ? 3 : 2}) 
                            jieguo.push(zhenjieguo)
                            //如果满足条件  记录节点
                            if(di[i+1][j] == z ){
                                //如果有二段跳  则记录自己直接下沉的所有记录点  直到碰到刺
                                let pianyi = 1;
                                while(di[p.i+pianyi][p.j] != z && sh.indexOf(di[p.i+pianyi][p.j]) == -1&& p.i+pianyi!= 18){
                                    jieguo.push({i:p.i+pianyi,j:p.j,shang:zhenjieguo})
                                    pianyi++
                                }
                            }
                        }else{
                                //如果没有  则全遍历一遍  看看有无终点
                                let pianyi = 1;
                                let ij = {i:p.i+pianyi,j:p.j,shang:zhenjieguo}
                                while(di[p.i+pianyi][p.j] != z && sh.indexOf(di[p.i+pianyi][p.j]) == -1){
                                    全局色块.push({i:p.i+pianyi,j:p.j,k:1}) 
                                    if(zod.i == p.i+pianyi && zod.j == p.j){
                                        jieshu = true
                                        zhaodao = true
                                        break;
                                    }
                                    ij = {i:p.i+pianyi,j:p.j,shang:ij}
                                    pianyi++
                                }
                                //如果遇到砖  添加落脚点
                                if(di[p.i+pianyi][p.j] == z&&p.i+pianyi!=19){
                                    jieguo.push({i:p.i+pianyi-1,j:p.j,shang:ij})
                                }
                                if(jieshu){
                                    jieguo["huisu"] = ij
                                    return jieguo;
                                }
                            }
                        lose = zhenjieguo;//记录上一个节点
                    }
                    if(jieshu == true){
                        jieguo["huisu"] = {i:p.i,j:p.j,shang:更新返回路径}
                        break;
                    }
                }
                if(zoubudong(i-1,j)&&zoubudong(i-1,j+1)&&zoubudong(i-1,j-1)){
                    return jieguo;
                }
            }

            for (let index = -lidu - 2; index <= lidu + 2 && jieshu == false; index++) {
                let zuo = false
                let mubiao = 0;
                if(index<0){
                    p.js = -1
                    if(index == -1){
                        p.js = 0
                        mubiao = 3
                        zuo = false
                    }
                    if(index == -2){
                        p.js = 0
                        mubiao = 2
                        zuo = false
                    }
                }else if(index>0){
                    p.js = 1
                    if(index == 1){
                        p.js = 0
                        mubiao = 3
                        zuo = true
                    }
                    if(index == 2){
                        p.js = 0
                        mubiao = 2
                        zuo = true
                    }
                }else{
                    continue;
                }
                p.i = cundang.i
                p.j = cundang.j
                if(index == -2||index == 2||index == -1||index == 1){
                    p.jump(lidu,er,zuo,mubiao)
                    //如果是延时起跳
                }else{
                    p.jump(Math.abs(index)-2,er,zuo,mubiao)
                }

                p.shangci = {i :-1,j:-1};

                let lose = ij;
                更新返回路径 = ij
                while (p.update(jieguo,ij,lose) == true) {
                    //console.log(p.i,p.j);
                    lose = 更新返回路径;
                    let zhenjieguo = {i:p.i,j:p.j,shang:lose}; //记录当前节点

                    if(di[p.i][p.j] == z){
                        continue;
                    }
                    if(di[p.i][p.j] == k){
                        //di[p.i][p.j] = ` ${iiii} `
                        全局色块.push({i:p.i,j:p.j,k:1})
                        if(debug == true) di[p.i][p.j] = ` . `

                    }
                    if((di[i+1][j] == z || di[p.i+1][p.j] == z ) && p.i!= 18){
                        //出发点是落脚点  或者当前位置是落脚点  则可以起跳
                        if(debug == true) di[p.i][p.j] = (di[p.i+1][p.j] == z)  ? ` * ` : ` , `
                        全局色块.push({i:p.i,j:p.j,k:di[p.i][p.j] = (di[p.i+1][p.j] == z)  ? 3 : 2}) 
                        jieguo.push(zhenjieguo)
                        //如果满足条件  记录节点
                        if(di[i+1][j] == z ){
                            //如果有二段跳  则记录自己直接下沉的所有记录点  直到碰到刺
                            let pianyi = 1;
                            while(di[p.i+pianyi][p.j] != z && sh.indexOf(di[p.i+pianyi][p.j]) == -1&& p.i+pianyi!= 18){
                                jieguo.push({i:p.i+pianyi,j:p.j,shang:zhenjieguo})
                                pianyi++
                            }
                        }
                    }else{
                            //如果没有  则全遍历一遍  看看有无终点
                            let pianyi = 1;
                            let ij = {i:p.i+pianyi,j:p.j,shang:zhenjieguo}
                            while(di[p.i+pianyi][p.j] != z && sh.indexOf(di[p.i+pianyi][p.j]) == -1){
                                全局色块.push({i:p.i+pianyi,j:p.j,k:1}) 
                                if(zod.i == p.i+pianyi && zod.j == p.j){
                                    jieshu = true
                                    zhaodao = true
                                    break;
                                }
                                ij = {i:p.i+pianyi,j:p.j,shang:ij}
                                pianyi++
                            }
                            //如果遇到砖  添加落脚点
                            if(di[p.i+pianyi][p.j] == z&&p.i+pianyi!=19){
                                jieguo.push({i:p.i+pianyi-1,j:p.j,shang:ij})
                            }
                            if(jieshu){
                                jieguo["huisu"] = ij
                                return jieguo
                            }
                        }
                    lose = zhenjieguo;//记录上一个节点

                }
                if(jieshu == true){
                    jieguo["huisu"] = {i:p.i,j:p.j,shang:更新返回路径}
                    break;
                }
            }


            p.i = cundang.i
            p.j = cundang.j
            p.js = cundang.js
            return jieguo;
        }

        if(zhaodao == false){
            //如果有解
            //console.log("为啥不重置:"+youjiema);
            
            if(youjiema == true){
                changshicishu ++
                if(changshicishu < 100)
                shengchengditu(youjiema)
                return;
            }
        }else if(cud.i <= zod.i){
            //判断是否满足终点在出生点上面
            //changshicishu ++

            //shengchengditu()
            //return;
        }
        if(zhaodao == true){
            console.log("有解  >> ");
        }else{
            console.log("无解  >> ");
        }
    }
}
shengchengditu()

dayin()
function dayin(){
    console.log("生成尝试次数："+changshicishu);
    console.log("总计算量："+jisuanliang);
    let str = "| "
    for(let i = 0; i < 19; i++){
        for(let j = 24; j >= 0; j--){
            if (i == cud.i && j == cud.j){
                str += qi
            }else if (i == zod.i && j == zod.j){
                str += zo
            }else{
                str += di[i][j]
            }
        }
        str += " |\n| "
    }
    console.log("%c"+str,"color:red;")
}
function random(n,m){
    return Math.floor(Math.random() * (m - n + 1)) + n;
}
function ondi(i,j){
    if(i >= 0 && i < 19 && j >= 0 && j < 25){
        return true
    }
    return false
}
function juli(a,b,c,d){
    //return Math.abs(a-c) + Math.abs(b-d)
    return Math.sqrt(Math.pow(a-c,2) + Math.pow(b-d,2))
}
function quanzhong(a,b,c,d){
    //return Math.abs(a-c) + Math.abs(b-d)
    return Math.abs(a-c) + 5*Math.abs(b-d)
}
function shenkaobei(o){
    let o1 = [...o]
    return o1
}
function zoubudong(i , j){
    return di[i][j] == z || sh.indexOf(di[i][j]) != -1
}


function anquan(i , j){
    return di[i][j] != z && sh.indexOf(di[i][j]) == -1
}