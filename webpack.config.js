const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    /* Aquí indicamos el elemento inicial de nuestra app.
    O sea, nuestro punto de entrada */
    entry: './src/index.js',

    /* Ahora indicamos cual va a ser el archivo de salida,
    donde va a estar todo el código que compile */
    output: {
        /* Aquí indicamos donde queremos que se guarde el proyecto */
        path: path.resolve(__dirname, 'dist'),
        /* Y colocamos el nombre del .js que va guardar */
        filename: '[name].[contenthash].js',
        // EL NOMBRE DEL ARCHIVO FINAL,
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },

    /* Vamos a indicar con extensiones vamos a trabajar en
    este proyecto */
    resolve: {
        /* Importante pasar las extensiones con las que vamos a
        trabajar, como .jsx (React.js)  */
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname,'src/utils/'),
            '@templates': path.resolve(__dirname,'src/templates/'),
            '@styles': path.resolve(__dirname,'src/styles/'),
            '@images': path.resolve(__dirname,'src/assets/images/'),
        }
    },
    module: {
        rules: [
          {
            // Test declara que extensión de archivos aplicara el loader
            test: /\.m?js$/,
            // Exclude permite omitir archivos o carpetas especificas
             exclude: /node_modules/,
            // Use es un arreglo u objeto donde dices que loader aplicaras
            use: {
              loader: "babel-loader"
            }

          },
          {
           test: /\.css|.styl$/i,
           use: [MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader'
        ],   
          },
          {
            test: /\.png/,
            type: 'asset/resource'  
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: "asset/resource",
            generator: {
              filename: "assets/fonts/[name][contenthash].[ext]",
            },
          }
        ]
      },
      plugins: [
          new HtmlWebpackPlugin({
              inject: true,
              template: './public/index.html',
              filename: './index.html'
          }),
          new MiniCssExtractPlugin({
              filename: 'assets/[name].[contenthash].css'
          }),
          new CopyPlugin({
              patterns: [
                  {
                   from: path.resolve(__dirname,"src", "assets/images"),
                   to: "assets/images"
                  }
              ]
          }),
          new Dotenv(),
          new CleanWebpackPlugin(),
      ],
      optimization: {
        minimize: true,
        }
    }
