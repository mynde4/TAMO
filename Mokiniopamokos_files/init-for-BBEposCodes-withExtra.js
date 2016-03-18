
if (typeof (Adntmedia) === "undefined") {var Adntmedia = function() {};}
if (typeof (Adntmedia.KeyTarget) === "undefined") {Adntmedia.KeyTarget = function() {};}
if (typeof (Adntmedia.KeyTarget.CommonLibrary) === "undefined") {Adntmedia.KeyTarget.CommonLibrary = function() {};}

Adntmedia.KeyTarget.CommonLibrary.waitForBodyAndExec = function(callback) {
    var interval = 100; // ms
    
    function ifBodyExistsThenCallback() {
        if(     
            'undefined' !== typeof document.body 
            || 
            ('undefined' !== document.getElementsByTagName && 0 < document.getElementsByTagName('body').length)
        ) {
            if ('function' === typeof callback) callback();
            
            return true;
        } 
        
        setTimeout(
            ifBodyExistsThenCallback,
            interval
        );

        return false;
    }
    
    // Lets roll 
    ifBodyExistsThenCallback();
};

Adntmedia.KeyTarget.CommonLibrary.waitForBodyAndAppendChild = function(element, callback) {
    Adntmedia.KeyTarget.CommonLibrary.waitForBodyAndExec(
        function() {
            var document_body = (document.body ? document.body: document.getElementsByTagName('body')[0]);
            document_body.appendChild(element);
            
            if ('function' === typeof callback) callback();
        }
    );
};

Adntmedia.KeyTarget.CommonLibrary.loadExternalJsAsyncWay = function(url, callback, incognito, timeout_interval, timeout_callback) {
    // - Wait for it and load callback
    var script = document.createElement('script');
    var script_id = 'KT_External_Async_' + Math.round(Math.random() * 1000000000000);
    var hide_interval = 500; // ms
    var timeouted = false;
    var successful_load = false;

    script.id = script_id;
    script.type = 'text/javascript';
    script.async = true; // Not supported by Opera v12 (BIIIIG SHAME ON THEM :( )
    script.src = url;
   
    function hide() {
        setTimeout(
            function() {
                var elem = document.getElementById(script_id);
                elem.parentNode.removeChild(elem);            
            },
            hide_interval
        );

    }

    // - Wait part (necessary only if there is some callback defined)
    if (typeof (script.readyState) !== "undefined") {
        script.onreadystatechange = function() {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                successful_load = true;
                if ('function' === typeof callback && false === timeouted) callback();
                if (incognito) hide();
            }
        };
    } else {
        script.onload = function() {
            successful_load = true;
            if ('function' === typeof callback && false === timeouted) callback();
            if (incognito) hide();
        };
    }

    //document.getElementsByTagName("body")[0].appendChild(script); // Append to body causes IEv8- without updates (damn pirates or simply silly people) throw some stupid error. 
    document.getElementsByTagName("head")[0].appendChild(script); // And this line probably fixes it
    
    if ('undefined' !== typeof timeout_interval && 'function' === typeof timeout_callback) {
        setTimeout(
            function() {
                if (false === successful_load) {
                    timeouted = true;
                    timeout_callback();
                }
            },
            timeout_interval
        );
    }
};

// // Borrowed (and modified/unuglified a bit) from here
// //stackoverflow.com/a/9865667/1597960
window.Adntmedia.KeyTarget.CommonLibrary.flashInfo = function() {
    var a = !1; // is_flash_installed
    var b = ''; // flash_version

    function c(d) {
        d = d.match(/[\d]+/g);
        d.length = 3;
        return d.join('.');
    }

    if (navigator.plugins && navigator.plugins.length) {
        var e = navigator.plugins['Shockwave Flash'];

        if (e) {
            a = !0;

            if (e.description) {
                b = c(e.description);
            }
        }

        if (navigator.plugins['Shockwave Flash 2.0']) {
            a = !0;
            b = '2.0.0.11';
        }
    } else {
        if (navigator.mimeTypes && navigator.mimeTypes.length) {
            var f = navigator.mimeTypes['application/x-shockwave-flash'];

            if (f) {
                a = f;

                if (f.enabledPlugin) {
                    b = c(f.enabledPlugin.description);
                }
            }
        } else {
            try {
                var g = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash.7');
                a = !0;
                b = c(g.GetVariable('\$version'));
            } catch (h) {
                try {
                    g = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
                    a = !0;
                    b = '6.0.21';
                } catch (i) {
                    try {
                        g = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                        a = !0;
                        b = c(g.GetVariable('\$version'));
                    } catch (j) {}
                }
            }
        }
    }

    var result = {};
    result.installed = a;

    if (a) {
        var version_info = b.split('.');
        var major_version = version_info[0];
        var minor_version = version_info[1];
        var revision = version_info[2];

        result.version = {};
        result.version.major = major_version;
        result.version.minor = minor_version;
        result.version.revision = revision;
    } 

    return result;
};
if ('undefined' === typeof window.Adntmedia) window.Adntmedia = function(){}; if ('undefined' === typeof window.Adntmedia.KeyTarget) window.Adntmedia.KeyTarget = function(){}; window.Adntmedia.KeyTarget.user_id = '29050ae44a589af9f90d0851c1b67de9';var bburlparam; var adntKeyOldTargetVars = "/par12_number=1/par11_number=3/targ304_number=1/targ112_number=1/targ397_number=1/targ371_number=1/par3_number=4/targ453_number=1/par00003_number=1"; 

