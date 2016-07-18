import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('group').then(function(records) {
      return records.filterBy('isNew', false);
    });
  }
});
