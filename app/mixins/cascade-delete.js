import Ember from 'ember';

export default Ember.Mixin.create({
  deleteRecord(store, type, snapshot) {
    let recordsToUnload = [];

    // collect all records to unload into recordsToUnload variable
    snapshot.record.eachRelationship((name, descriptor) => {
      let { options, kind } = descriptor;
      let relationshipName = descriptor.key;

      if (options.cascadeDelete && kind === 'hasMany') {
        let hasManyRecords = snapshot.record.hasMany(relationshipName).value().toArray();
        recordsToUnload = recordsToUnload.concat(hasManyRecords);
      }

      if (options.cascadeDelete && kind === 'belongsTo') {
        let belongsToRecords = snapshot.record.belongsTo(relationshipName).value();
        recordsToUnload = recordsToUnload.concat([ belongsToRecords ]);
      }
    });

    return this._super(...arguments).then((response) => {
      recordsToUnload.forEach((childRecord) => {
        store.unloadRecord(childRecord);
      });

      return response;
    });
  }
});
