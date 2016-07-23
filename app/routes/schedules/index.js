import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('schedule').then(function(records) {
      return records.filterBy('isNew', false);
    });
  }
});
