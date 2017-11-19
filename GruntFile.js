module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  // noinspection Annotator
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
      },
      files: {
        expand: true,
        src: ['./src/**/*.js'],
        ext: '.js',
        dest: './dist/',
      },
    },
  });
  grunt.registerTask('default', ['babel']);
};
