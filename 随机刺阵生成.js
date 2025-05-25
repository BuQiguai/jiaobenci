

绘制地图()
//绘制数字()
function 绘制地图() {
    let canvas = document.getElementById('屏幕');
    let ctx = canvas.getContext('2d');
    di[cud.i][cud.j] = qi
    di[zod.i][zod.j] = zo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
        绘制背景(()=>{
            绘制贴图('砖', z);
            绘制贴图('起点', qi);
            绘制贴图('传送门', zo);
            绘制贴图('刺上', cw);
            绘制贴图('刺下', cs);
            绘制贴图('刺左', ca);
            绘制贴图('刺右', cd);
        })
}
function 绘制背景(回调){
    // 获取canvas元素和它的绘图上下文  
    let canvas = document.getElementById('屏幕');
    let ctx = canvas.getContext('2d');

    // 创建一个新的Image对象  

    // 设置图片源，并指定图片加载完成后要执行的函数  
    if(图片缓存["背景"]!=undefined){
        ctx.drawImage(图片缓存["背景"], 0,0);
        回调()
        return
    }
    let img = new Image();
    img.src = `./bg.png`; // 替换为你的图片路径
    img.onload = function () {
        图片缓存["背景"] = img
        ctx.drawImage(img, 0,0);
        回调()
    };
}
function 绘制贴图(贴图名字, 匹配单位) {
    // 获取canvas元素和它的绘图上下文  
    let canvas = document.getElementById('屏幕');
    let ctx = canvas.getContext('2d');

    // 创建一个新的Image对象  

    // 设置图片源，并指定图片加载完成后要执行的函数  
    if(图片缓存[匹配单位]!=undefined){
        for (let i = 0; i < 19; i++) {
            for (let j = 24; j >= 0; j--) {
                
                if (di[i][j] == 匹配单位)
                    ctx.drawImage(图片缓存[匹配单位], 800 - 32 * j - 32, 32 * i);
            }
        }
        return
    }
    let img = new Image();
    img.src = `./${贴图名字}.png`; // 替换为你的图片路径
    img.onload = function () {
        图片缓存[匹配单位] = img
        for (let i = 0; i < 19; i++) {
            for (let j = 24; j >= 0; j--) {
                
                if (di[i][j] == 匹配单位)
                    ctx.drawImage(img, 800 - 32 * j - 32, 32 * i);
            }
        }
    };
}

function 绘制数字() {
    let canvas = document.getElementById('屏幕');
    let ctx = canvas.getContext('2d');

    // 设置字体样式
    ctx.font = '20px Arial';

    // 设置文本颜色
    ctx.fillStyle = 'green';

    for (let i = 0; i < 19; i++) {
        for (let j = 24; j >= 0; j--) {
            if (di[i][j][1] < '9' && di[i][j][1] > '0')
                ctx.fillText(di[i][j], 800 - 32 * j, 32 * i + 32);
        }
    }
}

绘制色块()

绘制路径()
function 坐标转换(i,j){
    return {i:800 - 32 * j - 16 , j:32 * i + 16}
}

function 绘制路径(){
    let canvas = document.getElementById('屏幕');
    let ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.lineWidth = 12;
    ctx.strokeStyle = "blue" // 使用十六进制颜色代码
    全局路径.forEach((坐标, 索引) => {
        const 转换后的坐标 = 坐标转换(坐标.i, 坐标.j);
        if (索引 === 0) {
            ctx.moveTo(转换后的坐标.i, 转换后的坐标.j);
        } else {
            ctx.lineTo(转换后的坐标.i, 转换后的坐标.j);
        }
    });
    const 转换后的坐标 = 坐标转换(cud.i, cud.j);
    ctx.lineTo(转换后的坐标.i, 转换后的坐标.j);
    ctx.stroke();

}


function 绘制色块(){
    let canvas = document.getElementById('屏幕');
    let ctx = canvas.getContext('2d');
    let 颜色深 = {}
    全局色块.forEach(ijk => {
        if(ijk.k == 1){
            ctx.fillStyle = "#0000ff33"; // 设置填充颜色
            const 转换后的坐标 = 坐标转换(ijk.i, ijk.j);
            颜色深[ijk.i+","+ijk.j] = 颜色深[ijk.i+","+ijk.j]?颜色深[ijk.i+","+ijk.j]+1:1
            if(颜色深[ijk.i+","+ijk.j] < 3)
                ctx.fillRect(转换后的坐标.i- 16, 转换后的坐标.j- 16, 32, 32); // 绘制矩形
        }
        if(ijk.k == 2){
            ctx.fillStyle = "#ff00ff33"; // 设置填充颜色
            const 转换后的坐标 = 坐标转换(ijk.i, ijk.j);
            颜色深[ijk.i+","+ijk.j] = 颜色深[ijk.i+","+ijk.j]?颜色深[ijk.i+","+ijk.j]+1:1
            if(颜色深[ijk.i+","+ijk.j] < 3)
                ctx.fillRect(转换后的坐标.i- 16, 转换后的坐标.j- 16, 32, 32); // 绘制矩形
        }
        if(ijk.k == 3){
            ctx.fillStyle = "#00ffff33"; // 设置填充颜色
            const 转换后的坐标 = 坐标转换(ijk.i, ijk.j);
            颜色深[ijk.i+","+ijk.j] = 颜色深[ijk.i+","+ijk.j]?颜色深[ijk.i+","+ijk.j]+1:1
            if(颜色深[ijk.i+","+ijk.j] < 3)
                ctx.fillRect(转换后的坐标.i - 16, 转换后的坐标.j- 16, 32, 32); // 绘制矩形
        }
    })
}