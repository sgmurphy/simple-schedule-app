import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('settings');
  this.route('people');
  this.route('person', { path: '/person/:person_id' });
});

export default Router;
