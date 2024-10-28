<template>

    <div class="center">
        <div class="left">
            <el-form v-model="form">
                <el-input v-model="form.deptName" placeholder="请输入部门名称" prefix-icon="el-icon-search"></el-input>
            </el-form>
            <el-tree :data="deptData" @node-click="handleNodeClick" class="deptTree"></el-tree>
        </div>
        <div class="right">
            <el-form :module="userSearchForm" :inline="true">
                <el-form-item label="用户名称">
                    <el-input v-model="userSearchForm.userName" placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="userSearchForm.userName" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="userSearchForm.status.label" placeholder="用户状态">
                        <el-option v-for="item in userSearchForm.status" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker v-model="userSearchForm.createTime" type="daterange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" type="primary">搜索</el-button>
                    <el-button icon="el-icon-refresh">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="button_row">
                <div>
                    <el-button icon="el-icon-plus" plain type="primary" @click="dialogFormVisible = true">新增</el-button>
                    <el-button icon="el-icon-edit" plain type="success">修改</el-button>
                    <el-button icon="el-icon-delete" plain type="danger">删除</el-button>
                    <el-button icon="el-icon-download" plain type="warning">导出</el-button>
                </div>
                <div>
                    <el-button icon="el-icon-search" plain circle></el-button>
                    <el-button icon="el-icon-refresh" plain circle></el-button>
                </div>
            </div>
            <div class="table_data">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column align="center" type="selection" width="55">
                    </el-table-column>
                    <el-table-column align="center" prop="userId" label="用户编号">
                    </el-table-column>
                    <el-table-column align="center" prop="username" label="用户名称">
                    </el-table-column>
                    <el-table-column align="center" prop="dept" label="部门">
                    </el-table-column>
                    <el-table-column align="center" prop="phone" label="手机号码">
                    </el-table-column>
                    <el-table-column align="center" prop="status" label="状态">
                        <template v-slot="scope">
                            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="200px" prop="createTime" label="创建时间">
                    </el-table-column>
                    <el-table-column align="center" width="200px" fixed="right" label="操作">
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
                <div class="pagin">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="pagin.currentPage" :page-sizes="pagin.pageSizes" :page-size="pagin.pageSize"
                        layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                    </el-pagination>
                </div>
            </div>
        </div>

        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="addform" :inline="true" label-width="120px" size="mini" :rules="rules">
                <el-form-item label="用户昵称" prop="nickname">
                    <el-input v-model="addform.nickname" placeholder="请输入用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="归属部门" prop="dept">
                    <el-select v-model="addform.dept" placeholder="请选择归属部门">
                        <el-option v-for="item in dept" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="addform.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addform.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="用户名称" prop="username">
                    <el-input v-model="addform.username" placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input v-model="addform.password" type="password" placeholder="请输入用户密码"></el-input>
                </el-form-item>
                <el-form-item label="用户性别" prop="sex">
                    <el-select v-model="addform.sex" placeholder="请选择性别">
                        <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio v-model="addform.status" label="0">正常</el-radio>
                    <el-radio v-model="addform.status" label="1">停用</el-radio>
                </el-form-item>
                <el-form-item label="岗位" prop="post">
                    <el-select v-model="addform.post" placeholder="请选择岗位">
                        <el-option v-for="item in post" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="addform.role" placeholder="请选择角色">
                        <el-option v-for="item in role" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="addform.remark" type="textarea" placeholder="请输入备注" resize="none"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="FormVisible()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 修改 -->
        <el-dialog title="收货地址" :visible.sync="dialogFormupdate">
            <el-form :model="updateform" :inline="true">
                <el-form-item label="用户名称" prop="username">
                    <el-input v-model="updateform.username" placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item label="归属部门" prop="dept">
                    <el-select v-model="updateform.dept" placeholder="请选择归属部门">
                        <el-option v-for="item in dept" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="updateform.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio v-model="updateform.status" label="0">正常</el-radio>
                    <el-radio v-model="updateform.status" label="1">停用</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormupdate = false">取 消</el-button>
                <el-button type="primary" @click="updateformdata()">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
export default {
    name: 'UserComponent',
    data() {
        return {
            updateform: {
                
            },
            title: '新增用户',
            rules: {
                nickname: [
                    { required: true, message: '用户昵称不能为空', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '用户名称不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '用户密码不能为空', trigger: 'blur' }
                ]
            },
            post: [
                {
                    value: '1',
                    label: '总经理'
                },
                {
                    value: '2',
                    label: '总监'
                }
            ],
            role: [
                {
                    value: '1',
                    label: '管理员'
                },
                {
                    value: '2',
                    label: '普通用户'
                }
            ],
            sex: [{
                value: '1',
                label: '男'
            }, {
                value: '2',
                label: '女'
            }],
            dialogFormVisible: false,
            dialogFormupdate: false,
            addform: {

            },
            dept: [{
                value: '1',
                label: '市场部门'
            }, {
                value: '2',
                label: '研发部门'
            }],
            pagin: {
                currentPage: 1,
                pageSizes: [5, 10],
                pageSize: 5,
            },
            tableData: [

            ],
            userSearchForm: {
                userName: '',
                deptName: '',
                status: [{
                    label: '正常',
                    value: '0'
                }, {
                    label: '停用',
                    value: '1'
                }],
                createTime: ''
            },
            form: {
                deptName: ''
            },
            deptData: [{
                label: '若依科技',
                children: [{
                    label: '深圳总公司',
                    children: [{
                        label: '研发部门',
                    }, {
                        label: '市场部门',
                    }, {
                        label: '综合部门'
                    }]
                }, {
                    label: '北京分公司',
                    children: [{
                        label: '研发部门',
                    }, {
                        label: '市场部门',
                    }, {
                        label: '综合部门'
                    }]
                }]
            }]
        }
    },

    mounted() {
        this.init()
    },

    methods: {
        updateformdata() {
            this.dialogFormupdate = false
            this.$http.put('user/',this.updateform).then(res => {
                if (res.data.code == 200) {
                    this.init()
                    this.$message.success('添加成功');
                } else {
                    this.$message.error(res.msg);
                }
                this.init()
            })
        },
        handleNodeClick() { },
        handleSizeChange() { },
        handleCurrentChange() { },
        handleRowUpdateClick({ userId }) {
            this.dialogFormupdate = true
            this.$http.get(`/user/${userId}`).then(res => {
                this.updateform = res.data.data
            })
           

        },
        FormVisible() {
            this.dialogFormVisible = false;
            this.$http.post('user/', this.addform).then(res => {
                if (res.data.code == 200) {
                    this.init()
                    this.$message.success('添加成功');
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        init() {
            this.$http.get('user').then(res => {
                if (res.data.code == 200) {
                    this.tableData = [...res.data.data]
                    this.tableData.map(item => {
                        item.status = item.status + ""
                        return item
                    })
                    this.$forceUpdate()
                } else {
                    this.$message.error(res.msg);
                }
            })
        },
        handleDelete({ userId }) {
            this.$http.delete(`/user/${userId}`).then(res => {
                this.$message.success({
                    message: res.data.msg,
                    type: 'success'
                })
                this.init()
            })
        }
    }
};
</script>

<style scoped>
.center {
    display: flex;
    height: 100%;
}

.left {
    width: 20%;
    padding: 0 20px;
}

.deptTree {
    margin-top: 20px;
}

.button_row {
    display: flex;
    justify-content: space-between;
}

.table_data {
    margin-top: 20px;
}

.pagin {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>