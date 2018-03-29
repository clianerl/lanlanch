<template>
  <div id="app">
    <loading :show="showloading"></loading>
    <alert @alertClose="alertClose" :show="showAlert" :type="alertType" :text="alertText" :ok="alertOkText" :cancel="alertCancelText"></alert>
    <router-view @changeloading="changeloading" @alertOk="alertOk" @alertClose="alertClose"/>
  </div>
</template>

<script>
import loading from './components/loading.vue'
import alert from './components/alert.vue'
export default {
  name: 'app',
  components:{ loading,alert },
  data () {
  	return {
  		showloading:false,
      showAlert:false,
      alertType:'alert',
      alertText:'我是内容',
      alertOkText:'',
      alertCancelText:'',
      userid:'',
      username:''
  	}
  },
  methods:{
  	changeloading (flag) {
  		this.showloading = flag
  	},
    alertOk (param) {
      this.alertType = param[0]
      this.alertText = param[1]
      this.alertOkText = param[2]
      this.alertCancelText = param[3]
      this.showAlert = true
    },
    alertClose () {
      this.showAlert = false
    },
    setUser (userObj) {
      if(userObj!=null){
        this.userid = userObj.userid
        this.username = userObj.username
      }
    },
    getUser () {
      return {userid:this.userid,username:this.username}
    }
  }
}
</script>

<style lang="scss">
  @import "./style/style";
</style>


