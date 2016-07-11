import Ember from 'ember';

export default Ember.Controller.extend({
  assignmentFrequencies: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  actions: {
    changeGroups(element) {
      var controller = this;
      var groups = [];
      $(":selected", element).each(function() {
        groups.push(controller.store.peekRecord('group', $(this).val()));
      });

      this.model.set('groups', groups);
    },
    changeAssignmentFrequency(freq) {
      this.model.set('assignmentFrequency', freq);
    },
    save() {
      this.model.save();
      this.transitionToRoute('people');
    },
    cancel() {
      window.history.back();
    }
  }
});
