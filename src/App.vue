<template>
    <div id='app' class="app">
        <!-- nav -->
        <div class="app-nav">
            <div class="logo">
                <span>ALL-MINE</span>
                <i>统统都是我的</i>
            </div>
            <div class="search">
                <input type="text" placeholder="Search" v-model="search"/>
            </div>
            <div class="list">
                <ul :key="one.name" v-for="one in realNav">
                    <span class="title">{{ one.name }}</span>
                    <li
                        :key="two.name"
                        v-for="two in one.children"
                        :class="nowNavName == two.name ? 'active' : ''"
                    >
                        <RouterLink :to="'/'+two.name">
                            <span>{{ two.name }}</span>
                            <i>{{ two.cnName }}</i>
                        </RouterLink>
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
import '../packages/stylesheet/reset.css';
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
                const newChildren = one.children.filter((two) => new RegExp(`${this.search}`).test(two.name + two.cnName));
                if (newChildren.length > 0) {
                    realNav.push({
                        name: one.name,
                        children: newChildren,
                    });
                }
            });
            return realNav;
        },
        nowNavName() {
            const res = this.$route.path.match(/([^/]*)$/);
            return res ? res[1] : '';
        },
    },
};
</script>

<style lang="less" scoped>
.app {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    min-width: 1300px;
    &-nav {
        display: flex;
        flex-direction: column;
        width: 260px;
        height: 100%;
        border-right: 1px solid #e5e5e5;
        .logo {
            width: 100%;
            height: 80px;
            padding-left: 25px;
            display: flex;
            font-size: 20px;
            font-weight: bold;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: center;
            span {
                margin-bottom: 5px;
            }
            i {
                font-size: 14px;
            }
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
                border: 1px solid #e5e5e5;
                outline: none;
                font-size: 14px;
            }
        }
        .list {
            flex: 1;
            overflow: auto;
            padding-bottom: 50px;
            ul {
                margin-bottom: 20px;
                font-size: 16px;
                line-height: 2;
                .title {
                    font-size: 12px;
                    font-weight: bold;
                    color: #aaa;
                    padding: 0 25px;
                }
                li {
                    a {
                        display: flex;
                        padding: 10px 25px;
                        cursor: pointer;
                        font-size: 14px;
                        span {
                            margin-right: 6px;
                            line-height: 10px;
                            display: inline-flex;
                        }
                        i {
                            font-size: 13px;
                            line-height: 12px;
                            display: inline-flex;
                            color: #666;
                        }
                        &:hover {
                            background: #f7f7f7;
                        }
                    }
                    &.active {
                        background: #eee;
                    }
                }
            }
        }
        ::-webkit-scrollbar {
            display: none;
            width: 0;
        }
    }
    &-main {
        flex: 1;
        height: 100%;
        background: #fff;
        padding-left: 100px;
        overflow: auto;
        .wrap {
            width: 750px;
        }
    }
}
</style>
