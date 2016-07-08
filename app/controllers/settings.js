import Ember from 'ember';

export default Ember.Controller.extend({
  weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  actions: {
    changeMidweekMeeting(day) {
      this.model.set('midweekMeeting', day);
    },
    changeWeekendMeeting(day) {
      this.model.set('weekendMeeting', day);
    },
    save() {
      this.model.save();
    },
    cancel() {
      window.history.back();
    }
  }
});
