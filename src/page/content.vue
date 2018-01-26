<template>
  <div>
    <myheader></myheader>
    <div class="article_content"> 	
    	<span v-text="data.title"></span>
      <hr>
      <span>author:</span><span v-text="data.author.loginname"></span><br>
      <span>转自:</span><span v-text="data.author.avatar_url"></span><br>
      <span>发布时间:</span><span v-text="this.$utils.goodTime(data.author.create_at)"></span><br>
      <br>
      <br>
      <span v-html="data.content"></span>
    </div>
    <myfooter></myfooter>
  </div>
</template>
<script>
import myheader from '../components/header.vue'
import myfooter from '../components/footer.vue'
export default {
  components: { myheader, myfooter },
  data () {
    return {
      id: this.$route.params.id,
      data: {}
    }
  },
  created () {
    console.log(this.id)
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('topic/' + this.id, null, r => {
        this.$utils.putLog(r)
        this.data = r.data
      })
    }
  }
}
</script>
