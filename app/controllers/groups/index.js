import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    delete(group) {
      this.get('model').removeObject(group);
      group.destroyRecord();
    }
  }
});
