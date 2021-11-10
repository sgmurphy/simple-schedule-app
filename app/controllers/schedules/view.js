import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    print() {
      window.print();
    }
  }
});
