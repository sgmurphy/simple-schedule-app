import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save() {
      this.model.save();
      this.transitionToRoute('groups');
    },
    cancel() {
      window.history.back();
    }
  }
});
