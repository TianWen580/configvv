<template>
    <view class="NestedCheckbox">
        <view class="roundContainer">
            <view v-for="(key, index) in settings.nestedCheckboxOptions" :key="index" class="selection" @click="handleSelection(key)">
                <label>{{ key }}</label>
            </view>
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
.roundContainer {
    width: 360px;
    background: #fff;
    border: 3px solid lightgray;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    overflow-y: auto;
}

.selection {
    background: #fff;
    color: #000;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid lightgray;
    border-radius: 6px;
    padding: 0 10px;
    width: calc(100% - 20px);
    height: 50px;
    cursor: pointer;
}

.selection:hover {
    background: #326af60e;
    box-shadow: 0 0 6px 1px #3269f6 inset;
}
</style>