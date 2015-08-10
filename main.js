require.config({
    paths: {
        'angular': 'bower_components/angular/angular',
        'angular-route': 'bower_components/angular-route/angular-route',
        'angular-translate': 'bower_components/angular-translate/angular-translate',
        'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize',
        'angular-bootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'Rx' : 'bower_components/rxjs/dist/rx.lite',
        'lodash' : 'bower_components/lodash/lodash'
    },

    shim: {
        'angular': {
            exports: 'angular'
        },

        'angular-route': {
            deps: ['angular']
        },

        'angular-translate': {
            deps: ['angular']
        },

        'angular-sanitize': {
            deps: ['angular']
        },

        'angular-bootstrap': {
            deps: ['angular']
        }
    }
});

require(['angular', 'example.app'], function(ng) {
    return ng.bootstrap(document, ['example.app']);
});
