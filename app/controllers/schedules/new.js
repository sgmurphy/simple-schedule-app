import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  actions: {
    save() {
      var date = moment(this.model.get('startDate'));

      // Loop through days between startDate and endDate
      while (date.isSameOrBefore(this.model.get('endDate'))) {
        // Check if current date matches a meeting day
        if (date.day() === this.settings.get('midweekMeeting') || date.day() === this.settings.get('weekendMeeting')) {
          // Create a new date model and attach it to this schedule
          this.get('store').createRecord('date', {
            schedule: this.model,
            date: date.format('YYYY-MM-DD')
          }).save();

          // Make assignments
        }

        date.add(1, 'days');
      }

      this.model.save();
      this.transitionToRoute('schedules.edit', this.model);
    },
    cancel() {
      window.history.back();
    }
  }
});
