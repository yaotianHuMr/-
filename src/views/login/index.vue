<template>
  <div class="login">
    <div class="ivu-col">
      <div class="major text-primary">欢迎使用后台管理系统</div>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="mobile">
          <el-input
            v-model="loginForm.mobile"
            clearable
            prefix-icon="el-icon-user"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            clearable
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            style="width: 100%"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin, userInfo } from "@/api/loginInfo";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        mobile: "admin",
        password: "123456",
      },
      rules: {
        mobile: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
      },
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    //  提交登录
    submitForm(loginForm) {
      this.$refs[loginForm].validate(async (valid) => {
        if (valid) {
          let result = await userLogin(
            this.loginForm.mobile,
            this.loginForm.password
          );
          if (result.data.msg == "操作成功") {
            //  保存token
            sessionStorage.setItem("token", result.data.data.remember_token);
            //将用户信息保存到vuex
            this.$store.commit("setuser", result.data.data);
            let res = await userInfo();
            if (res.data.msg == "成功") {
              //将菜单保存到vuex
              this.$store.commit("setmenulist", res.data.rows);
            }
            this.$router.push("/");
            this.$message.success("登录成功");
          }
        } else {
          return false;
        }
      });
    },
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {},
  /**
   * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
   */
  beforeUpdate() {},
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {},
  /**
   * 实例销毁之前调用。在这一步，实例仍然完全可用。
   */
  beforeDestroy() {},
  /**
   * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
   * 所有的事件监听器会被移除，所有的子实例也会被销毁。
   */
  destroyed() {},
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>
.login {
  height: 100%;
}
.ivu-col {
  width: 368px;
  margin: 100px auto;
}
.major {
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
