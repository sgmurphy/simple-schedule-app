import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    if (params.person_id === 'new') {
      return this.store.createRecord('people');
    } else {
      return this.store.findRecord('people', params.person_id);
    }
  }
});
