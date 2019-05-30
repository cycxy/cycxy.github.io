function cxy_stegger() {
    this.binaryToStr = function (str) {
        var result = [];
        var list = str.split(" ");
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            //console.log(item)
            var asciiCode = parseInt(item, 2);
            //console.log(asciiCode)
            var charValue = String.fromCharCode(asciiCode);
            // console.log(charValue)
            result.push(charValue);
        }
        return result.join("");
    }
    this.test = function (src,src2) {
        console.log(1111)
        var img = new Image;
        img.src = src;//'./red.jpg';
        img.onload = function (e) {
            var canvas = document.getElementById('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            var ctx = canvas.getContext('2d');
            //  document.getElementById('img');
            // 将图片画到canvas上面上去！
            ctx.drawImage(img, 0, 0);
            console.log(img.width, img.height)
            var pixelCount = ctx.canvas.width * ctx.canvas.height;
            console.log(ctx.canvas.width, ctx.canvas.height)
            var imgData = ctx.getImageData(0, 0, img.width, img.height);

            let mm = '我说现在是2019年5月25号20点19分';
            let list = [];
            //在头的位置写入标记长度符
            mm = (mm.length + ";") + mm;
            for (let i = 0; i < mm.length; i++) {
                list.push(mm.charCodeAt(i).toString(2).padStart(16, 0))
            }
            console.log(list)
            // console.log(list.join(''))

            let wrlist = list.join('');
            //写入
            let weindex = 0;
            console.log(wrlist.length)
            for (let i = 0; i < wrlist.length; i++) {
                // if(imgData.data[i] != 255){
                //     console.log(i,imgData.data[i])
                // }
                if (!imgData.data[weindex + 3].toString(2).endsWith(wrlist[i])) {//11111111 != 0
                    //console.log(imgData.data[weindex+3].toString(2))
                    //console.log(parseInt(imgData.data[weindex+3].toString(2).substring(0,7) + (wrlist[i].endsWith('0')?'0':'1'),2))
                    //console.log(imgData.data[weindex+3],parseInt(imgData.data[weindex+3].toString(2).substring(0,7) + (wrlist[i].endsWith('0')?'0':'1'),2) )
                    imgData.data[weindex + 3] = parseInt(imgData.data[weindex + 3].toString(2).substring(0, 7) + (wrlist[i].endsWith('0') ? '0' : '1'), 2)//2进制转10进
                    //console.log(imgData.data[weindex+3])
                }
                //console.log(imgData.data[weindex+3])
                weindex += 4
            }
            // console.log(imgData.data.join('>>'))
            console.log(imgData)
            //生成新的图片
            ctx.putImageData(imgData, 0, 0);
            //ctx.drawImage(img, 0, 0);
        }

        var img2 = new Image;
        img2.src = src2;//'./red2.jpg';
        img2.onload = function (e) {
            var canvas = document.getElementById('canvas2');
            canvas.width = img2.width;
            canvas.height = img2.height;

            var ctx = canvas.getContext('2d');
            //  document.getElementById('img');
            // 将图片画到canvas上面上去！
            ctx.drawImage(img2, 0, 0);
            // console.log(img2.width,img2.height)
            // var pixelCount = ctx.canvas.width * ctx.canvas.height;
            // console.log(ctx.canvas.width, ctx.canvas.height)
            var imgData = ctx.getImageData(0, 0, img2.width, img2.height);

            console.log(imgData.data.join('>>'))

            // //解析数据
            let list = []
            for (let i = 3; i < imgData.data.length; i += 4) {
                list.push((imgData.data[i].toString(2) + '').substring(7, 8))
            }
            list = list.join('')
            //console.log(list)
            let strs = "";
            let dqlength = 0;
            let bjlength = 0;
            for (let i = 0; i < (dqlength || list.length); i += 16) {
                strs += binaryToStr(list.substring(i, i + 16))
                //console.log(strs)
                if (strs && strs.indexOf(';') != -1 && dqlength == 0) {//读取到有长度符
                    dqlength = strs.substring(0, strs.indexOf(';'))
                    //console.log(dqlength)
                    bjlength = dqlength.length + 1
                    dqlength = (bjlength + parseInt(dqlength)) * 16;
                    //console.log(dqlength)
                }
            }
            strs = strs.substr(bjlength)
            console.log('图片内容:' + strs)
            // console.log(imgData.data)
            // for (let m = 0; m < list.length; m++) {
            //     console.log(binaryToStr(list[m]))
            // }
            //   console.log( binaryToStr('110001000010001')) 
        }

    }

}



