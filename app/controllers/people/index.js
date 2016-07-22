import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    delete(person) {
      this.get('model').removeObject(person);
      person.destroyRecord();
    }
  }
});
