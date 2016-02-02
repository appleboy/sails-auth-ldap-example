'use strict';

var moment = require('moment');

var time = [];
time[1] = '18:00 ~ 1900';
time[2] = '19:00 ~ 2000';
time[3] = '20:00 ~ 2100';
time[4] = '21:00 ~ 2200';

module.exports = {
  tableName: 'registerations',
  attributes: {
    user_id: {
      type: 'integer',
      required: true
    },

    date: {
      type: 'string',
      required: true
    },

    time: {
      type: 'integer',
      required: true,
      defaultsTo: 0
    },

    owner: {
      columnName: 'user_id',
      type: 'integer',
      model:'user'
    },

    getDate: function() {
      return moment(this.date).format('YYYY-MM-DD');
    },

    getTime: function() {
      return time[this.time];
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
}
