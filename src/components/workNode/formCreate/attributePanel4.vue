<!--
  属性面板
-->
<template>
  <Row class="atr">
    <Col class="atr-title">下拉</Col>
    <Col class="atr-action">
      <Row>
        <Col class="atr-act-con l" :span="10">切换组件类型</Col>
        <Col class="atr-act-con" :span="14">
          <Select class="select" v-model="type">
            <Option v-for="item in typeData" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row>
        <Col class="atr-act-con l" :span="10">标题</Col>
        <Col class="atr-act-con" :span="14">
          <Input :value="label" :maxlength="5" @on-change="changeTitle($event)" />
        </Col>
      </Row>
      <Row>
        <Col class="atr-act-con l" :span="10">描述</Col>
        <Col class="atr-act-con" :span="14">
          <Input v-model="describe" />
        </Col>
      </Row>
      <Row>
        <Col class="atr-act-con l" :span="10">默认提示文字</Col>
        <Col class="atr-act-con" :span="14">
          <Input v-model="tips" />
        </Col>
      </Row>

      <Row>
        <Col class="atr-act-con t" :span="24">
          <Checkbox v-model="single">这个是必填项</Checkbox>
        </Col>
      </Row>

      <Row>
        <Col class="atr-act-con l t" :span="10">选项内容</Col>
        <!--<Col class="atr-act-con b" :span="14">-->
          <!--<Button type="text" class="btn">批量编辑</Button>-->
        <!--</Col>-->
      </Row>
      <Row>

        <Col class="atr-act-con l" :span="24" v-for="(item,$index) in tab">
          <Col :span="2"><Icon type="md-close" class="confirm error" @click="touchDel($index)" /></Col>
          <Col :span="2"><Icon type="md-checkmark" class="confirm" /></Col>
          <Col :span="20"><Input v-model="item.input" /></Col>
        </Col>
        <Col class="atr-act-con t" :span="24">
          <div  @click="addItem()" class="addItem"><Icon type="md-add"  class="confirm"  />添加选项</div>
        </Col>
      </Row>


      <Row>
        <Col class="atr-act-con l t" :span="24">填写设置</Col>
      </Row>
      <Row>
        <Col class="atr-act-con c" :span="24">
          <Checkbox v-model="single">添加'其他'选项</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col class="atr-act-con c" :span="24">
          <Checkbox v-model="single">限制选项配额</Checkbox>
        </Col>
      </Row>

      <Row>
        <Col class="atr-act-con l t" :span="24">外观样式</Col>
      </Row>
      <Row>
        <Col class="atr-act-con c" :span="24">组件排版方式</Col>
      </Row>
      <Row>
        <Col class="atr-act-con" :span="24">
          <Button class="btn" :class="{ac: layout == false}" shape="circle" @click="touchLayout(layout)">上下布局</Button>
          <Button class="btn l" :class="{ac: layout == true}" shape="circle" @click="touchLayout(layout)">左右布局</Button>
        </Col>
      </Row>
      <Row>
        <Col class="atr-act-con c" :span="24">
          标题宽度
          <span class="grey s">
            该设置项对所有的左右布局的组件均有效
          </span>
        </Col>
      </Row>
      <Row>
        <Col class="atr-act-con c" :span="24">
          <div class="slide">
            <label class="sl" @click="touchA(Titlewidth)">+</label>
            <label class="sr" @click="touchS(Titlewidth)">-</label>
            <input type="text" v-model="Titlewidth" disabled/>
          </div>
        </Col>
      </Row>
      <Row>
        <Col class="atr-act-con c" :span="24">组件宽度(%)</Col>
      </Row>
      <Row>
        <Col class="atr-act-con c" :span="24">
          <RadioGroup v-model="ComponentWidth" type="button" @on-change="touchCW(ComponentWidth)" size="small">
            <Radio label="10"></Radio>
            <Radio label="20"></Radio>
            <Radio label="30"></Radio>
            <Radio label="40"></Radio>
            <Radio label="50"></Radio>
            <Radio label="60"></Radio>
            <Radio label="70"></Radio>
            <Radio label="80"></Radio>
            <Radio label="90"></Radio>
            <Radio label="100"></Radio>
          </RadioGroup>
        </Col>
      </Row>


    </Col>
  </Row>
</template>

