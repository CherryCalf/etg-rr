<template>
  <div id="app">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: #2f4256; overflow: hidden;">
        <el-col>
          <h1 style="color:#fff;text-align:center;">若依管理系统</h1>
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            background-color="#2f4256" text-color="#ccc" active-text-color="#1579e5">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item-group style="overflow: hidden;">
                <el-menu-item style="background-color:#212d3d;" index="2-1" @click="goUser">用户管理</el-menu-item>
                <el-menu-item style="background-color:#212d3d;" index="2-2" @click="goRole">角色管理</el-menu-item>
                <el-menu-item style="background-color:#212d3d;" index="2-3" @click="goMenu">菜单管理</el-menu-item>
                <el-menu-item style="background-color:#212d3d;" index="2-4" @click="goDept">部门管理</el-menu-item>
                <el-menu-item style="background-color:#212d3d;" index="2-5" @click="goPost">岗位管理</el-menu-item>
                <el-menu-item style="background-color:#212d3d;" index="2-6" @click="goDict">字典管理</el-menu-item>
                <el-menu-item style="background-color:#212d3d;" index="2-7" @click="goPara">参数设置</el-menu-item>
                <el-menu-item style="background-color:#212d3d;" index="2-8" @click="goAnno">公告通知</el-menu-item>
                <el-submenu index="2-9" style="background-color:#212d3d;">
                  <template slot="title">
                    <span>日志管理</span>
                  </template>
                  <el-menu-item style="background-color:#212d3d;" index="1-9-1">123</el-menu-item>
                </el-submenu>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>

      <el-container>
        <el-header style="text-align: left; font-size: 12px; background-color:#fff">

          <el-breadcrumb separator="/" style="margin-top: 20px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          </el-breadcrumb>

        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>

export default {
  name: 'App',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goUser() {
      this.$router.push('/user');
    },
    goRole() {
      this.$router.push('/role');
    },
    goMenu() {
      this.$router.push('/menu');
    },
    goDept() {
      this.$router.push('/dept');
    },
    goPost() {
      this.$router.push('/post');
    },
    goDict() {
      this.$router.push('/dict');
    },
    goPara() {
      this.$router.push('/para');
    },
    goAnno() {
      this.$router.push('/anno');
    }
  },
} 
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
}

* {
  margin: 0;
  padding: 0;
}


.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
