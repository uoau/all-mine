# ALL 显示所有组件

## 基础
::: example
``` html
<div class="row">
    <AmButton>默认按钮</AmButton>
    <AmDivider/>
    <AmButton type="primary">主题色按钮</AmButton>
    <AmDivider/>
    <AmButton type="line-primary">线框主题色按钮</AmButton>
    <AmDivider/>
    <AmButton type="text">文字按钮</AmButton>
    <AmDivider/>
    <AmButton type="primary" icon="edit">图文按钮</AmButton>
    <AmDivider/>
    <AmButton icon="edit"></AmButton>
</div>
<div class="row">
    <AmForm position="right" :label-width="100">
        <AmFormItem label="姓名：" required>
            <AmInput placeholder="请输入" v-model="input"/>
        </AmFormItem>
        <AmFormItem label="性别：">
            <AmRadio v-model="radioValue" :label="1">男</AmRadio>
            <AmDivider/>
            <AmRadio v-model="radioValue" :label="2">女</AmRadio>
        </AmFormItem>
        <AmFormItem label="学历：">
            <AmCheckbox v-model="checkboxValue" :label="1">小学</AmCheckbox>
            <AmDivider/>
            <AmCheckbox v-model="checkboxValue" :label="2">大学</AmCheckbox>
            <AmDivider/>
            <AmCheckbox v-model="checkboxValue" :label="3">硕士</AmCheckbox>
            <AmDivider/>
            <AmCheckbox v-model="checkboxValue" :label="4">研究生</AmCheckbox>
        </AmFormItem>
        <AmFormItem label="接收消息：">
            <AmSwitch v-model="switchValue"></AmSwitch>
        </AmFormItem>
        <AmFormItem label="最爱电影：">
            <AmSelect v-model="select">
                <AmOption :item="{ value: 1,label:'让子弹飞' }">让子弹飞</AmOption>
                <AmOption :item="{ value: 2,label:'肖申克的救赎' }">肖申克的救赎</AmOption>
                <AmOption :item="{ value: 3,label:'没有神知道的世界' }">没有神知道的世界</AmOption>
            </AmSelect>
        </AmFormItem>

        <!-- <AmFormItem label="最爱电影：">
            <AmSelect v-model="select2" multiple>
                <AmOption :item="{ value: 1,label:'让子弹飞' }">让子弹飞</AmOption>
                <AmOption :item="{ value: 2,label:'肖申克的救赎' }">肖申克的救赎</AmOption>
                <AmOption :item="{ value: 3,label:'没有神知道的世界' }">没有神知道的世界</AmOption>
            </AmSelect>
        </AmFormItem>

        <AmFormItem label="选择日期：">
            <AmSelect v-model="select3" multiple>
                <AmOption :item="{ value: 1,label:'让子弹飞' }">让子弹飞</AmOption>
                <AmOption :item="{ value: 2,label:'肖申克的救赎' }">肖申克的救赎</AmOption>
                <AmOption :item="{ value: 3,label:'没有神知道的世界' }">没有神知道的世界</AmOption>
            </AmSelect>
        </AmFormItem> -->

        <AmFormItem label="留言：">
            <AmTextarea autosize v-model="textarea"/>
        </AmFormItem>
    </AmForm>
</div>

<div class="row">
    <AmBreadcrumb>
        <AmBreadcrumbItem>首页</AmBreadcrumbItem>
        <AmBreadcrumbItem>列表页</AmBreadcrumbItem>
        <AmBreadcrumbItem current>详情页</AmBreadcrumbItem>
    </AmBreadcrumb>
</div>

<div class="row">
    <AmTable :data="tableData" :height="200">
        <AmTableColumn type="selection" :width="50"/>
        <AmTableColumn label="姓名" prop="name" />
        <AmTableColumn label="分数">
            <template v-slot:default="item">
                {{ item.score }}分
            </template>
        </AmTableColumn>
    </AmTable>
</div>

<div class="row">
    <AmButton>默认消息</AmButton>
    <AmDivider/>
    <AmButton>成功消息</AmButton>
    <AmDivider/>
    <AmButton>失败消息</AmButton>
    <AmDivider/>
    <AmButton>信息消息</AmButton>
    <AmDivider/>
    <AmButton>警告消息</AmButton>
</div>

<div class="row">
    <AmButton>对话框</AmButton>
</div>

<div class="row">
    <AmButton>任务提示</AmButton>
</div>

<div class="row">
    <AmButton>对话框</AmButton>
</div>

<AmPagination :total="total" :current="current" :page-size="pageSize"/>

<style>
.row {
    display: flex;
    margin-bottom: 24px;
}
</style>

<script>
export default {
    data(){
        return {
            tableData: [
                {name:'小红', score: '100'},
                {name:'小橙', score: '90'},
                {name:'小黄', score: '80'},
                {name:'小绿', score: '70'},
                {name:'小青', score: '60'},
                {name:'小蓝', score: '50'},
                {name:'小紫', score: '40'},
            ],
            total: 1050,
            pageSize: 20,
            current: 5,
            input: '',
            textarea: '',
            radioValue: 1,
            checkboxValue: [],
            switchValue: false,
            select: null,
            select2: [],
            select3: [],
        }
    }
}
</script>
```
:::