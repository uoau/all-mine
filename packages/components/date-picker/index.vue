<template>
    <div class="am-date-picker">
        <DateBase/>
    </div>
</template>

<script>
import DateBase from './date-base.vue';

export default {
    name: 'AmDatePicker',
    components: {
        DateBase,
    },
    data() {
        return {
            value: '',
        };
    },
};
</script>

<style lang="less">

</style>
