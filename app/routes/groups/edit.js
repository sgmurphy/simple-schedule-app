import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    if (params.group_id === 'new') {
      return this.store.createRecord('group');
    } else {
      return this.store.findRecord('group', params.group_id);
    }
  }
});
