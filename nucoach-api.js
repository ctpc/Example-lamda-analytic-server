var request = require('request');


var NucoachApi = function (hookId, hookSecret) {

    if (!hookId || !hookSecret) {
        throw new Error('HookId or Hook secret is missing');
        return false;
    }

    /**
     * Post object to User model
     * @param obj the object to be saved
     * @param tags array of strings and numbers to tag data object.
     * @param suc success callback
     * @param err error callback
     */
    this.postModel = function (userId, obj,tags, suc, err) {

        var obj=obj || {};
        var tags= tags || ['module'];

        request({
            method: 'POST',
            url: 'https://deephealthlab.org/hook/model/'+userId,
            headers:
                {
                    'deephealth-hook-secret': hookSecret,
                    'deephealth-hook-id': hookId,
                    'content-type': 'application/json'
                },
            body:
                {
                    tags: tags,
                    data: obj
                },
            json: true

        }, function (error, response, body) {
            if (error) {
                err(error);
            } else {
                suc(body);
            }
        });
    }

};


