var webpack=require('webpack');
var path=require('path'),
    node_modules=path.resolve(__dirname,'node_modules');
//var pathToReact=path.resolve(node_modules,'react/dist/react.min.js');
var commonsPlugin=new webpack.optimize.CommonsChunkPlugin({
    filename:"common.js",
    name:"commons"
});

//public path
const ASSET_PATH=process.env.ASSET_PATH||'/public';

var pluginLoader=new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
        context: __dirname
    }
})
//commonjs 规范,因为属于node后端的模块
module.exports={
    entry:{
        index:'./src/entry.js'
    }/*,
    resolve:{
        alias:{
            'react':pathToReact
        }
    }*/,
    output:{
        path:path.join(__dirname,"dist"),
        filename:"[name].bundle.js",
        chunkFilename:"[id].chunk.js"
    },

    //devtool:'inline-source-map',
    devServer:{
        //hot:true,
        contentBase:path.resolve(__dirname,'dist'),
        inline:true
    },
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:'style-loader!css-loader?modules',
            },
            {
                test:/\.scss$/,
                use:[{loader:"style-loader"}, //create style node from js strings 
                {loader:"css-loader"}, //translate css into Commonjs
                {loader:"sass-loader"} //compile Sass to css
                ]
            },
            {
                test:/\.jsx?$/,
                loader:'babel-loader',  //loader babel ,
                query:{
                    presets:['react','env']
                }
            },
            {
                test:/\.(png|jpg)$/,
                use:'url-loader?limit=40000'
            }
        ],
        
    },
    plugins:[commonsPlugin,
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH':JSON.stringify(ASSET_PATH)
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('production')
        })

    ]
} 