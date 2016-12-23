const path = require('path');
const webpack = require('webpack');
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor1',
    filename: 'vendor1.js'
});
const UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
    }
});
module.exports = {
    watch: true,
    entry: {
        vendor1: ['react', 'react-dom'],
        'mod-manage': 'mod-manage',
        'user-logs': 'user-logs',
        'early-warning': 'early-warning',
        'query-statistics': 'query-statistics',
        'statistic-details': 'statistic-details',
        'user-info':'user-info',
        'apply-company':'apply-company',
        'business-list':'business-list',
        'create-company':'create-company',
        'reset-password':'reset-password',
        'login':'login'
    },
    output: {
     //   path: 'dist',
        filename: '[name].js',
        publicPath: "",
        chunkFilename: "[name].chunk.js",
        externals: [
            {
                'es5-shim': true,
                'es5-sham': true
            }
        ]
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.js', '.jsx'],
        alias: {
            // common
            'util': 'js/app/util',
            'base': 'css/base.scss',
            'normalize': 'css/normalize.scss',
            'actions': 'js/redux/actions',
            'reducers': 'js/redux/reducers',

            // page
            'login':'js/page/login/login.js',
            'login.scss':'js/page/login/login.scss',
            'mod-manage': 'js/page/mod-manage/mod-manage.js',
            'mod-manage.scss': 'js/page/mod-manage/mod-manage.scss',
            'early-warning': 'js/page/early-warning/early-warning.js',
            'early-warning.scss': 'js/page/early-warning/early-warning.scss',
            'query-statistics': 'js/page/query-statistics/query-statistics.js',
            'query-statistics.scss': 'js/page/query-statistics/query-statistics.scss',
            'statistic-details': 'js/page/statistic-details/statistic-details.js',
            'statistic-details.scss': 'js/page/statistic-details/statistic-details.scss',
            'user-logs': 'js/page/user-logs/user-logs.js',
            'user-logs.scss': 'js/page/user-logs/user-logs.scss',
            'business-list':'js/page/business-list/business-list.js',
            'business-list.scss':'js/page/business-list/business-list.scss',
            'create-company':'js/page/create-company/create-company.js',
            'create-company.scss':'js/page/create-company/create-company.scss',
            'user-info':'js/page/user-info/user-info',
            'user-info.scss':'js/page/user-info/user-info.scss',
            'apply-company':'js/page/apply-company/apply-company',
            'apply-company.scss':'js/page/apply-company/apply-company.scss',
            'reset-password':'js/page/reset-password/reset-password.js',
            'reset-password.scss':'js/page/reset-password/reset-password.scss',

            //actions-components
            'boxy-actions': 'js/components/boxy/actions.js',
            'btn-group-actions': 'js/components/btn-group/actions.js',
            'info-form-actions': 'js/components/info-form/actions.js',
            'left-nav-actions': 'js/components/left-nav/actions.js',
            'list-frame-actions': 'js/components/list-frame/actions.js',
            'mask-actions': 'js/components/mask/actions.js',
            'query-box-actions': 'js/components/query-box/actions.js',
            'tabs-actions': 'js/components/tabs/actions.js',
            'user-info-actions': 'js/components/user-message/actions.js',
            'user-message-actions': 'js/components/user-message/actions.js',
            'table-actions': 'js/components/table/actions.js',

            //actions-page
            'login-actions':'js/page/login/actions.js',
            'business-list-actions': 'js/page/business-list/actions.js',
            'create-company-actions':'js/page/create-company/actions.js',
            'user-info-actions': 'js/page/user-info/actions.js',
            'apply-company-actions': 'js/page/apply-company/actions.js',
            'reset-password-actions':'js/page/reset-password/actions.js',
            'mod-manage-actions': 'js/page/mod-manage/actions.js',
            'early-warning-actions': 'js/page/early-warning/actions.js',
            'user-logs-actions': 'js/page/user-logs/actions.js',
            'query-statistics-actions': 'js/page/query-statistics/actions.js',
            'statistic-details-actions': 'js/page/statistic-details/actions.js',

            // components
            'pages': 'js/components/pages/pages.js',
            'pages.scss': 'js/components/pages/pages.scss',
            'left-nav': 'js/components/left-nav/left-nav.js',
            'left-nav.scss': 'js/components/left-nav/left-nav.scss',
            'header': 'js/components/header/header.js',
            'header.scss': 'js/components/header/header.scss',
            'dropdown-menu': 'js/components/dropdown-menu/dropdown-menu.js',
            'dropdown-menu.scss': 'js/components/dropdown-menu/dropdown-menu.scss',
            'boxy': 'js/components/boxy/boxy.js',
            'boxy.scss': 'js/components/boxy/boxy.scss',
            'mask': 'js/components/mask/mask.js',
            'mask.scss': 'js/components/mask/mask.scss',
            'info-form': 'js/components/info-form/info-form.js',
            'info-form.scss': 'js/components/info-form/info-form.scss',
            'btn-group': 'js/components/btn-group/btn-group.js',
            'btn-group.scss': 'js/components/btn-group/btn-group.scss',
            'table': 'js/components/table/table.js',
            'table.scss': 'js/components/table/table.scss',
            'query-box': 'js/components/query-box/query-box.js',
            'query-box.scss': 'js/components/query-box/query-box.scss',
            'left-nav': 'js/components/left-nav/left-nav.js',
            'left-nav.scss': 'js/components/left-nav/left-nav.scss',
            'date-picker':'js/components/date-picker/date-picker.js',
            'date-picker.scss':'js/components/date-picker/date-picker.scss',
            'create-sample':'js/components/create-sample/create-sample.js',
            'create-sample.scss':'js/components/create-sample/create-sample.scss',
            'create-models':'js/components/create-models/create-models.js',
            'create-models.scss':'js/components/create-models/create-models.scss',
            'list-frame':'js/components/list-frame/list-frame.js',
            'list-frame.scss':'js/components/list-frame/list-frame.scss',
            'user-message':'js/components/user-message/user-message.js',
            'user-message.scss':'js/components/user-message/user-message.scss',
            'breadcrumb': 'js/components/breadcrumb/breadcrumb.js',
            'breadcrumb.scss': 'js/components/breadcrumb/breadcrumb.scss',
            'tabs': 'js/components/tabs/tabs.js',
            'tabs.scss': 'js/components/tabs/tabs.scss',
            'progress-bar': 'js/components/progress-bar/progress-bar.js',
            'progress-bar.scss': 'js/components/progress-bar/progress-bar.scss',
            'chart-bar': 'js/components/chart-bar/chart-bar.js',
            'chart-bar.scss': 'js/components/chart-bar/chart-bar.scss',
            'chart-bargroup': 'js/components/chart-bargroup/chart-bargroup.js',
            'chart-bargroup.scss': 'js/components/chart-bargroup/chart-bargroup.scss',
            'table-plugins': 'js/components/table-plugins/table-plugins.js',
            'table-plugins.scss': 'js/components/table-plugins/table-plugins.scss',
            'go-email':'js/components/go-email/go-email.js',
            'go-email.scss':'js/components/go-email/go-email.scss',
            'forget-password':'js/components/forget-password/forget-password.js',
            'forget-password.scss':'js/components/forget-password/forget-password.scss',
            'company-form': 'js/components/company-form/company-form.js',
            'company-form.scss': 'js/components/company-form/company-form.scss',
            'modify-password':'js/components/modify-password/modify-password.js',
            'modify-password.scss':'js/components/modify-password/modify-password.scss',
        }

    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: '/node_modules/',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|ttf|eot)$/i,
                loaders: ['url-loader?limit=1000&name=[path][name][hash:8].[ext]', 'img?minimize']
            },
            {
                test: /\.(scss|css)/,
                loaders: ['style', 'css', 'autoprefixer-loader', 'sass']
            },
            {test: /\.js$/, loader: "eslint-loader", exclude: [/node_modules/, /js\/lib/]}
        ],
        noParse: []
    },
    plugins: [
        commonsPlugin],
    imagemin: {
        gifsicle: {interlaced: false},
        jpegtran: {
            progressive: true,
            arithmetic: false
        },
        optipng: {optimizationLevel: 5},
        pngquant: {
            floyd: 0.5,
            speed: 2
        },
        svgo: {
            plugins: [
                {removeTitle: true},
                {convertPathData: false}
            ]
        }
    },
    eslint: {
        configFile: '.eslintrc',
        ignorePath: '.eslintignore'
    }
};
