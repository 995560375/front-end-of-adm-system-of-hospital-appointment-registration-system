<template>
    <div class="app-container">
        
        
        <el-form label-width="120px">
             <el-form-item label="医院名称">
                <el-input v-model="hospitalSet.hosname"/>
             </el-form-item>
             <el-form-item label="医院编号">
                <el-input v-model="hospitalSet.hoscode"/>
             </el-form-item>
             <el-form-item label="api基础路径">
                <el-input v-model="hospitalSet.apiUrl"/>
             </el-form-item>
             <el-form-item label="联系人姓名">
                <el-input v-model="hospitalSet.contactsName"/>
             </el-form-item>
             <el-form-item label="联系人手机">
                <el-input v-model="hospitalSet.contactsPhone"/>
             </el-form-item>
             <el-form-item>
                <el-button type="primary" @click="saveOrUpdate">保存</el-button>
             </el-form-item>
         </el-form>
    </div>
</template>
<script>
import hospset from '@/api/hospset'
export default {
    data() {
        return {
            hospitalSet:{

            }
        }
    },
    created(){
        //获取id值
        //调用接口得到设置信息
        // const id = this.$router.params.id;
        // alert(1)
        if(this.$route.params && this.$route.params.id){
            const id = this.$route.params.id;
            // alert(id)
            this.getHospSet(id);
        }
    },
    methods: {
        getHospSet(id){
            hospset.getHospSet(id)
                .then(res => {
                    // console.log("fanhuiid---------", res.data.id)
                    this.hospitalSet = res.data;
                })
        },
        save(){
            hospset.saveHospitalSet(this.hospitalSet)
                .then(res => {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                        });
                })
                //跳转页面，使用路由跳转方式跳转
                this.$router.push({path:'/hospSet/list'})
        },
        update(){
            hospset.updateHospitalSet(this.hospitalSet)
                .then(res => {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                        });
                })
                //跳转页面，使用路由跳转方式跳转
                this.$router.push({path:'/hospSet/list'})
        },
        saveOrUpdate(){
            if(!this.hospitalSet.id){
                this.save();
            }else {
                this.update();
            }
        }
    }
}
</script>


