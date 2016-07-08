import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save() {
      this.model.save();
      this.transitionToRoute('people');
    },
    cancel() {
      window.history.back();
    }
  }
});