<script>
  export default {
    name: "attributePanel",
    props:['label'],
    data(){
      return{
        type: '',
        tv: '货币',
        describe: '',
        tips: '请选择',
        ComponentWidth: '',
        Titlewidth: '30%',
        single: false,
        layout: true,
        typeData:[
          {label:'下拉',value:'1'},
        ],


        curr: '',
        currData:[
          {label:'¥人民币',value:'1'},
          {label:'$美元',value:'2'},
        ],
        dateDsc:'',
        dateDscData:[
          {label:'留言',value:'1'},
          {label:'.....',value:'2'},
        ],


        tab: [
          {
            input: '选项1',
          },
          {
            input: '选项2',
          },
        ]

      }
    },
    mounted(){
      let vm = this;
      vm.type = vm.typeData[0].value;
    },
    methods: {
      touchLayout(boolean){
        let vm = this;
        vm.layout = !vm.layout;
      },
      touchCW(value){
        let vm = this;

      },
      touchA(value){
        let vm = this;
        let str = Number(value.replace('%',''));
        str += 10;
        if(str >= 100) vm.Titlewidth = "100%";
        else vm.Titlewidth = String(str) + "%";
      },
      touchS(value){
        let vm = this;
        let str = Number(value.replace('%',''));
        str -= 10;
        if(str <= 0) vm.Titlewidth = "0%";
        else vm.Titlewidth = String(str) + "%";
      },
      addItem(){
        let vm = this;
        vm.tab.push({input: `选项${vm.tab.length+1}`,});
      },
      touchDel(num){
        let vm = this;
        vm.tab.splice(num, 1);
      },
      changeTitle(e){
				this.$emit('changeTitle',e.target.value)
			}
    }
  }
</script>

<style lang="less" scoped>
  .atr{
    background-color: #fff;
    width: 100%;
    overflow-y: auto;
    height: 100%;
    padding: 0;
    .atr-title{
      height: .64rem;
      line-height: .64rem;
      text-align: center;
      background-color: #e8edf1;
      color: #5e6572;
      font-weight: bold;
      font-size: 14px;
    }
    .atr-action{
      background-color: #fff;
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
      font-size: 14px;
      .atr-act-con{
        height: 35px;
        line-height: 30px;
        &.l{
          color: #4a525e;
          font-weight: bold;
        }
        &.c{
          height: 30px;
        }
        &.t{
          height: 40px;
          padding-top: 10px;
        }
        .grey{
          color: #9ea7b4;
          &.s{
            font-size: 10px;
          }
        }
        &.b{
          margin-top: 10px;
          .btn{
            float: right;
            padding: 2px 0;
          }
        }
        .select{
          border-left: none;
          border-top: none;
          border-right: none;
          border-bottom: 1px solid #e6eff3;
          outline: none;
          box-shadow: none;
          /deep/.ivu-icon{
            color: #e6eff3;
            font-weight: bold;
          }
          /deep/.ivu-select-selection, /deep/.ivu-select-selection-focused{
            border: none;
            outline: none;
            box-shadow: none;
          }
        }
        /deep/.ivu-input, /deep/.ivu-input-default{
          border-left: none;
          border-top: none;
          border-right: none;
          border-bottom: 1px solid #dbe9ed;
          border-radius: 0;
          outline: none;
          box-shadow: none;
        }
        /deep/.ivu-checkbox-input{
          box-shadow: none;
        }
        .confirm{
          color: #4ebdd7;
          cursor: pointer;
          &.error{
            color: rgba(238, 75, 23, 0.74);
          }
        }
        .btn{
          padding: 2px 24px;
          &.ac{
            background-color: #2294af;
            color: white;
          }
          &.l{
            margin-left: 20px;
          }
        }
        /deep/.ivu-radio-wrapper{
          padding: 0 6px;
          font-size: 10px;
        }
        .addItem{
          text-align: center;
          padding: 0;
          height: 30px;
          line-height: 28px;
          cursor: pointer;
          border: 1px dashed #e4e8ea;
          border-radius: 4px;
          font-size: 10px;
          .confirm{
            color: #4ebdd7;
            font-size: 16px;
            position: relative;
            cursor: pointer;
            top: -1.5px;
            &.error{
              color: rgba(238, 75, 23, 0.74);
            }
          }
        }
        .slide{
          height: 22px;
          position: relative;
          width: 100px;
          border-radius: 4px;
          border: 1px solid #d9e7ec;
          overflow: hidden;
          .sl{
            border-left: 1px solid #d9e7ec;
            position: absolute;
            right: 0;
            top: 0;
            width: 20px;
            height: 20px;
            line-height: 16px;
            font-size: 20px;
            z-index: 3;
            color: #c4dae2;
            text-align: center;
            cursor: pointer;
          }
          .sr{
            border-right: 1px solid #d9e7ec;
            position: absolute;
            left: 0;
            top: 0;
            width: 20px;
            height: 20px;
            line-height: 15px;
            font-size: 26px;
            z-index: 3;
            color: #c4dae2;
            text-align: center;
            cursor: pointer;
          }
          input{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            width: 100%;
            height: 20px;
            font-size: 12px;
            line-height: 17;
            outline: none;
            border: none;
            margin: 0;
            text-align: center;
          }
        }
      }
    }
  }
</style>