// Transliation dictionary BEGIN
var adntKeyTargDic = new Array();adntKeyTargDic['par00001_number']='a';adntKeyTargDic['par00002_number']='b';adntKeyTargDic['par1_number']='c';adntKeyTargDic['par2_number']='d';adntKeyTargDic['par3_number']='e';adntKeyTargDic['par4_number']='f';adntKeyTargDic['par5_number']='g';adntKeyTargDic['par6_number']='h';adntKeyTargDic['par7_number']='i';adntKeyTargDic['par8_number']='j';adntKeyTargDic['par9_number']='k';adntKeyTargDic['par10_number_dleft']='l';adntKeyTargDic['targ1_number_dleft']='m';adntKeyTargDic['camp37758']='ah';adntKeyTargDic['klikkiCr24']='aj';adntKeyTargDic['targ1_number_dpass']='al';adntKeyTargDic['par11_number']='am';adntKeyTargDic['camp67509']='bc';adntKeyTargDic['adoCr24']='bd';adntKeyTargDic['targ32_number']='bf';adntKeyTargDic['par12_number']='bg';adntKeyTargDic['targ33_number']='bh';adntKeyTargDic['targ34_number']='bi';adntKeyTargDic['targ35_number']='bj';adntKeyTargDic['targ36_number']='bk';adntKeyTargDic['targ51_number']='o';adntKeyTargDic['targ53_number']='r';adntKeyTargDic['targ58_number']='w';adntKeyTargDic['targ67_number']='ca';adntKeyTargDic['targ68_number']='cb';adntKeyTargDic['targ69_number']='cc';adntKeyTargDic['targ70_number']='cd';adntKeyTargDic['targ71_number']='ce';adntKeyTargDic['targ72_number']='cf';adntKeyTargDic['targ73_number']='cg';adntKeyTargDic['targ74_number']='ch';adntKeyTargDic['targ75_number']='ci';adntKeyTargDic['targ76_number']='cj';adntKeyTargDic['AdTargetMe728x90']='ck';adntKeyTargDic['AdTargetMe300x250']='cl';adntKeyTargDic['AdTargetMe120x600']='cm';adntKeyTargDic['targ87_number']='co';adntKeyTargDic['AdTargetMe980x180']='di';adntKeyTargDic['AdTargetMe160x600']='ee';adntKeyTargDic['AdTargetMe300x600']='ef';adntKeyTargDic['AdTargetMe320x50']='eg';adntKeyTargDic['AdTargetMe468x60']='eh';adntKeyTargDic['credit24LT']='bn';adntKeyTargDic['prisma']='bp';adntKeyTargDic['AdfRtb300x600']='br';adntKeyTargDic['AdfRtbBrandmark300x300']='z';adntKeyTargDic['AdfRtbSticky200x250']='eo';adntKeyTargDic['targ261_number']='ap';adntKeyTargDic['targ262_number']='cn';adntKeyTargDic['targ263_number']='ei';adntKeyTargDic['targ264_number']='as';adntKeyTargDic['targ265_number']='ba';adntKeyTargDic['targ266_number']='cv';adntKeyTargDic['targ267_number']='dt';adntKeyTargDic['targ268_number']='dw';adntKeyTargDic['targ269_number']='ec';adntKeyTargDic['targ270_number']='ed';adntKeyTargDic['targ271_number']='dj';adntKeyTargDic['targ272_number']='dl';adntKeyTargDic['targ273_number']='p';adntKeyTargDic['targ274_number']='an';adntKeyTargDic['targ275_number']='ep';adntKeyTargDic['targ276_number']='da';adntKeyTargDic['targ277_number']='cs';adntKeyTargDic['targ278_number']='er';adntKeyTargDic['targ279_number']='bs';adntKeyTargDic['targ280_number']='cw';adntKeyTargDic['targ282_number']='dg';adntKeyTargDic['targ283_number']='dm';adntKeyTargDic['targ284_number']='du';adntKeyTargDic['targ285_number']='eb';adntKeyTargDic['targ286_number']='el';adntKeyTargDic['targ287_number']='en';adntKeyTargDic['targ288_number']='ez';adntKeyTargDic['targ289_number']='dv';adntKeyTargDic['targ290_number']='v';adntKeyTargDic['targ291_number']='dz';adntKeyTargDic['targ292_number']='dh';adntKeyTargDic['targ293_number']='db';adntKeyTargDic['targ294_number']='bt';adntKeyTargDic['AdfRtb980x200']='cu';adntKeyTargDic['targ308_number']='ek';adntKeyTargDic['AdTargetMe234x60']='ct';adntKeyTargDic['AdTargetMe240x400']='ab';adntKeyTargDic['targ324_number']='cp';adntKeyTargDic['AdTargetMe970x90']='bu';adntKeyTargDic['par13_number']='em';adntKeyTargDic['targ350_number']='af';adntKeyTargDic['targ360_number']='au';adntKeyTargDic['targ362_number']='az';adntKeyTargDic['targ363_number']='dp';adntKeyTargDic['targ370_number']='x';adntKeyTargDic['targ371_number']='at';adntKeyTargDic['targ372_number']='de';adntKeyTargDic['targ373_number']='cz';adntKeyTargDic['targ374_number']='bv';adntKeyTargDic['targ375_number']='dr';adntKeyTargDic['targ376_number']='do';adntKeyTargDic['targ377_number']='ai';adntKeyTargDic['targ378_number']='ao';adntKeyTargDic['targ379_number']='cr';adntKeyTargDic['targ380_number']='ds';adntKeyTargDic['targ381_number']='eu';adntKeyTargDic['targ382_number']='n';adntKeyTargDic['targ383_number']='t';adntKeyTargDic['targ384_number']='bm';adntKeyTargDic['targ385_number']='bz';adntKeyTargDic['targ386_number']='aa';adntKeyTargDic['targ387_number']='ag';adntKeyTargDic['targ388_number']='dd';adntKeyTargDic['targ389_number']='bo';adntKeyTargDic['targ390_number']='et';adntKeyTargDic['targ391_number']='fa';adntKeyTargDic['targ392_number']='fb';adntKeyTargDic['targ393_number']='fc';adntKeyTargDic['targ394_number']='fd';adntKeyTargDic['targ395_number']='fe';adntKeyTargDic['targ396_number']='ff';adntKeyTargDic['targ397_number']='fg';adntKeyTargDic['targ398_number']='fh';adntKeyTargDic['targ399_number']='fi';adntKeyTargDic['targ400_number']='fj';adntKeyTargDic['targ401_number']='fk';adntKeyTargDic['targ402_number']='fl';adntKeyTargDic['targ403_number']='fm';adntKeyTargDic['targ404_number']='fn';adntKeyTargDic['targ405_number']='fo';adntKeyTargDic['targ406_number']='fp';adntKeyTargDic['targ407_number']='fr';adntKeyTargDic['targ408_number']='fs';adntKeyTargDic['targ409_number']='ft';adntKeyTargDic['targ410_number']='fx';adntKeyTargDic['targ411_number']='fv';adntKeyTargDic['crtg300x250']='gn';adntKeyTargDic['crtg250x250']='go';adntKeyTargDic['crtg250x350']='gp';adntKeyTargDic['crtg250x600']='gr';adntKeyTargDic['targ427_number']='gs';adntKeyTargDic['crtg520x300']='gw';adntKeyTargDic['targ431_number']='gz';adntKeyTargDic['targ432_number']='ha';adntKeyTargDic['targ435_number']='hd';adntKeyTargDic['crtg970x600']='he';adntKeyTargDic['targ436_number']='hf';adntKeyTargDic['targ437_number']='hg';adntKeyTargDic['targ438_number']='hh';adntKeyTargDic['targ439_number']='hi';adntKeyTargDic['targ440_number']='hj';adntKeyTargDic['AdTargetMe200x200']='hk';adntKeyTargDic['targ441_number']='hl';adntKeyTargDic['crtg995x180']='hm';adntKeyTargDic['targ442_number']='hn';adntKeyTargDic['targ443_number']='ho';adntKeyTargDic['targ444_number']='hp';adntKeyTargDic['targ445_number']='hr';adntKeyTargDic['targ446_number']='hs';adntKeyTargDic['targ447_number']='ht';adntKeyTargDic['targ448_number']='hx';adntKeyTargDic['targ449_number']='hv';adntKeyTargDic['targ450_number']='hw';adntKeyTargDic['AdTargetMe749x349']='hz';adntKeyTargDic['targ451_number']='ia';adntKeyTargDic['targ452_number']='ib';adntKeyTargDic['targ453_number']='ic';adntKeyTargDic['targ454_number']='id';
// Define namespaces
if (typeof (Adntmedia) === "undefined") {var Adntmedia = function() {};}
if (typeof (Adntmedia.KeyTarget) === "undefined") {Adntmedia.KeyTarget = function() {};}

