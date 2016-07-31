import Ember from 'ember';

export default Ember.Controller.extend({
  assignmentFrequencies: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  actions: {
    save() {
      this.groups.invoke('save');
      this.model.save();
      this.transitionToRoute('people');
    },
    cancel() {
      window.history.back();
    }
  }
});
