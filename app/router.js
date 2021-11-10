import EmberRouter from '@ember/routing/router';
import config from 'simple-schedule-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('schedules', function() {
    this.route('edit', { path: '/:schedule_id' });
    this.route('view', { path: '/:schedule_id/view' });
  });
  this.route('people', function() {
    this.route('edit', { path: '/:person_id' });
  });
  this.route('groups', function() {
    this.route('edit', { path: '/:group_id' });
  });
  this.route('settings');
});