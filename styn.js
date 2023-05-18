/*

不知道玩啥的

*/
//手机号&密码,多号用#
let m = '账号&密码'




try {
	axios = require('axios');
} catch (err) {
	throw new Error("\n找不到依赖 axios ,请自行安装\n");
}
try {
	Crypto_js = require('crypto-js');
} catch (err) {
	throw new Error("\n找不到依赖 crypto-js ,请自行安装\n");
}

for(num=0;num<m.split('#').length;num++){
    
    user_s(m.split('#')[num].split('&')[0],m.split('#')[num].split('&')[1])
}

async function user_s(m, p) {
    await user_Login(m, p)
}



async function user_Login(m, p) {
    var body = `{"mobile":"${m}","password":"${Crypto_js.MD5(p).toString()}","deviceid":"${Crypto_js.MD5(m).toString()}","ipaddress":""}`
    var res = await axios({
        method: "post",
        url: `http://39.106.70.235:12587/api/Account/Login`,
        headers: {"user-agent": "Mozilla/5.0 (Linux; Android 10; Build/QKQ1.191008.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36 uni-app Html5Plus/1.0 (Immersed/32.0)","Content-Type": "application/json","Content-Length": body.length,"Host": "39.106.70.235:12587","Connection": "Keep-Alive","Accept-Encoding": "gzip"},
        data:body
    });
    var result = res.data
    //console.log(res.data)
    if(result.code==0){
        await user_Ad(result.data.token)
        
    }else{
        console.log(`\n【登录】: ${result.message}`)
        
    }
    
}


async function user_Ad(t) {
    var body = `{"mobile":${m.split('&')[0]},"deviceid":"${Crypto_js.MD5(m.split('&')[0]).toString()}"}`
    var res = await axios({
        method: "post",
        url: `http://39.106.70.235:12587/api/Bus/Advertisement`,
        headers: {"token": t,"user-agent": "Mozilla/5.0 (Linux; Android 10; Build/QKQ1.191008.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36 uni-app Html5Plus/1.0 (Immersed/32.0)","Content-Type": "application/json","Content-Length": body.length,"Host": "39.106.70.235:12587","Connection": "Keep-Alive","Accept-Encoding": "gzip"},
        data:body
    });
    var result = res.data
    //console.log(res.data)
    if(result.code==0){
        console.log(`\n【看广告】: ${result.message}`)
        await Sleep_time(15, 25)
        await user_Ad(t)
        
    }else{
        console.log(`\n【看广告】: ${result.message}`)
        
    }
    
}

async function Sleep_time(min, max) {
  //return Math.floor(Math.random() * (max - min + 1)) + min;
  await wait(Math.floor(Math.random() * (max * 1000 - min * 1000 + 1)) + min * 1000)
  
}
async function wait(t) {
    return new Promise(e => setTimeout(e, t))
}
