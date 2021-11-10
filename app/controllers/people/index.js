import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    delete(person) {
      this.model.removeObject(person);
      person.destroyRecord();
    }
  }
});
