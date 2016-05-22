import Ember from 'ember';

var settings = {
  midweek_meeting: 'Wednesday',
  weekend_meeting: 'Saturday'
};

export default Ember.Route.extend({
  model() {
    return settings;
  }
});
