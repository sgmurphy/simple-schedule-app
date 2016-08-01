import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

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

export default Router;
