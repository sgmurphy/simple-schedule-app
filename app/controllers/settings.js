import Ember from 'ember';

export default Ember.Controller.extend({
  weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  actions: {
    changeMidweekMeeting(day) {
      this.model.set('midweek_meeting', day);
      this.model.save();
    },
    changeWeekendMeeting(day) {
      this.model.set('weekend_meeting', day);
      this.model.save();
    }
  }
});
