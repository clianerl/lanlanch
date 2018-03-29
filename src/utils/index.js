export default {
  vueObj :null,
  mainVue : null,
  goodTime (str) {
    let now = new Date().getTime()
    let oldTime = new Date(str).getTime()
    let difference = now - oldTime
    let result = ''
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let month = day * 30
    let year = month * 12
    let _year = difference / year
    let _month = difference / month
    let _week = difference / (7 * day)
    let _day = difference / day
    let _hour = difference / hour
    let _min = difference / minute

    if (_year >= 1) {
      result = '发表于 ' + ~~(_year) + ' 年前'
    } else if (_month >= 1) {
      result = '发表于 ' + ~~(_month) + ' 个月前'
    } else if (_week >= 1) {
      result = '发表于 ' + ~~(_week) + ' 周前'
    } else if (_day >= 1) {
      result = '发表于 ' + ~~(_day) + ' 天前'
    } else if (_hour >= 1) {
      result = '发表于 ' + ~~(_hour) + ' 个小时前'
    } else if (_min >= 1) {
      result = '发表于 ' + ~~(_min) + ' 分钟前'
    } else {
      result = '刚刚'
    }
    return result
  },
  getFormatDate () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
    
    },
  putLog (str) {
    console.log(str)
  },
  alertMsg () {
    
  },
  //获取cookie、
  getCookie (name) {
   var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
   if (arr = document.cookie.match(reg))
    return (arr[2]);
   else
    return null;
  },
  //设置cookie,增加到vue实例方便全局调用
  setCookie (c_name, value, expiredays) {
   var exdate = new Date();
   exdate.setDate(exdate.getDate() + expiredays);
   document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  },
  //删除cookie
  delCookie (name) {
   var exp = new Date();
   exp.setTime(exp.getTime() - 1);
   var cval = getCookie(name);
   if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  // isLogin () {
  //   var userid = this.getCookie("userid");
  //   if(userid==null || userid==""){
  //     return false;
  //   }else{
  //     return true;
  //   }
  // },
  // loading相关方法，弄成全局的组件了!!!!
  initFatherFunction () {
    this.vueObj.changeloading = function(flag){
      this.$emit('changeloading',flag);
    }
    this.vueObj.showloading = function(){
      this.changeloading(true)
    }
    this.vueObj.hideloading = function(){
      this.changeloading(false)
    }
    this.vueObj.alertOk = function(type,text,ok,cancel){
      this.$emit('alertOk',[type,text,ok,cancel]);
    }
    this.vueObj.alertClose = function(){
      this.$emit('alertClose');
    }
  },
  // 获取用户信息
  getUserMsg () {
    // var userObj = {
    //   userid : this.getCookie("userid"),
    //   username : this.getCookie("username")
    // }
    var userObj = {
      userid : sessionStorage.getItem("userid"),
      username : sessionStorage.getItem("username")
    }
    return userObj  
    // return this.mainVue.methods.getUser()
    // return window.user==undefined?{}:window.user
  },
  //保存用户信息
  setUserMsg (userObj) {
    // window.user = userObj
    // this.setCookie("userid",userObj.userid)
    // this.setCookie("username",userObj.username)
    // this.mainVue.methods.setUser(userObj)
    sessionStorage.setItem("userid", userObj.userid)
    sessionStorage.setItem("username", userObj.username)
  }
}
