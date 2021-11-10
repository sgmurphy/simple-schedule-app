import Controller from '@ember/controller';

export default class extends Controller {
  assignmentFrequencies = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  actions = {
    addUnavailableDate() {
      this.model.get('datesUnavailable').pushObject({ date: null });
    },
    deleteUnavailableDate(date) {
      this.model.get('datesUnavailable').removeObject(date);
    },
    save() {
      this.model.groups.invoke('save');
      this.model.set('email', String(this.model.get('email')).toLowerCase());
      this.model.save();
      this.transitionToRoute('people');
    },
    cancel() {
      window.history.back();
    }
  };
}
