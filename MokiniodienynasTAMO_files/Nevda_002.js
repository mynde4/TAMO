function Save(data, action, successFunc, errorFunc) {
    var json = JSON.stringify(data);
    $.ajax({
        url: action,
        type: 'POST',
        dataType: 'json',
        data: json,
        contentType: 'application/json; charset=utf-8',
        success: successFunc,
        error: errorFunc
    })
}

function getContent(url, callback) {
    var request = new Sys.Net.WebRequest();
    request.set_url(url);
    request.set_httpVerb("GET");
    var del = Function.createCallback(getContentResults, callback);
    request.add_completed(del);
    request.invoke();
}

function getContentResults(executor, eventArgs, callback) {
    if (executor.get_responseAvailable()) {
        callback(eval(executor.get_responseData()));
    }
    else {
        if (executor.get_timedOut())
            alert("TIMEOUT");
        else if (executor.get_aborted())
            alert("ABORT");
    }
}

function bindOptions(controlChild, controlParent, url, callback) {
    controlChild.options.length = 0;
    var makeId = controlParent.value;
    if (makeId) {
        getContent(url + makeId, callback);
    }
}

function handleAjaxStatusError(errorContext) {
    var t = errorContext.responseText;
    var status = $.parseJSON(t);
    alert(status.message); // TO-DO Implement user friendly UI
}

var sortSelect = function (select, attr, order) {
    if (attr === 'text') {
        if (order === 'asc') {
            $(select).html($(select).children('option').sort(function (x, y) {
                return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
            }));
            $(select).get(0).selectedIndex = 0;
            e.preventDefault();
        } // end asc
        if (order === 'desc') {
            $(select).html($(select).children('option').sort(function (y, x) {
                return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
            }));
            $(select).get(0).selectedIndex = 0;
            e.preventDefault();
        } // end desc
    }

};