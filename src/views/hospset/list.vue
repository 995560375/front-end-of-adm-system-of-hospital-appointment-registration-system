<template>
    <div class="app-container">
        医院设置列表
    </div>
</template>
<script>
import hospset from '@/api/hospset'

export default {
    data(){
        return {
            current:1,
            limit:3,
            searchObj:{},
            list:[]
        }
    },
    created(){
        this.getList();
        console.log('list被创建了-----------------------')
    },
    methods:{
        getList(){
            hospset.getHospSetList(this.current, this.limit, this.searchObj)
                .then(res => {
                    console.log('res------',res)
                })
                .catch(err => {
                    console.log('err----------',err)
                })
        }
    }
}
</script>