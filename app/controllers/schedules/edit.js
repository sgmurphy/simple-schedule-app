import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    print() {
      window.print();
    }
  }
});
