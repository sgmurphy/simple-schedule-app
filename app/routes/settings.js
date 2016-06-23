import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var store = this.store;

    return this.store.findAll('settings').then(function(results) {
      if (results.get('length')) {
        return results.get('firstObject');
      }

      return store.createRecord('settings', {});
    });
  }
});
