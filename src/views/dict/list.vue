<template>
    
    <div class="app-container">
        <el-button type="success" @click="exportData">导出字典数据到本地</el-button>
        <el-button type="success" @click="importData">导入本地数据到字典</el-button>
        
        <el-table
        :data="list"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="getChildrens"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column label="名称" width="230" align="left">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>

            <el-table-column label="编码" width="220">
                <template slot-scope="{row}">
                        {{ row.dictCode }}
                </template>
            </el-table-column>
            <el-table-column label="值" width="230" align="left">
                <template slot-scope="scope">
                    <span>{{ scope.row.value }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 导入数据 -->
        <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
        <el-form label-position="right" label-width="170px">

        <el-form-item label="文件">
        <el-upload
        :multiple="false"
        :on-success="onUploadSuccess"
        :action="'http://localhost:8202/admin/cmn/dict/importData'"
        class="upload-demo">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls文件，且不超过500kb</div>
        </el-upload>
        </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">
            取消
        </el-button>
        </div>
        </el-dialog>
    </div>  
</template>
<script>
import dict from "@/api/dict"
export default {
    data(){
        return {
            list: [],
            dialogImportVisible: false
        }
    },
    created(){
        this.getDictList(1);
    }, 
    methods: {
        getDictList(id){
            dict.dictList(id)
                .then(res => {
                    console.log("看看创建时间咋有问题--------------", res)
                    this.list = res.data

                })
        },
        getChildrens(tree, treeNode, resolve){//查询下层级
            dict.dictList(tree.id)
                .then(res => {
                    resolve(res.data)
                })
        },
        exportData(){
            console.log("导出数据到本地---------")
            window.location.href = "http://localhost:8202/admin/cmn/dict/exportData"
        },
        importData(){
            this.dialogImportVisible = true;
        },
        onUploadSuccess(){
            this.dialogImportVisible = false;
            this.getDictList(1);
        }
    }
}
</script>