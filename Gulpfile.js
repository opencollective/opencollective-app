const SRC_DIR = 'frontend/src';
const DIST_DIR = 'frontend/dist';
const ICONS_SRC_DIR = `${SRC_DIR}/assets/images/icons`;
const ICONS_DIST_DIR = `${DIST_DIR}/images/icons`;

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('build', ['copy-assets', 'resize-icons', 'build:css']);
gulp.task('build:dev', ['copy-assets', 'build:css']);

/**
 * Build css for main or widget
 */
gulp.task('build:css', () => {

  return gulp.src(`${SRC_DIR}/css/*.css`)
    .pipe($.postcss([
      require('postcss-import')(),
      require('postcss-cssnext')(),
      require('postcss-discard-comments')(),
      require('cssnano')(),
    ]))
    .pipe(gulp.dest(`${DIST_DIR}/css`));
});

/**
 * Copy all static assets from ./frontend/src/assets/* to ./frontend/dist/
 * (includes /images, /fonts, /robots.txt)
 */
gulp.task('copy-assets', () => {
  return gulp.src([`${SRC_DIR}/assets/**/*`])
    .pipe($.changed(DIST_DIR))
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task('watch', () => {
  gulp.watch(`${SRC_DIR}/assets/**/*`, ['copy-assets']);
  gulp.watch(`${ICONS_SRC_DIR}/*.png`, ['resize-icons']);
  gulp.watch(`${SRC_DIR}/css/**/*.css`, ['build:css']);
});

/**
 * Resizes the OpenCollective icon for the homescreen and startup screen for different resolutions
 * Source icon: ./frontend/src/assets/icons/icon-512px.png
 * Source startup screen: ./frontend/src/assets/icons/startup-536x2208.png
 *
 * Requires `sharp` (already installed on most Linux distributions)
 * Installation instructions for MacOSX: http://sharp.dimens.io/en/stable/install/
 * $> brew update && brew install homebrew/science/vips --with-imagemagick --with-webp
 */
gulp.task('resize-icons', () => {
  return gulp
    .src(`${ICONS_SRC_DIR}/*.png`)
    .pipe($.responsive({
      'startup-1536x2208.png': [{
        width: 1536,
        height: 2008,
        rename: { basename: 'startup', suffix: '-1536x2008px' },
      }, {
        width: 1496,
        height: 2048,
        rename: { basename: 'startup', suffix: '-1496x2048px' },
      }, {
        width: 768,
        height: 1004,
        rename: { basename: 'startup', suffix: '-768x1004px' },
      }, {
        width: 748,
        height: 1024,
        rename: { basename: 'startup', suffix: '-748x1024px' },
      }, {
        width: 1242,
        height: 2148,
        rename: { basename: 'startup', suffix: '-1242x2148px' },
      }, {
        width: 1182,
        height: 2208,
        rename: { basename: 'startup', suffix: '-1182x2208px' },
      }, {
        width: 750,
        height: 1294,
        rename: { basename: 'startup', suffix: '-750x1294px' },
      }, {
        width: 640,
        height: 1096,
        rename: { basename: 'startup', suffix: '-640x1096px' },
      }, {
        width: 640,
        height: 920,
        rename: { basename: 'startup', suffix: '-640x920px' },
      }, {
        width: 320,
        height: 460,
        rename: { basename: 'startup', suffix: '-320x460px' },
      }],
      'icon-512px.png': [{
        width: 152,
        height: 152,
        rename: { basename: 'icon', suffix: '-152px' },
      }, {
        width: 144,
        height: 144,
        rename: { basename: 'icon', suffix: '-144px' },
      }, {
        width: 120,
        height: 120,
        rename: { basename: 'icon', suffix: '-120px' },
      }, {
        width: 114,
        height: 114,
        rename: { basename: 'icon', suffix: '-114px' },
      }, {
        width: 72,
        height: 72,
        rename: { basename: 'icon', suffix: '-72px' },
      }, {
        width: 57,
        height: 57,
        rename: { basename: 'icon', suffix: '-57px' },
      }],
    }, {
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Strip all metadata
      withMetadata: false,
      errorOnUnusedImage: false
    }))
    .pipe(gulp.dest(ICONS_DIST_DIR));
});