if (!window.Adntmedia.LimitatorInformer) window.Adntmedia.LimitatorInformer = function() {};

window.Adntmedia.LimitatorInformer.getKeysIfPresent = function() {
    var prefix = 'AdntLimInfPosId__';
    var result = [];

    if (window.Adntmedia.LimitatorInformer.active_position_ids && window.Adntmedia.LimitatorInformer.active_position_ids.length) {
        var how_many = window.Adntmedia.LimitatorInformer.active_position_ids.length;

        for (var i = 0; i < how_many; i++) {
            var value = window.Adntmedia.LimitatorInformer.active_position_ids[i];

            if ('' !== value) {
                result.push(prefix + value);
            }
        }
    }

    return result;
};

if (typeof (Adntmedia.KeyTarget.AdTargetMe) === "undefined") {Adntmedia.KeyTarget.AdTargetMe = function() {};}

Adntmedia.KeyTarget.AdTargetMe.getVarsIfPresent = function() {
    var result = "";

    if (typeof (W1zOti1o_rtb) !== "undefined") {
        if (typeof (W1zOti1o_rtb['980x180']) !== "undefined") {
            result += "/AdTargetMe980x180=1";
        }
        if (typeof (W1zOti1o_rtb['728x90']) !== "undefined") {
            result += "/AdTargetMe728x90=1";
        }
        if (typeof (W1zOti1o_rtb['300x250']) !== "undefined") {
            result += "/AdTargetMe300x250=1";
        }
        if (typeof (W1zOti1o_rtb['120x600']) !== "undefined") {
            result += "/AdTargetMe120x600=1";
        }
        if (typeof (W1zOti1o_rtb['160x600']) !== "undefined") {
            result += "/AdTargetMe160x600=1";
        }
        if (typeof (W1zOti1o_rtb['234x60']) !== "undefined") {
            result += "/AdTargetMe234x60=1";
        }
        if (typeof (W1zOti1o_rtb['240x400']) !== "undefined") {
            result += "/AdTargetMe240x400=1";
        }
        if (typeof (W1zOti1o_rtb['300x600']) !== "undefined") {
            result += "/AdTargetMe300x600=1";
        }
        if (typeof (W1zOti1o_rtb['320x50']) !== "undefined") {
            result += "/AdTargetMe320x50=1";
        }
        if (typeof (W1zOti1o_rtb['468x60']) !== "undefined") {
            result += "/AdTargetMe468x60=1";
        }
        if (typeof (W1zOti1o_rtb['749x349']) !== "undefined") {
            result += "/AdTargetMe749x349=1";
        }
    }

    if (result !== "")
        result = adntTranslateKeyTargVarsToBbeVars(result);

    return result;
};

