module.exports = {
    cradle: {
        images: {
            src: './frontend/img/',
            dest: './public/frontend/img/'
        },
        css: {
            entry: './frontend/scss/style.scss',
            output: 'css/styles.css',
            watch: './frontend/scss/**/*.scss'
        },
        destination: 'public/frontend/',
        source: 'frontend/',
        stylelint: './frontend/scss/**/*.scss'
    },
    webpack: {
        entry: './frontend/js/app.js',
        output: {
            path: 'public/frontend',
            filename: 'js/scripts.js'
        }
    }
};
