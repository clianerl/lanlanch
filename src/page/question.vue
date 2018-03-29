<template>
<div>
123
</div>
</template>
<script>

export default {
	data () {
		return{
			q1:"",
			q2:"",
			q3:"",
			q4:"",
			q5:"",
			q6:"",
			q7:"",
			q8:"",
			q9:"",
			q10:""
		}
	},
	mounted () {
	  
	},
	methods: {
		isOver () {
			if(this.q1!="" && 
				this.q2!="" && 
				this.q3!="" && 
				this.q4!="" && 
				this.q5!="" && 
				this.q6!="" && 
				this.q7!="" && 
				this.q8!="" && 
				this.q9!="" && 
				this.q10!="" ){
				alert("over!!answer is :"+q1+","+q2+","+q3+","+q4+","+q5+","+q6+","+q7+","+q8+","+q9+","+q10)
				return true;
			}
			else return false; 
		},
		calculate () {
			var answer = ["A","B","C",""]
			// 2
			switch(this.q5){
				case "C":this.q2 = "A";break;
				case "D":this.q2 = "B";break;
				case "A":this.q2 = "C";break;
				case "B":this.q2 = "D";break;
			}
			// 3
			var cal3 = [this.q3,this.q6,this.q2,this.q4];
			var cf = null;
			for(var i =0;i<3;i++){
				if(cal3[i]==cal3[i+1] && cal3[i]!=""){
					// 有重复
					cf = cal3[i];
				}
			}
			for(var i =0;i<3;i++){
				if(cal3[i]!=cal3[i+1] && cal3[i]!="" && cal3[i+1]!="" && cf!=null){
					if(cf == cal3[i]){
						this.q3 = answer[i+1];
					}else{
						this.q3 = answer[i];
					}
				}
			}
			// 4
			if(this.q3!=null && this.q6!=null &&  this.q2!=null && this.q4!=null){

			}
		}
	}
}
</script>