if (typeof (Adntmedia.KeyTarget.Adform) === "undefined") {Adntmedia.KeyTarget.Adform = function() {};}

// Settings
Adntmedia.KeyTarget.Adform.list_of_allowed_formats = [
    '300x600',
    '980x200',
    'Sticky200x250'
];

// !!! WARNING: Function name is tightly coupled with dynamic function generation scheme somewhere below !!!
Adntmedia.KeyTarget.Adform.addBannerToQueueFor__FormatName__ = function(banner_format, banner_json) {
    if (typeof (Adntmedia.KeyTarget.Adform.rtbBannerQueue) === "undefined") {Adntmedia.KeyTarget.Adform.rtbBannerQueue = {};}

    if ('undefined' !== typeof banner_json.response
            && 'banner' === banner_json.response
            && 'undefined' !== typeof banner_json.banner) {
        Adntmedia.KeyTarget.Adform.rtbBannerQueue[banner_format] = banner_json.banner;
    }
};

Adntmedia.KeyTarget.Adform.addBannerToQueueFor300x600 = function(banner_json) {
    var format_name = '300x600';
    Adntmedia.KeyTarget.Adform.addBannerToQueueFor__FormatName__(format_name, banner_json);
};

Adntmedia.KeyTarget.Adform.addBannerToQueueFor980x200 = function(banner_json) {
    var format_name = '980x200';
    Adntmedia.KeyTarget.Adform.addBannerToQueueFor__FormatName__(format_name, banner_json);
};

