import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    delete(person) {
      person.destroyRecord();
    }
  }
});
