import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    if (params.schedule_id === 'new') {
      return this.store.createRecord('schedule');
    } else {
      return this.store.findRecord('schedule', params.schedule_id);
    }
  },
  afterModel() {
    var self = this;
    this.store.findAll('person').then(function(result) {
      self.set('people', result);
    });

    this.store.findAll('group').then(function(result) {
      self.set('groups', result);
    });

    this.store.findAll('setting').then(function(results) {
      if (results.get('length')) {
        self.set('settings', results.get('firstObject'));
      } else {
        self.set('settings', self.store.createRecord('setting').save());
      }
    });
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('people', this.get('people'));
    controller.set('groups', this.get('groups'));
    controller.set('settings', this.get('settings'));
  }
});
