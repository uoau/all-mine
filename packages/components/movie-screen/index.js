import AmMovieScreen from './index.vue';

AmMovieScreen.install = (Vue) => {
    Vue.component(AmMovieScreen.name, AmMovieScreen);
};

export default AmMovieScreen;
