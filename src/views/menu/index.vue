<template>
  <div>
    <div>
      <el-form :model="searchform" :inline="true">
        <el-form-item label="菜单名称">
          <el-input v-model="searchform.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="userSearchForm.status.label" placeholder="菜单状态">
            <el-option v-for="item in userSearchForm.status" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary">搜索</el-button>
          <el-button icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type="primary" plain icon="el-icon-plus">新增</el-button>
      <el-button type="info" plain icon="el-icon-sort">展开/折叠</el-button>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column align="center" prop="menuName" label="菜单名称" width="180">
        </el-table-column>
        <el-table-column align="center" prop="menuIcon" label="图标" width="80">
          <template slot-scope="scope">
            <i :class="scope.row.menuIcon"></i>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="menuSort" label="排序" width="80">
        </el-table-column>
        <el-table-column align="center" prop="menuPermissions" label="权限标识">
        </el-table-column>
        <el-table-column align="center" prop="componentPath" label="组件路径">
        </el-table-column>
        <el-table-column align="center" prop="menuState" label="状态">
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleRowUpdateClick(scope.row)" type="text" size="small"
                icon="el-icon-edit">修改</el-button>
            <template>
                <el-popconfirm @confirm="handleDelete(scope.row)" title="确定删除吗？">
                    <el-button type="text" size="small" icon="el-icon-delete"
                        slot="reference">删除</el-button>
                </el-popconfirm>
            </template>
            <el-button type="text" size="small" icon="el-icon-d-arrow-right">更多</el-button>
        </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="添加菜单" :visible.sync="dialogFormVisible">
      
      

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'menu',

  data() {
    return {
      tableData: [
      
      ],
      searchform: {

      },
      userSearchForm: {
        status: [
          {
            label: '启用',
            value: 1,
          },
          {
            label: '禁用',
            value: 0,
          },
        ],
      },
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.$http.get('/menu').then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data;
        }
      });
    },
    handleDelete( {id} ){
      this.$http.delete(`/menu/${id}`).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.init();
        }
      });
    },
    handleRowUpdateClick(row) {
      console.log(row);
    },
  },
};
</script>