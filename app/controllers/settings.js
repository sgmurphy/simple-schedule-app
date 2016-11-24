import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  actions: {
    changeMidweekMeeting(day) {
      this.model.set('midweekMeeting', day);
    },
    changeWeekendMeeting(day) {
      this.model.set('weekendMeeting', day);
    },
    save() {
      var flashMessages = this.get('flashMessages');

      this.model.save().then(function() {
        flashMessages.success('Settings saved!');
      }).catch(function(reason) {
        flashMessages.danger('There was an error processing your request. Please try again.');
      });
    },
    cancel() {
      window.history.back();
    }
  }
});
