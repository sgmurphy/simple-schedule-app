import LSAdapter from 'ember-localstorage-adapter';
import CascadeDeleteMixin from './../mixins/cascade-delete';

export default LSAdapter.extend(CascadeDeleteMixin, {
  namespace: 'the-scheduler'
});
