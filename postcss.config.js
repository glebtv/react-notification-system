module.exports = {
  plugins: [
    require('autoprefixer')
  ],
  autoprefixer: { browsers: ['last 10 versions', "ie >= 11", "> 1%"] }
}