Adntmedia.KeyTarget.Adform.addBannerToQueueForSticky200x250 = function(banner_json) {
    var format_name = 'Sticky200x250';
    Adntmedia.KeyTarget.Adform.addBannerToQueueFor__FormatName__(format_name, banner_json);
};

Adntmedia.KeyTarget.Adform.getVarsIfPresent = function() {
    var result = "";
    var formats_queue = Adntmedia.KeyTarget.Adform.rtbBannerQueue;
    var list_of_allowed_formats = Adntmedia.KeyTarget.Adform.list_of_allowed_formats;

    if ('undefined' !== typeof formats_queue) {
        var how_many = Adntmedia.KeyTarget.Adform.list_of_allowed_formats.length;
        for (var i = 0; i < how_many; i++) {
            if ('undefined' !== typeof formats_queue[list_of_allowed_formats[i]]) {
                result += '/AdfRtb' + list_of_allowed_formats[i] + '=1';
            }
        }
    }

    if (result !== "") {
        result = adntTranslateKeyTargVarsToBbeVars(result);
    }

    return result;
};


if (typeof (Adntmedia.KeyTarget.ExternalTargetingSolutions) === "undefined") {Adntmedia.KeyTarget.ExternalTargetingSolutions = function() {};}

Adntmedia.KeyTarget.ExternalTargetingSolutions.loadExternalJsAsyncWay = function(url, howOften, callback, timeout_interval, timeout_callback) {
    if (howOften < 1)
        howOften = 0;
    if (100 < howOften)
        howOften = 100;

    if ((Math.ceil(Math.random() * 100)) <= howOften) {
        Adntmedia.KeyTarget.CommonLibrary.loadExternalJsAsyncWay(url, callback, false, timeout_interval, timeout_callback);
    }
};

// Translation functions
if ("undefined" === typeof Adntmedia.KeyTarget.Translation) Adntmedia.KeyTarget.Translation = function(){};

Adntmedia.KeyTarget.Translation.varsToArrOfKw = function(inputString, prefix) {
    // Mark the places where chars occur for the first time and the char before was a number
    var charOccurences = new Array();
    var howMany = inputString.length;
    for (var i = 0; i < howMany; i++) {
        if (isNaN(inputString.charAt(i)) === true && isNaN(inputString.charAt(i - 1)) === false) {
            // Lets pick letters
            charOccurences.push(i);
        }
    }
    charOccurences.push(i);	// virtual char occurence, that will be used as a limit in the next step algo

    // Lets extract the the thing we need :P
    var bbeKws = new Array();
    var howMany = (charOccurences.length - 1); // skip the last occurence, cause it is intentional fake one
    for (var i = 0; i < howMany; i++) {
        bbeKws.push(prefix + inputString.substr(charOccurences[i], (charOccurences[i + 1] - charOccurences[i])));
    }

    return bbeKws;
};

Adntmedia.KeyTarget.Translation.varsToKw = function(inputString, prefix, separator) {
    var bbeArrOfKw = Adntmedia.KeyTarget.Translation.varsToArrOfKw(inputString, prefix);

    return bbeArrOfKw.join(separator);
};

function adntTranslateBbeVarsToBbeKwEmulation(inputString) {
    return Adntmedia.KeyTarget.Translation.varsToKw(inputString, 'pbt_', ';');
}

// Into BBE PBT Params and Keyword like params
function adntTranslateKeyTargVarsToBbeVars(inputString) {
    var result = "";
    var explodedStringArray = inputString.split("/");
    var explodedStringArraySize = inputString.split("/").length;
    var key = "";
    var value = "";

    if (explodedStringArraySize !== 0) {
        for (var i = 0; i < explodedStringArraySize; i++) {
            key = explodedStringArray[i].split("=")[0];
            value = explodedStringArray[i].split("=")[1];
            if (adntKeyTargDic[key] !== undefined) {
                result = result + adntKeyTargDic[key] + value;
            }
        }
    }

    return result;
}

// For Adform
function adntGetAdformChPickValInBbeForm() {
    var result = "";

    if (typeof (Adform) !== "undefined" && typeof (Adform.GetCampaignsConditions) !== "undefined") {
        var keys = adntGetAllObjectKeys(Adform.GetCampaignsConditions());
        var howMany = keys.length;
        if (howMany !== 0) {
            for (var i = 0; i < howMany; i++) {
                result = result + "/" + keys[i] + "=1";
            }
        }
    }

    if (result !== "")
        result = adntTranslateKeyTargVarsToBbeVars(result);

    return result;
}

