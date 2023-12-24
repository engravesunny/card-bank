<template>
    <div class="service">
        <Container>
            <template #conatiner>
                <curConfig.main>
                    <template #result>
                        <div v-html="resultContent"></div>
                    </template>
                </curConfig.main>
            </template>
        </Container>
        <div class="siderBar">
            <Button v-for="item in curConfig.left.value || curConfig.left" :title="'<- ' + item.label"
                :callback="item.cb"></Button>
        </div>
        <div class="buttons">
            <Button v-for="item in curConfig.right" :title="item.label + ' ->'" :callback="item.cb"></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Container from '../../components/Container.vue'
import Button from '../../components/Button.vue'
import { curConfig, resultContent } from './Hook/init';

</script>

<style lang="less" scoped>
.siderBar,
.buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    min-height: 100px;
    position: fixed;
    bottom: 10px;
    left: -10px;
    gap: 20px;
}

.buttons {
    left: unset;
    right: 5px;
    bottom: 10px;
}
</style>