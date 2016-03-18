/// <reference name="MicrosoftAjax.debug.js" />

(function () { // isolation from Global scope

    Type.registerNamespace("tamo");
    tamo.$dom = Sys.UI.DomElement;

    if (tamo.$dom.empty === undefined) {
        tamo.$dom.empty = function (element) {
            while (element.hasChildNodes())
                element.removeChild(element.lastChild);
            return this;
        };
    }

    tamo.Session = function (element) {
        tamo.Session.initializeBase(this, [element]);
        this.url = "";
        this.message = "The session will end in ~{0} minute(s). Press OK to renew, or Cancel to let your session expire.";
        this.timeoutMins = 10; // default minimal value in minutes
        this.endingMins = 1; // default minimal value in minutes
        this.milliseconds = 0;
        this._ask = null;
        this._keepAlive = null;
        this._onRenew = null;
        this._tryRenew = null;
        this._updateTimer = null;
        this._refresh = null;
        this.funcID = 0;
        this.repeat = 2;
        return this;
    };

    tamo.Session.prototype = {
        initialize: function () {
            tamo.Session.callBaseMethod(this, 'initialize');
            this.milliseconds = (this.timeoutMins - this.endingMins) * 60 * 1000;
            this._ask = Function.createDelegate(this, this.ask);
            this._keepAlive = Function.createDelegate(this, this.keepAlive);
            this._onRenew = Function.createDelegate(this, this.onRenew);
            this._tryRenew = Function.createDelegate(this, this.tryRenew);
            this._updateTimer = Function.createDelegate(this, this.updateTimer);
            this._refresh = Function.createDelegate(this, this.refresh);
            this.funcID = setTimeout(this._ask, this.milliseconds);
            this.end = new Date();
            this.end.setMinutes(this.end.getMinutes() + this.timeoutMins);
            this.counterID = setInterval(this._updateTimer, 500); 
            //this.updateTimer();
        },
        dispose: function () {
            clearInterval(this.counterID);
            $clearHandlers(this.get_element());
            delete this._ask;
            delete this._keepAlive;
            delete this._onRenew;
            delete this._tryRenew;
            delete this._updateTimer;
            delete this._refresh;
            tamo.Session.callBaseMethod(this, 'dispose');
        },

        get_url: function () {
            return this.url;
        },
        set_url: function (url) {
            this.url = url;
            return this;
        },

        get_message: function () {
            return this.message;
        },
        set_message: function (msg) {
            this.message = msg;
            return this;
        },

        get_timeout: function () {
            return this.timeoutMins;
        },
        set_timeout: function (minutes) {
            this.timeoutMins = minutes;
            return this;
        },

        get_ending: function () {
            return this.endingMins;
        },
        set_ending: function (minutes) {
            this.endingMins = minutes;
            return this;
        },

        keepAlive: function () {
            clearInterval(this.funcID);
            // MA20150316 - DALT-343 Hot-Fix var rvToken = document.getElementsByName('__RequestVerificationToken')[0];
            $.post(this.url) // MA20150316 - DALT-343 Hot-Fix { __RequestVerificationToken: rvToken.value }) 
                .done(this._onRenew)
                .fail(this._tryRenew)
                .always(this._updateTimer) 
                ;
        },

        onRenew: function (sessionID) {
            // this.sessionID = sessionID;
            this.repeat = 2;
            this.funcID = setTimeout(this._ask, this.milliseconds);
            this.end = new Date();
            this.end.setMinutes(this.end.getMinutes() + this.timeoutMins);
        },

        tryRenew: function () {
            this.repeat--;
            if (this.repeat >= 0) {
                this.funcID = setTimeout(this._keepAlive, 3000); // try in 3 seconds
            } else {
                onRenew(null);
            }
        },

        ask: function () {
            if (confirm(String.format(this.message, this.endingMins))) {
                this.keepAlive();
            }
            else {
                clearInterval(this.funcID);
                var ms = this.endingMins * 60 * 1000 + 1000;
                this.funcID = setTimeout(this._refresh, ms);
            }
        },

        refresh: function () {
            clearInterval(this.funcID);
            window.location.reload(true);
        },

        updateTimer: function () {
            var milliseconds = this.end.getTime() - Date.now();
            if (milliseconds < 1000) milliseconds = 0;
            var hours = Math.floor(milliseconds / 1000 / 60 / 60);
            if (hours < 0) hours = 0;
            milliseconds -= hours * 1000 * 60 * 60;
            var minutes = Math.floor(milliseconds / 1000 / 60);
            if (minutes < 0) minutes = 0;
            milliseconds -= minutes * 1000 * 60;
            var seconds = Math.floor(milliseconds / 1000);
            if (seconds < 0) seconds = 0;

            var el = this.get_element();
            //this.empty();
            var node = el.firstChild;
            var text = String.format("Liko : {0}{1}{2}",
                hours > 0 ? hours + ":" : "",
                (hours > 0 && minutes < 10 ? "0" : "") + minutes + ":",
                (seconds < 10 ? "0" : "") + seconds
            );
            node.nodeValue = text;

            if (hours == 0 && minutes == 0 && seconds == 0) // full stop
                clearInterval(this.counterID);
            return this;
        },
        empty: function () {
            var el = tamo.$dom.empty(this.get_element());
            return this;
        }
    };

    tamo.Session.registerClass('tamo.Session', Sys.UI.Control);
})();