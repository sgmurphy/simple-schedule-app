import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    delete(schedule) {
      this.model.removeObject(schedule);
      schedule.destroyRecord();
    }
  }
});