// For Klikki
function adntGetKlikkiForCr24Vars() {
    var result = "";

    if (typeof (adntCredit24TargetIsPresent) !== "undefined" && adntCredit24TargetIsPresent === true) {
        result = "/klikkiCr24=1";
    }

    if (result !== "")
        result = adntTranslateKeyTargVarsToBbeVars(result);

    return result;
}

// For Adocean

function adntGetAdoceanForCr24Vars() {
    var result = "";

    // Extract variable from Adocean
    if (typeof (adntAdoRetarVars) !== "undefined") { // only if it present
        result = adntAdoRetarVars;
    }

    // Translate based on the dictionary
    if (result !== "")
        result = adntTranslateKeyTargVarsToBbeVars(result);

    return result;
}

// For external data
function adntGetAllObjectKeys(obj) {
    var keys = [];
    for (var key in obj) {
        keys.push(key);
    }

    return keys;
}

//Netsprint
Adntmedia.KeyTarget.Translation.getNetsprintKeys = function(netsprint_data, prefix) {
    var netsprint_keys = netsprint_data.split("-");

    for (var i = 0; i < netsprint_keys.length; i++) {
        netsprint_keys[i] = prefix + netsprint_keys[i];
    }

    return netsprint_keys;
};

//Gismeteo

Adntmedia.KeyTarget.Translation.getGismeteoKeys = function(gismeteo_data) {
    var gismeteo_keys = gismeteo_data.split("-");

    return gismeteo_keys;
};

Adntmedia.KeyTarget.Translation.getCriteoKeys = function (criteo_data) {
    var modified_criteo_keys = criteo_data.slice(0, -1);
    var criteo_keys = modified_criteo_keys.split(";");

    return criteo_keys;

};

// Criteo
if ("undefined" === typeof Adntmedia.KeyTarget.Criteo) {Adntmedia.KeyTarget.Criteo = function() {};}

Adntmedia.KeyTarget.Criteo.getVarsIfPresent = function() {
    var result = "";

    if ("string" === typeof window.crtg_content) {
        if (-1 !== window.crtg_content.indexOf('adnet300250=1')) {
            result += "/crtg300x250=1";
        }
        //buves 300x600
        if (-1 !== window.crtg_content.indexOf('adnet250250=1')) {
            result += "/crtg250x250=1";
        }
        //buves 980x200
        if (-1 !== window.crtg_content.indexOf('adnet250350=1')) {
            result += "/crtg250x350=1";
        }
        //buves 728x90
        if (-1 !== window.crtg_content.indexOf('adnet250600=1')) {
            result += "/crtg250x600=1";
        }
        //buves 240x400
        if (-1 !== window.crtg_content.indexOf('adnet520300=1')) {
            result += "/crtg520x300=1";
        }
        //buves rollingup
        if (-1 !== window.crtg_content.indexOf('adnet970600=1')) {
            result += "/crtg970x600=1";
        }
        if (-1 !== window.crtg_content.indexOf('adnet995180=1')) {
            result += "/crtg995x180=1";
        }
    }

    if (result !== "")
        result = adntTranslateKeyTargVarsToBbeVars(result);

    return result;
};
var adntKeytargetFirstStepVars = adntTranslateKeyTargVarsToBbeVars(adntKeyOldTargetVars); 

(function(){
var url = '//keytarget.adnet.lt/js/limitator/public/main.js.php';
Adntmedia.KeyTarget.ExternalTargetingSolutions.loadExternalJsAsyncWay( url, 100, function() {    
    var keys = window.Adntmedia.LimitatorInformer.getKeysIfPresent();    
    if (window.AdntLimInfAdoKeys && window.AdntLimInfAdoKeys.join) {
        window.AdntLimInfAdoKeys.join(keys);
    } else {
       window.AdntLimInfAdoKeys = keys;
    }
});
})();

