<template>
    <div class="app-container">
       <el-form :inline="true" :model="searchObj" class="demo-form-inline">
            <el-form-item label="医院名字">
                <el-input v-model="searchObj.hosname" placeholder="医院名字"></el-input>
            </el-form-item>
           <el-form-item label="医院编号">
                <el-input v-model="searchObj.hoscode" placeholder="医院编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList()">查询</el-button>
            </el-form-item>
        </el-form>
        <div>
           <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
        </div>
        <!-- banner列表 -->
        <el-table :data="list" stripe style="width: 100%" @selection-change = "handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" width="50" label="序号"/>
            <el-table-column prop="hosname" label="医院名称"/>
            <el-table-column prop="hoscode" label="医院编号"/>
            <el-table-column prop="apiUrl" label="api基础路径" width="200"/>
            <el-table-column prop="contactsName" label="联系人姓名"/>
            <el-table-column prop="contactsPhone" label="联系人手机"/>
            <el-table-column label="状态" width="80">
                
                <template slot-scope="scope">
                        {{ scope.row.status === 1 ? '可用' : '不可用' }}
                </template>
            
            </el-table-column>
            <el-table-column label="操作" width="250">
                
                <template slot-scope="scope">
                        <el-button size="mini" 
                            type="danger" 
                            icon="el-icon-delete" 
                            @click="removeDataById(scope.row.id)"></el-button>
                        <el-button size="mini" 
                            v-if="scope.row.status==1" 
                            type="primary"  
                            @click="lockHospSet(scope.row.id,0)">锁定</el-button>
                        <el-button size="mini" 
                            v-if="scope.row.status==0" 
                            type="danger"  
                            @click="lockHospSet(scope.row.id,1)">取消锁定</el-button>
                        <!-- 分割线 -->
                        <el-divider direction="vertical"></el-divider>
                        <router-link :to="'/hospSet/edit/'+scope.row.id">
                           <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                        </router-link>
                </template>
            
            </el-table-column>
            
        </el-table>
        <el-pagination
          :current-page="current"
          :page-size="limit"
          :total="total"
          style="padding: 30px 0; text-align: center;"
          layout="total, prev, pager, next, jumper"
          @current-change="getList"
        />
    </div>
</template>
<script>
import hospset from '@/api/hospset'

export default {
    data(){
        return { 
            current:1,
            limit:3,
            searchObj:{
                hosname: "",
                hoscode: ""
            },
            list:[],
            total:0,
            multipleSelection: []
        }
    },
    created(){
        this.getList();
        console.log('list被创建了-----------------------')
    },
    methods:{
        getList(page = 1){
            this.current = page;
            console.log("搜索对象-------------", this.searchObj)
            hospset.getHospSetList(this.current, this.limit, this.searchObj)
                .then(res => {
                    console.log('res------',res)
                    this.list = res.data.records;
                    this.total = res.data.total;
                    console.log('res放进list里面了-----------------------',this.list);
                }) 
                .catch(err => {
                    console.log('err----------',err)
                })
        },
        removeDataById(id){
            this.$confirm('此操作将永久删除医院设置信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    hospset.deleteHospSet(id)
                    .then(res => {
                        //alert info
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                        });
                        this.getList(1);
                    })
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
            });
        },
        removeRows(){
            this.$confirm('此操作将永久删除医院设置信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    var idList = [];
                    for(var i = 0; i < this.multipleSelection.length; i++){
                        idList[i] = this.multipleSelection[i].id;
                    }
                    hospset.batchRemoveHospSet(idList)
                    .then(res => {
                        //alert info
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                        });
                        this.getList(1);
                    })
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
            });
        },
        handleSelectionChange(selection){
            this.multipleSelection = selection;
            console.log(this.multipleSelection)
        },
        lockHospSet(id,status){
            hospset.lockHospSet(id,status)
                .then(res => {
                    this.getList();
                })
        }
    }
}
</script>