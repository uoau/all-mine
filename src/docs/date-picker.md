# 日期选择器 Date Picker

# 用法
::: demo
``` html
年 <AmDatePicker type="year" v-model="date1" :disabled-date="disabledDate"/><br/>
月 <AmDatePicker type="month" v-model="date2" :disabled-date="disabledDate"/><br/>
日 <AmDatePicker type="day" @focus="onFocus" @blur="onBlur" @change="onChange" v-model="date3" :disabled-date="disabledDate"/><br/>
日时间 <AmDatePicker type="dayTime" v-model="date4" :limit="['2020-02-02 10:33:33','2020-12-12 12:23:22']" :disabled-date="disabledDate" :disabled-hour="disabledHour" :disabled-minute="disabledMinute"/><br/>
年范围 <AmDatePicker type="yearRange" v-model="date5" style="width: 500px"/><br/>
月范围 <AmDatePicker type="monthRange" v-model="date6"/><br/>
日范围 <AmDatePicker type="dayRange" v-model="date7"/><br/>
日时间范围 <AmDatePicker type="dayTimeRange" v-model="date8"/><br/>
<script>
export default {
    data(){
        return {
            date1: '2021',
            date2: 1612345700561,
            date3: new Date(),
            date4: '2021-03-22 12:22:22',
            date5: '',
            date6: '',
            date7: '',
            date8: '',
            disabledDate: (dateValue)=>{
                if(dateValue > new Date('2021-02-06').getTime() &&  dateValue < new Date('2021-02-08').getTime()){
                    return '不可以选择当前日期';
                }
                if(dateValue > new Date('2021-02-10').getTime() &&  dateValue < new Date('2021-02-13').getTime()){
                    return '不可以选择当前日期';
                }
            },
            disabledHour: (dateHourValue)=> {
                if(new Date(dateHourValue).getHours() < 10){
                    return true;
                }
            },
            disabledMinute: (dateHourMinuteValue)=> {
                if(new Date(dateHourMinuteValue).getHours() === 10 &&new Date(dateHourMinuteValue).getMinutes() < 50 ){
                    return true;
                }
            },
        }
    },
    methods: {
        onFocus(){
            console.log('聚焦了');
        },
        onBlur(){
            console.log('失焦了');
        },
        onChange(){
            console.log('值发生变化了');
        }
    }
}
</script>
```
:::