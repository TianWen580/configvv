<template>
    <view class="NestedCheckbox">
        <view v-for="(key, index) in settings.nestedCheckboxOptions" :key="index" class="selection" @click="handleSelection(key)">
            <label>{{ key }}</label>
        </view>
    </view>
</template>

<script>
export default {
    name: 'NestedCheckbox',
    computed: {
        visualize() {
            return this.$store.state.visualize;
        },
        settings() {
            return this.$store.state.settings;
        },
    },
    methods: {
        handleSelection(key) {
            this.$store.commit('visualize/setShowCheckbox', false);
            this.$store.commit('settings/setNestedCheckboxSelectedValue', key);
        }
    }
};
</script>

<style scoped>
.selection {
    background: #f0f0f0;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid lightgray;
    width: 300px;
    height: 50px;
    padding: 10px 20px;
    cursor: pointer;
}

.selection:hover {
    background: #e0e0e0;
    box-shadow: 0 0 0 1px #3269f6 inset;
}
</style>