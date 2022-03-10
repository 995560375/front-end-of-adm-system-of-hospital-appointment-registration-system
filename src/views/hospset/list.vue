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
            list:[],
            total:0
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
                    this.list = res.data.records;
                    this.total = res.data.total;
                    console.log('res放进list里面了-----------------------',this.list);
                })
                .catch(err => {
                    console.log('err----------',err)
                })
        }
    }
}
</script>