<template>
  <div class="layout overflow">
    <el-container>
      <el-header class="d-flex align-items-center">
        <img
          style="height: 40px"
          src="http://120.53.31.103:84/uploads/image/2020-05-27/zmkrHVxaa4fVI5jtcNZ3xGy6KPU0QjXzxPjX7trh.jpeg"
          alt=""
        />
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item
            style="margin-left: 30px"
            :index="index.toString()"
            v-for="(item, index) in menulistes"
            :key="index"
            >{{ item.title }}</el-menu-item
          >
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">超级管理员</el-menu-item>
            <el-menu-item index="2-2">账号设置</el-menu-item>
            <el-menu-item index="2-3">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="170px">
          <el-menu
            default-active="2"
            unique-opened
            class="el-menu-vertical-demo"
            router
          >
            <!-- 没有子级菜单 -->
            <el-menu-item
              :index="item.menu_url"
              v-for="(item, index) in menulistes[navIndex].children"
              v-show="!item.children"
              :key="index"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <!-- 有子级菜单 -->
            <el-submenu
              :index="item.id.toString()"
              v-for="item in menulistes[navIndex].children"
              v-show="item.children"
              :key="item.id"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="it.menu_url"
                  v-for="(it, index) in item.children"
                  :key="index"
                  >{{ it.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 路由占位符 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      menulistes: [],
      activeIndex: "0",
      navIndex: 0,
    };
  },
  // 计算属性
  computed: {
    ...mapState(["menulist", "userData"]),
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    handleSelect(index) {
      this.navIndex = index;
      this.activeIndex = index;
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
  created() {
    this.menulistes = this.menulist;
    // console.log(this.menulistes);
  },
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
.layout {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #2b83f9;
  background-image: linear-gradient(143deg, #2945cb 20%, #2b83f9 81%, #3a9dff);
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  width: 170px;
  min-width: 170px;
  max-width: 170px;
  border-right: 1px solid #d7dde4;
  box-sizing: border-box;
  text-align: center;
  height: 100%;
}

.el-main {
  color: #333;
  text-align: center;
  height: 100%;
}

.layout .el-container {
  height: 100%;
}

.el-menu {
  background: none;
}
</style>
