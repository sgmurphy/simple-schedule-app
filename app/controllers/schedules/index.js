import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    delete(schedule) {
      this.get('model').removeObject(schedule);
      schedule.destroyRecord();
    }
  }
});
