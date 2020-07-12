<!--
 * @Author: xux
 * @Date: 2020-07-07 22:19:30
 * @Description: root component
-->

<template>
    <div id='app' class="app">
        <!-- nav -->
        <div class="app-nav">
            <div class="logo">ALL-MINE</div>
            <div class="search">
                <input type="text" placeholder="Entey something" v-model="search"/>
            </div>
            <div class="list">
                <ul :key="one.name" v-for="one in realNav">
                    <span class="title">{{ one.name }}</span>
                    <li :key="two" v-for="two in one.children">
                        <RouterLink :to="'/'+two">{{ two }}</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
        <!-- main -->
        <div class="app-main">
            <div class="wrap">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script>
import { nav } from './routes';

export default {
    data() {
        return {
            nav,
            search: '',
        };
    },
    computed: {
        realNav() {
            const realNav = [];
            this.nav.forEach((one) => {
                const newChildren = one.children.filter((two) => new RegExp(`${this.search}`).test(two));
                if (newChildren.length > 0) {
                    realNav.push({
                        name: one.name,
                        children: newChildren,
                    });
                }
            });
            return realNav;
        },
    },
};
</script>

<style lang="scss" scoped>
.app {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    &-nav {
        display: flex;
        flex-direction: column;
        width: 260px;
        height: 100%;
        border-right: 1px solid #ccc;
        .logo {
            width: 100%;
            height: 60px;
            padding-left: 25px;
            align-items: center;
            display: flex;
            font-size: 20px;
            font-weight: bold;
        }
        .search {
            height: 40px;
            width: 100%;
            padding: 0 18px;
            input {
                width: 100%;
                height: 30px;
                line-height: 30px;
                padding: 0 10px;
                border: 1px solid #ccc;
                outline: none;
            }
        }
        .list {
            flex: 1;
            overflow: auto;
            ul {
                padding: 0 25px;
                margin-bottom: 20px;
                font-size: 16px;
                line-height: 2;
                .title {
                    font-size: 12px;
                    font-weight: bold;
                    color: #aaa;
                }
                li {
                    text-transform:capitalize;
                    cursor: pointer;
                    font-size: 14px;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
    &-main {
        flex: 1;
        height: 100%;
        background: #F7F8FA;
        padding-left: 100px;
        overflow: auto;
        .wrap {
            width: 750px;
        }
    }
}
</style>
