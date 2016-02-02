'use strict';

module.exports = {
  tableName: 'users',
  attributes: {
    username: {
      type: 'string',
      columnName: 'username',
      required: true
    },

    registerations:{
      collection: 'registeration',
      via: 'owner'
    },

    createdAt: {
      type: 'datetime',
      columnName: 'created_at',
      required: true,
      defaultsTo: function (){
        return new Date();
      }
    },

    updatedAt: {
      type: 'datetime',
      columnName: 'updated_at',
      defaultsTo: function (){ return new Date(); }
    }
  }
};
