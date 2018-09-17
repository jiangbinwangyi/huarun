<template>
    <div class="item">
        <span>{{index+1}}.</span>
        <span>如果</span>
        <Select v-model="model0" style="width:200px" placeholder="请选择项目" @on-change="changeSelect">
            <Option v-for="item in selectList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
        </Select>
        <span>选择了</span>
        <Select v-model="model1" style="width:200px" placeholder="请选择项目">
            <Option v-for="item in List1" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <span>则跳转到</span>
        <Select v-model="model2" style="width:200px" placeholder="请选择项目">
            <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Icon type="ios-trash" class="del-icon" @click="toDelItem(flag,index)"/>
        <!-- <Button type="info" ghost icon="ios-trash" ></Button> -->
    </div>
</template>
<script>
export default {
  props: ["options", "index", "flag"],
  data() {
    return {
        List1:[],
        // List2:this.selectList,
      selectList: [
        //select下拉列表框
        {
          value: "province",
          label: "省份"
        },
        {
          value: "city",
          label: "城市"
        }
      ],
      cityList: [
          { sjz: "石家庄" }, { xt: "邢台" },
          { zz: "郑州" }, { xx: "新乡" },
          { jn: "济南" }, { yt: "烟台" },
        ],
      provinceList: [{ hb: "河北省" }, { hn: "河南省" }, { sd: "山东省" }],
      model0: "",
      model1: "",
      model2: ""
    };
  },
  methods: {
    toDelItem(flag, index) {
        this.$emit("onDelItem", flag, index);
    },
    changeSelect(){
        let _this=this
        // 第一个下拉框
        if(_this.model0=='province'){
          _this.List1=[]
          _this.model1=''
          _this.model2=''
            _this.provinceList.forEach((v,k)=>{
                for(let key in v){
                    let item={}
                    item.label=v[key]
                    item.value=key
                    _this.List1.push(item)
                }
            })
        }else{
          _this.List1=[]
          _this.model1=''
          _this.model2=''
          _this.cityList.forEach((v,k)=>{
                for(let key in v){
                    let item={}
                    item.label=v[key]
                    item.value=key
                    _this.List1.push(item)
                }
            })
        }
    },
  }
};
</script>
<style lang="less" scoped>
.del-icon {
  font-size: 20px;
  float: right;
  line-height: 30px;
  cursor: pointer;
  &:hover {
    color: #ed4014;
  }
}
</style>


