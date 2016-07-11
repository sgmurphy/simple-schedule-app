import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    if (params.person_id === 'new') {
      return this.store.createRecord('person', {
        assignmentFrequency: 0
      });
    } else {
      return this.store.findRecord('person', params.person_id);
    }
  },
  afterModel() {
    var self = this;
    this.store.findAll('group').then(function(result) {
      self.set('groups', result);
    });
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('groups', this.get('groups'));
  }
});
