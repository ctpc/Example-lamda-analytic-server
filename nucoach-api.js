const request = require('request');
const baseUrl = require('./config').baseUrl;


const NucoachApi = function (hookId, hookSecret) {

    if (!hookId || !hookSecret) {
        throw new Error('HookId or Hook secret is missing');
        return false;
    }

    const _hookId = hookId;
    const _hookSecret = hookSecret;


    /**
     * Abstract request fn.
     * @param settings
     * @return {Promise<any>}
     * @private
     */
    const _request = (settings) => new Promise((resolve, reject) => {

        settings.headers = {
            'deephealth-hook-secret': _hookSecret,
            'deephealth-hook-id': _hookId,
            'content-type': 'application/json'
        };
        settings.json = true;

        request(settings, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        })
    });


    /**
     * to test NUCoach hook api.
     * @return {Promise<any>}
     */
    this.test = () => _request({
        method: 'GET',
        url: baseUrl + 'test'
    });

    /**
     * Post object to User model
     * @param userId
     * @param obj
     * @param tags
     * @return {Promise<any>}
     */
    this.postModel = (userId, obj = {}, tags = ['module']) => _request({
        method: 'POST',
        url: baseUrl + 'model/' + userId,
        body:
            {
                tags: tags,
                data: obj
            }
    });


    /**
     * get model from NUCoach user model.
     * @param userId the NUCoach ID of the user
     * @param optTags optional tags to search.
     * @param optLimit default 10, can be set to 1000
     * @return {Promise<any>}
     */
    this.getModel = (userId, optTags, optLimit) => _request({
        method: 'GET',
        url: baseUrl + 'model/' + userId,
        qs: optTags ? {limit: optLimit || 10, tags: optTags} : {limit: optLimit || 10}
    });


    /**
     * Create a notification for a client
     * @param userId
     * @param title
     * @param message
     * @return {Promise<any>}
     */
    this.createNotification = (
        userId,
        title = 'NUCoach',
        message = 'Empty Message'
    ) => _request({
        method: 'POST',
        url: baseUrl + 'notification/' + userId,
        body:
            {
                notificationTitle: title,
                notificationMessage: message
            }
    });


    /**
     * Schedule a notification in the future.
     * @param userId
     * @param notificationTitle
     * @param notificationMessage
     * @param time
     * @return {Promise<any>}
     */
    this.createScheduledNotification = (
        userId,
        notificationTitle = 'NUCoach',
        notificationMessage = 'Empty Notification',
        time = Date.now() + 180000
    ) => _request({
        method: 'POST',
        url: baseUrl + 'scheduled-notification/' + userId,
        body: {notificationTitle, notificationMessage, time}

    });


    /**
     * Create instant activity for clients. (using own module)
     * @param userId
     * @param title
     * @param notificationTitle
     * @param notificationMessage
     * @param module
     * @return {Promise<any>}
     */
    this.createActivity = (
        userId,
        title = 'No Title',
        notificationTitle = 'NUCoach',
        notificationMessage = 'Empty Message',
        module = null
    ) => _request({
        method: 'POST',
        url: baseUrl + 'activity/' + userId,
        body: {input: {}, title, notificationTitle, notificationMessage, module},
    });


    this.getConfig=()=>_request({
        method: 'GET',
        url: baseUrl + 'config'
    });

    this.updateConfig=(config)=>_request({
        method: 'PUT',
        url: baseUrl + 'config',
        body:config
    });

    this.getActionPlans=()=>_request({
        method: 'GET',
        url: baseUrl + 'action-plans'
    });


};


module.exports = NucoachApi;

