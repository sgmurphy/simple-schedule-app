import Controller from '@ember/controller';

export default class extends Controller {
  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  actions = {
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
  };
}
