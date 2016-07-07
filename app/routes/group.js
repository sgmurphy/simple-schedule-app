import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    if (params.group_id === 'new') {
      return this.store.createRecord('groups');
    } else {
      return this.store.findRecord('groups', params.group_id);
    }
  }
});
