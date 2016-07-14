import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('people');
  this.route('person', { path: '/people/:person_id' });
  this.route('groups');
  this.route('group', { path: '/groups/:group_id' });
  this.route('settings');
  this.route('schedule', { path: '/new' });
});

export default Router;
