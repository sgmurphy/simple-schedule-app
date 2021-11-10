import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    delete(group) {
      this.model.removeObject(group);
      group.destroyRecord();
    }
  }
});
