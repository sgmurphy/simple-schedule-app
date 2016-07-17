import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('person').then(function(records) {
      return records.filterBy('isNew', false);
    });
  }
});
