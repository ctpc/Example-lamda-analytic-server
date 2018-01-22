var request = require('request');


var NucoachApi = function (hookId, hookSecret) {

    if (!hookId || !hookSecret) {
        throw new Error('HookId or Hook secret is missing');
        return false;
    }

    var _hookId = hookId;
    var _hookSecret = hookSecret;

    var _request = function (settings, suc, err) {
        request(settings, function (error, response, body) {
            if (error) {
                err(error);
            } else {
                suc(body);
            }
        })
    };

    /**
     * Post object to User model
     * @param obj the object to be saved
     * @param tags array of strings and numbers to tag data object.
     * @param suc success callback
     * @param err error callback
     */
    this.postModel = function (userId, obj, tags, suc, err) {

        var obj = obj || {};
        var tags = tags || ['module'];

        _request({
            method: 'POST',
            url: 'https://deephealthlab.org/hook/model/' + userId,
            headers:
                {
                    'deephealth-hook-secret': _hookSecret,
                    'deephealth-hook-id': _hookId,
                    'content-type': 'application/json'
                },
            body:
                {
                    tags: tags,
                    data: obj
                },
            json: true

        }, suc, err);
    };


    /**
     * get model from NUCoach user model.
     * @param userId the NUCoach ID of the user
     * @param optTags optional tags to search.
     * @param optLimit default 10, can be set to 1000
     * @param suc success callback
     * @param err error callback
     */
    this.getModel = function (userId, optTags, optLimit, suc, err) {
        _request({
            method: 'GET',
            url: 'https://deephealthlab.org/hook/model/' + userId,
            qs: optTags ? {limit: optLimit || 10, tags: optTags} : {limit: optLimit || 10},
            headers:
                {
                    'deephealth-hook-secret': _hookSecret,
                    'deephealth-hook-id': _hookId,
                    'content-type': 'application/json'
                },
            json: true
        }, suc, err);
    };


    /**
     * to test NUCoach hook api.
     * @param suc
     * @param err
     */
    this.test = function (suc, err) {

        _request({
            method: 'GET',
            url: 'https://deephealthlab.org/hook/test',
            headers:
                {
                    'deephealth-hook-secret': _hookSecret,
                    'deephealth-hook-id': _hookId,
                    'content-type': 'application/json'
                },
            json: true
        }, suc, err);
    };

    /**
     * Create a notification for a client
     * @param userId NUCoach user ID.
     * @param title Notification title.
     * @param message Notification body (message).
     */
    this.createNotification = function (userId, title, message, suc, err) {

        _request({
            method: 'POST',
            url: 'https://deephealthlab.org/hook/notification/' + userId,
            headers:
                {
                    'deephealth-hook-secret': _hookSecret,
                    'deephealth-hook-id': _hookId,
                    'content-type': 'application/json'
                },
            body:
                {
                    notificationTitle: title,
                    notificationMessage: message
                },
            json: true
        }, suc, err);

    };


    /**
     * Schedule a notification in the future.
     * @param userId
     * @param title
     * @param message
     * @param time
     * @param suc
     * @param err
     */
    this.createScheduledNotification = function (userId, title, message, time, suc, err) {


        _request({
            method: 'POST',
            url: 'https://deephealthlab.org/hook/scheduled-notification/' + userId,
            headers:
                {
                    'deephealth-hook-secret': _hookSecret,
                    'deephealth-hook-id': _hookId,
                    'content-type': 'application/json'
                },
            body:
                {
                    notificationTitle: title,
                    notificationMessage: message,
                    time: time || Date.now() + 180000
                },
            json: true
        }, suc, err);


    };


    /**
     * create instant activity for clients. (using own module)
     * @param userId
     * @param title
     * @param notTitle
     * @param notMessage
     * @param optModuleId
     * @param suc
     * @param err
     */
    this.createActivity = function (userId, title, notTitle, notMessage,optModuleId, suc, err) {


        _request({
            method: 'POST',
            url: 'https://deephealthlab.org/hook/activity/' + userId,
            headers:
                {
                    'deephealth-hook-secret': _hookSecret,
                    'deephealth-hook-id': _hookId,
                    'content-type': 'application/json'
                },
            body:
                {
                    input: {},
                    title: title,
                    notificationTitle: notTitle,
                    notificationMessage: notMessage,
                    module:optModuleId || null
                },
            json: true
        }, suc, err);
    };








};


module.exports = NucoachApi;

