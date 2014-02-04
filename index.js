/**
 * Copyright (c) MuleSoft, Inc.  All rights reserved.  http://www.mulesoft.com
 */

var logger = require('winston');
var EJDB = require("ejdb");

module.exports = function (options) {

    var db = options.db || 'application-gateway-server';

    var jb = EJDB.open(db , EJDB.DEFAULT_OPEN_MODE | EJDB.JBOTRUNC);

    var result = {};

    var sessions = {};

    /**
     * Persists the session state giving it a session_id
     * @param session_state the session state
     * @param done  callback for when the session state is persisted
     */
    result.create = function (session_state , done) {
        result.update(session_state , done);
    }

    /**
     * Retrieves the session state for the given id
     * @param session_id the session id
     * @param done callback for when the session state is retrieved
     */
    result.read = function (session_id , done) {
        jb.findOne("sessions" , { _id : session_id } , function (err, session_state) {
            done(err, session_state);
        });
    };

    /**
     * Updates the session state for the given session id
     * @param session_id    the session id
     * @param session_state the new session state
     * @param done  callback for when the session state is retrieved
     */
    result.update = function (session_state , done) {
        jb.save("sessions" , session_state , function (err , oids) {
            done(err, session_state);
        });
    };

    /**
     * Deletes the session state for the given id
     * @param session_id    the session id
     */
    result.delete = function (session_id, done) {
        jb.remove("sessions" , session_id , function (err) {
            done(err);
        });
    };

    return result;
}

