//noinspection JSLint
module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            dist: {
                files: {
                    "src/css/main.css": "src/less/main.less"
                }
            }
        },
        uncss: {
            dist: {
                options: {
                    ignore: [
                        // needed for Bootstrap's transitions
                        ".fade",
                        ".fade.in",
                        ".collapse",
                        ".collapse.in",
                        ".collapsing",
                        /\.open/
                    ]
                },
                files: {
                    "web/css/main.min.css": ["src/html/index.html"]
                }
            }
        },
        cssmin: {
            dist: {
                options: {
                    keepSpecialComments: false
                },
                files: {
                    "web/css/main.min.css": ["web/css/main.min.css"]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    "web/scripts/main.min.js": ["src/scripts/jquery.js", "src/scripts/dropdown.js"]
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    "web/html/index.html": "src/html/index.html"
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    "web/html/index.html": "web/html/index.html"
                }
            }
        },
        imagemin: {
            dist: {
                options: {
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'web/images'
                }]
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/fonts',
                        src: ['*.{otf,eot,svg,ttf,woff,woff2}'],
                        dest: 'web/fonts',
                        filter: 'isFile'
                    }
                ]
            }
        }
    });
    grunt.registerTask('compile', ['newer:less', 'newer:uncss', 'cssmin', 'newer:uglify',
        'newer:processhtml:dist', 'newer:htmlmin', 'newer:imagemin', 'newer:copy']);
    grunt.registerTask('default', ['less']);
};