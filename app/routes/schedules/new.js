import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('schedule');
  },
  afterModel() {
    var self = this;

    this.store.findAll('setting').then(function(results) {
      if (results.get('length')) {
        self.set('settings', results.get('firstObject'));
      }

      self.set('settings', self.store.createRecord('setting').save());
    });
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('settings', this.get('settings'));
  }
});