//4lt
(function(){
var excl_domains = [];
excl_domains.push('118.lt');
excl_domains.push('m.draugas.lt');
var how_many = excl_domains.length;
for (var i = 0; i < how_many; i++) {
    if (-1 !== document.domain.indexOf(excl_domains[i])) {
        return false; // just quit
    }
}

// Adform RTB
// Do not litter the DOM
(function(){
var mid = '68155'; var width = 300; var height = 600;
var format_name = width + 'x' + height;
var clickTracker = encodeURIComponent('__ADNTMD_CLICK_URL__');
var callback_function_name = 'Adntmedia.KeyTarget.Adform.addBannerToQueueFor' + format_name;
var url = '//adx.adform.net/adx/?mid=' + mid + '&w=' + width + '&h=' + height + '&cturl=' + clickTracker + '&callback=' + callback_function_name;
window.Adntmedia.KeyTarget.ExternalTargetingSolutions.loadExternalJsAsyncWay( url, 100);
})();
(function(){
var mid = '69156'; var width = 980; var height = 200;
var format_name = width + 'x' + height;
var clickTracker = encodeURIComponent('__ADNTMD_CLICK_URL__');
var callback_function_name = 'Adntmedia.KeyTarget.Adform.addBannerToQueueFor' + format_name;
var url = '//adx.adform.net/adx/?mid=' + mid + '&w=' + width + '&h=' + height + '&cturl=' + clickTracker + '&callback=' + callback_function_name;
window.Adntmedia.KeyTarget.ExternalTargetingSolutions.loadExternalJsAsyncWay( url, 100);
})();
(function(){
var mid = '68231'; var width = 200; var height = 250;
var format_name = 'Sticky' + width + 'x' + height;
var clickTracker = encodeURIComponent('__ADNTMD_CLICK_URL__');
var callback_function_name = 'Adntmedia.KeyTarget.Adform.addBannerToQueueFor' + format_name;
var url = '//adx.adform.net/adx/?mid=' + mid + '&w=' + width + '&h=' + height + '&cturl=' + clickTracker + '&callback=' + callback_function_name;
window.Adntmedia.KeyTarget.ExternalTargetingSolutions.loadExternalJsAsyncWay( url, 100);
})();

})();


// AdTargetMe
if (document.domain.indexOf("alfa.lt") !== -1) {
    (function () {
        var domain_url = window.location.hostname;

        if ('string' !== typeof domain_url || 'undefined' !== typeof domain_url && 'undefined' === domain_url) {
            domain_url = 'anon.adnet';
        }

        window.Adntmedia.KeyTarget.ExternalTargetingSolutions.loadExternalJsAsyncWay( "//ads.adtarget.me/adnet/show/?s=980x180,728x90,300x250,300x600&c=lt&u="+ domain_url +"&cp=1500000&bust="+ (new Date()).getTime(), 100);
    })();
} else if (document.domain.indexOf("maxima.lt") !== -1) {
    window.Adntmedia.KeyTarget.ExternalTargetingSolutions.loadExternalJsAsyncWay(
        "//ads.adtarget.me/adnet/show/?s=749x349&c=lt&u=maxima.lt&cp=200000&bust="+ (new Date()).getTime(),
        100
    );
} else {
    (function () {
        var excl_domains = [];
        excl_domains.push('5braskes.lt');
        excl_domains.push('klubas.lt');
        excl_domains.push('cosmopolitan.lt');
        excl_domains.push('moteris.lt');
        excl_domains.push('panele.lt');
        excl_domains.push('manonamai.lt');
        excl_domains.push('tavovaikas.lt');
        excl_domains.push('1000receptu.lt');
        var how_many = excl_domains.length;
        for (var i = 0; i < how_many; i++) {
            if (-1 !== document.domain.indexOf(excl_domains[i])) {
                return false; // just quit
            }
        }

        var domain_url = window.location.hostname;

        if ('string' !== typeof domain_url || 'undefined' !== typeof domain_url && 'undefined' === domain_url) {
            domain_url = 'anon.adnet';
        }

        window.Adntmedia.KeyTarget.ExternalTargetingSolutions.loadExternalJsAsyncWay(
            "//ads.adtarget.me/adnet/show/?s=980x180,728x90,300x250,300x600&c=lt&u="+ domain_url +"&cp=1000000&bust="+ (new Date()).getTime(),
            100
        );
    })();

}

// Netsprint
(function () {
    if (location.protocol.substr(0,5)==='http:') {
        try {
            (function () {
                var d = document;
                var e = d.createElement('script');
                e.type = 'text/javascript';
                e.src = '//api.adnet.nsaudience.pl/frontend/api/bootstrapScript.js?inlined&sourceId=adnet&doSale';
                e.async = true;
                (d.head || d.body || d.firstChild).appendChild(e);
            })();
        } catch (e) {}
    }
})();

(function () {
    if (location.protocol.substr(0, 5) === 'http:') {
        try {
            (function () {
                var d = document;
                var e = d.createElement('img');
                e.style.cssText = 'position:absolute; left:-5px; width:1px; height:1px; border:none; visibility:hidden';
                e.width = '1';
                e.height = '1';
                e.border = '0';
                e.src = '//api.adnet.nsaudience.pl/frontend/api/mainScript.jpg?sourceId=adnet_demo&adnet_uid=' + window.Adntmedia.KeyTarget.user_id;
                (d.head || d.body || d.firstChild).appendChild(e);
            })();
        } catch (e) {}
    }
})();

