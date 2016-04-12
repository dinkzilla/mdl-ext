const posthtml = require('gulp-posthtml');
const gulp = require('gulp');

gulp.task('build-demo', function() {
  const plugins = [
    require('posthtml-include')({
      encoding: 'utf-8',
      root: './src/demo/'
    })
  ];

  return gulp.src('./src/demo/*.html')
    .pipe(posthtml(plugins))
    .pipe(gulp.dest('./demo'));
});