if (document.domain.indexOf("draugas.lt") !== -1) {
    (function () {

        var crtg_nid = "4868";
        var crtg_cookiename = "cto_rtt";

        function crtg_getCookie(c_name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) {
                    return unescape(y);
                }
            }
            return '';
        }

        var crtg_rnd = Math.floor(Math.random() * 99999999999);
        var crtg_url = '//rtax.criteo.com/delivery/rta/rta.js?netId=' + escape(crtg_nid);
        crtg_url += '&cookieName=' + escape(crtg_cookiename);
        crtg_url += '&rnd=' + crtg_rnd;
        crtg_url += '&varName=crtg_content';

        window.Adntmedia.KeyTarget.ExternalTargetingSolutions.loadExternalJsAsyncWay(crtg_url, 100, function () {
            window.crtg_content = crtg_getCookie(crtg_cookiename);
            window.crtg_content = window.crtg_content.slice(0, -1);
            window.crtg_content = window.crtg_content.split(";");
            window.crtg_content = window.crtg_content.join("-");
        });

    })();
}

if (document.domain.indexOf("supermama.lt") !== -1) {
    (function () {

        var crtg_nid = "4873";
        var crtg_cookiename = "cto_rtt";

        function crtg_getCookie(c_name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) {
                    return unescape(y);
                }
            }
            return '';
        }

        var crtg_rnd = Math.floor(Math.random() * 99999999999);
        var crtg_url = '//rtax.criteo.com/delivery/rta/rta.js?netId=' + escape(crtg_nid);
        crtg_url += '&cookieName=' + escape(crtg_cookiename);
        crtg_url += '&rnd=' + crtg_rnd;
        crtg_url += '&varName=crtg_content';

        window.Adntmedia.KeyTarget.ExternalTargetingSolutions.loadExternalJsAsyncWay(crtg_url, 100, function () {
            window.crtg_content = crtg_getCookie(crtg_cookiename);
            window.crtg_content = window.crtg_content.slice(0, -1);
            window.crtg_content = window.crtg_content.split(";");
            window.crtg_content = window.crtg_content.join("-");
        });

    })();
}

if (document.domain.indexOf("vinted.lt") !== -1) {
    (function () {

        var crtg_nid = "4872";
        var crtg_cookiename = "cto_rtt";

        function crtg_getCookie(c_name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) {
                    return unescape(y);
                }
            }
            return '';
        }

        var crtg_rnd = Math.floor(Math.random() * 99999999999);
        var crtg_url = '//rtax.criteo.com/delivery/rta/rta.js?netId=' + escape(crtg_nid);
        crtg_url += '&cookieName=' + escape(crtg_cookiename);
        crtg_url += '&rnd=' + crtg_rnd;
        crtg_url += '&varName=crtg_content';

        window.Adntmedia.KeyTarget.ExternalTargetingSolutions.loadExternalJsAsyncWay(crtg_url, 100, function () {
            window.crtg_content = crtg_getCookie(crtg_cookiename);
            window.crtg_content = window.crtg_content.slice(0, -1);
            window.crtg_content = window.crtg_content.split(";");
            window.crtg_content = window.crtg_content.join("-");
        });

    })();
}

document.write('<script type="text/javascript" src="' + document.location.protocol + '//keytarget.adnet.lt/core/js/fuzzyAsyncWorkaround/main.js?bust=' + ((new Date()).getTime()) + '"><\/script>');
document.write('<script type="text/javascript" src="' + document.location.protocol + '//keytarget.adnet.lt/core/js/step2Workaround/main.js.php?firstStepVars='+ adntKeytargetFirstStepVars +'&sJsCaUr=&v=cHJvZHVjdGlvbg==&coCo=lt" ' + '><\/script>');
// Define namespaces
if ('undefined' === typeof Adntmedia) {var Adntmedia = function(){};}
if ('undefined' === typeof Adntmedia.Keytarget) {Adntmedia.Keytarget = function(){};}
if ('undefined' === typeof Adntmedia.Keytarget.DataReceiver) {Adntmedia.Keytarget.DataReceiver = function(){};}

Adntmedia.Keytarget.DataReceiver.xtracturl = function() {
    return window.location.href;
};

Adntmedia.Keytarget.DataReceiver.pushToStorage = function(passed_type, passed_value) {
    // Settings
    var where_to_post = '//keytarget.adnet.lt/core/mapping/php/dtrec-get.php';

    // Action 3,2,1... Go
    var url = where_to_post + '?url=' + passed_value;
    Adntmedia.KeyTarget.CommonLibrary.loadExternalJsAsyncWay(url, function(){}, true);
};

if(Adntmedia.Keytarget.DataReceiver.xtracturl()) {
    Adntmedia.Keytarget.DataReceiver.pushToStorage( 'url', Adntmedia.Keytarget.DataReceiver.xtracturl());
}


