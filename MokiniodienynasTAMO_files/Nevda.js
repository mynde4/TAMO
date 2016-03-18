(function ($) {
    $.validator.unobtrusive.parseDynamicContent = function (selector) {
        //use the normal unobstrusive.parse method
        $.validator.unobtrusive.parse(selector);

        //get the relevant form
        var form = $(selector).first().closest('form');

        //get the collections of unobstrusive validators, and jquery validators
        //and compare the two
        var unobtrusiveValidation = form.data('unobtrusiveValidation');
        var validator = form.validate();
        if (unobtrusiveValidation == undefined)
            return;
        $.each(unobtrusiveValidation.options.rules, function (elname, elrules) {
            if (validator.settings.rules[elname] == undefined) {
                var args = {};
                $.extend(args, elrules);
                args.messages = unobtrusiveValidation.options.messages[elname];
                //edit:use quoted strings for the name selector
                $("[name='" + elname + "']").rules('add', args);
            } else {
                $.each(elrules, function (rulename, data) {
                    if (validator.settings.rules[elname][rulename] == undefined) {
                        var args = {};
                        args[rulename] = data;
                        args.messages = unobtrusiveValidation.options.messages[elname][rulename];
                        //edit:use quoted strings for the name selector
                        $("[name='" + elname + "']").rules('add', args);
                    }
                });
            }
        });
    }
})($);

function initialize_report() {
    var imageStatusTemplate = $('input[id=ImageStatusTemplate]').val();
    var reportDiv = $('#ReportImageDiv');
    var reportMessageDiv = $('#ReportImageDivMessageDiv');
    var reportImage = $('#ReportImage');
    //var reportPagerFirstImage = $('#FirstImage');
    var reportPagerPreviousImage = $('#PreviousImage');
    var reportPagerNextImage = $('#NextImage');
    //var reportPagerLastImage = $('#LastImage');
    var reportPagerImageStatus = $('#ImageStatus');
    var totalPages = 0;
    var currentPage = 0;
    var reportPageHeight = parseInt($('#ReportPageHeight').val());
    refreshImageStatus();
    setFooter();

    reportImage.load(function () {
        if (reportDiv.length > 0) {
            /*reportPagerFirstImage.click(function (event) {
            event.preventDefault();
            currentPage = 1;
            selectPage();
            });*/
            reportPagerPreviousImage.click(function (event) {
                event.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    selectPage('p');
                }
            });
            reportPagerNextImage.click(function (event) {
                event.preventDefault();
                if (currentPage < totalPages) {
                    currentPage++;
                    selectPage('n');
                }
            });
            /*reportPagerLastImage.click(function (event) {
            event.preventDefault();
            currentPage = totalPages;
            selectPage();
            });*/
            reportMessageDiv.hide();
            reportImage.show();
            currentPage = 1;
            totalPages = reportImage.height() / reportPageHeight;
            refreshImageStatus();
            setFooter();
        }
    });

    function selectPage(type) {
        refreshImageStatus();
        if (type == 'p') {
            reportImage.addClass('page-' + currentPage);
            reportImage.removeClass('page-' + (currentPage + 1));
        } else {
            reportImage.addClass('page-' + currentPage);
            reportImage.removeClass('page-' + (currentPage - 1));
        }
    }

    function refreshImageStatus() {
        if (imageStatusTemplate != undefined) {
            reportPagerImageStatus.html(function () {
                return imageStatusTemplate.replace('{currentPage}', currentPage).replace('{totalPages}', totalPages);
            });
        }
    }
}

$(document).ready(function () {
    $('.daugiau_autoriu_link_knygu_sarase').live('mouseover', function () {
        var biid = $(this).find('#bibliotekosIrasoIdAutoriuPaieskai').val();
        var info = {
            id: biid
        };
        var baseUrl = $('#baseAddress');
        var daugiau = $(this);
        var container = daugiau.closest('tr').find('.daugiauAutoriuContainer');

        if(container.size() > 0){
            $.post(baseUrl.val() + "BibliotekosKatalogas/GetDaugiauAutoriu", info, function (data) {
                container.append(data);
                container.removeClass('daugiauAutoriuContainer').addClass('daugiauAutoriuContainerFull');
            });
        }
    });

    $("#search_input").focus(function () {
        if ($(this).val() == $(this)[0].defaultValue)
            $(this).val('');
    });

    $("#c_search_bar #search_input").live("blur", function () {
        val = $(this).val();
        if (val === "") {
            $(this).val($(this)[0].defaultValue);
        }
    });

    $("#library_search_input").focus(function () {
        if ($(this).val() == $(this)[0].defaultValue)
            $(this).val('');
    });

    $("#c_search_bar #library_search_input").live("blur", function () {
        val = $(this).val();
        if (val === "") {
            $(this).val($(this)[0].defaultValue);
        }
    });

    $('#change_role.inactive').live('click', function (e) {
        e.preventDefault();
        $('#role_options').removeClass('hidden');
        $('#h_user2').addClass('hover');
        $(this).removeClass('inactive').addClass('active');
        $('#role_options').prop('mouseIsOver', false);
    });

    $('#change_role.active').live('click', function (e) {
        e.preventDefault();
        $('#role_options').addClass('hidden');
        $('#h_user2').removeClass('hover');
        $(this).removeClass('active').addClass('inactive');
    });

    $('#role_options').live('mouseenter', function () {
        $(this).prop('mouseIsOver', true);
    });

    $('#role_options').live('mouseleave', function () {
        $(this).prop('mouseIsOver', false);
    });

    $('#change_role.active').live('blur', function (e) {
        e.preventDefault();
        if ($('#role_options').prop('mouseIsOver') == false) {
            $('#role_options').addClass('hidden');
            $('#h_user2').removeClass('hover');
            $(this).removeClass('active').addClass('inactive');
        }
    });

    $('.select_box .selected').live('click', function (e) {
        e.preventDefault();
        var selections = $(this).siblings('.selections');
        if (selections.hasClass('hidden')) {
            selections.removeClass('hidden').addClass('shown');
            $('.selections').prop('mouseIsOver', false);
        } else if (selections.hasClass('shown')) {
            selections.removeClass('shown').addClass('hidden');
        }
    });

    $('.selections').live('mouseenter', function () {
        $(this).prop('mouseIsOver', true);
    });

    $('.selections').live('mouseleave', function () {
        $(this).prop('mouseIsOver', false);
    });

    $('.select_box .selected').live('focusout', function (e) {
        if ($('.selections').prop('mouseIsOver') == false) {
            $(this).siblings('.selections').removeClass('shown').addClass('hidden');
        }
    });

    $('.submit_button').live('click', function (e) {
        e.preventDefault();
        $(this).parents('form').submit();
    });

    $("a.change_klase").click(function (e) {
        e.preventDefault();
        var listas = $("div#klasiu_sarasas_container");
        if ($(listas).is(":visible")) {
            listas.hide();
        }
        else {
            listas.show();
        }
    });

    $("#klasiu_sarasas a").click(function (e) {
        e.preventDefault();
        var selected = $(this);
        var nuoroda = selected.attr("href");
        var meniu = selected.parents(".s_menu_title").next();
        $.post(nuoroda, function (data) {
            meniu.html(data);
            $("a.change_klase").html(selected.find("span").html());
            $("div#klasiu_sarasas_container").hide();
        });
    });

    $('a.btn').live('click', function (e) {
        e.preventDefault();
    });

    $('.symbol_count_div').each(function () {
        var targetName = $(this).attr('data-target');
        var target = $('textarea[name="' + targetName + '"]');
        if (target != null) {
            symbolsCount(target, $(this), $(this).attr('data-max-count'));
        }
    });

    hideSuccessMessage();
    attachElements();
    setFooter();
});

function symbolsCount(textbox, restSymbolsCount, maxLength) {

    textbox.keyup(function () {
        if ($(this).val().length >= maxLength)
            $(this).val($(this).val().substring(0, maxLength));

        restSymbolsCount.text(maxLength - $(this).val().length);
    });

    textbox.keyup();
}

function setFooter() {
    var bannerHeight = 204;
    if ($('#c_main').length != 0) {
        $('#c_main').css('height', 'auto');
        if ($('#sidebar_spacer').length !== 0) {
            $('#sidebar_spacer').css('height', 'auto');
        }
        var c_main_height = ($('#footer').offset().top - $('#c_main').offset().top - parseInt($('#footer').css('margin-top'))  /*- $('#ad-banner-bottom').height()*/) /*+ $('.menu').height()*/;
        if ($('#ad-banner-bottom').height() > 50)
            c_main_height -= bannerHeight; 
        $('#c_main').height(c_main_height);        
        if ($('#sidebar_spacer').length !== 0) {
            var sidebar_spacer_height = ($('#footer').offset().top - $('#sidebar_spacer').offset().top /*- $('#ad-banner-bottom').height()*/) /*+ $('.menu').height()*/;
            if ($('#ad-banner-bottom').height() > 50)
                sidebar_spacer_height -= bannerHeight;
            $('#sidebar_spacer').height(sidebar_spacer_height);
        }
    }
}

function tamo_get(url, data, funkcija) {
    $.ajax(url, {
        cache: false,
        data: data,
        type: 'GET',
        success: funkcija,
        error: function () {
            if ($('#loading-dialog').length != 0){
                deleLoadingDialog();
            }
            alert('apdorojant užklausą įvyko klaida');
        }
    });
}

function tamo_post(url, data, funkcija) {
    $.ajax(url, {
        cache: false,
        data: data,
        type: 'POST',
        success: funkcija,
        error: function () {
            if ($('#loading-dialog').length != 0) {
                deleLoadingDialog();
            }
            alert('apdorojant užklausą įvyko klaida');
        }
    });
}

function hideSuccessMessage() {
    var success_message = $('.success_message').parents('.message_to_hide');
    setTimeout(function () {
        success_message.slideUp('normal', function () {
            setFooter();
        });
    }, 3000);
}

function append(selector, item) {
    selector.append(item);
    setFooter();
}

function show(selector) {
    selector.show();
    setFooter();
}

function hide(selector) {
    selector.hide();
    setFooter();
}

function toggle(selector) {
    selector.toggle();
    setFooter();
}

function remove(selector) {
    selector.remove();
    setFooter();
}

function after(target, data) {
    target.after(data);
    setFooter();
}

function replace(target, data) {
    target.after(data);
    target.remove();
    setFooter();
}

function getTabIndex() {
    if (navigator.appName != 'Microsoft Internet Explorer') {
        var hash = window.location.hash.replace('#tabas-', '');
        var index;
        index = parseInt(hash);
        if (isNaN(index))
            index = 1;
        return index - 1;
    }
    return 0;
}

function setTabIndex(index) {
    document.location.replace('#tabas-' + (index + 1));
}

function fixedColumnTable(selector, isResizing) {
    if (!($.browser.msie && parseInt($.browser.version, 10) === 7)) {
        var lentele = selector;
        if (!isResizing) {
            lentele.addClass('left');

            //        $.each(lentele.find('tr'), function () {
            //            $(this).css('height', $(this).height());
            //        });

            var kopija = lentele.clone();
            kopija.addClass('left');

            lentele.find('td:not(.fixed), th:not(.fixed), col:not(.fixed)').remove();
            kopija.find('td.fixed, th.fixed, col.fixed').remove();
        }

        var lentelesCols = lentele.find('col');
        var visasPlotis = 0;
        $.each(lentelesCols, function (i, el) {
            var w = $(el).attr('width');
            visasPlotis += parseInt(w);
        });

        lentele.css('width', visasPlotis);
        //append(selector, '<div class="left c_block padLess borderless" id="fiksuota_dalis"></div>');
        if (!isResizing) selector.siblings('br.clear').before('<div class="left slider_holder" id="slenkanti_dalis"></div>');
        //append(selector.parent(), '<div class="left slider_holder" id="slenkanti_dalis"></div>');

        if (!isResizing) {
            $('#slenkanti_dalis').css('width', selector.parent().width() - lentele.outerWidth() - 1);
            append($('#slenkanti_dalis'), kopija);
        }

        var kairesEilutes = lentele.find('tr');
        var desinesEilutes = !isResizing ? kopija.find('tr') : null, desineEilute;

        for (var i = 0; i < kairesEilutes.length; i++) {
            var kaireEilute = $(kairesEilutes.get(i));
            desineEilute = !isResizing ? $(desinesEilutes.get(i)) : null;
            var aukstis = kaireEilute.height();
            if (!isResizing && desineEilute.height() > aukstis)
                aukstis = desineEilute.height();
            kaireEilute.css('height', aukstis);
            if (!isResizing) desineEilute.css('height', aukstis);
        }

        var visasAukstis = selector.parent().height();
        if (window.opera && window.opera.buildNumber)       // Kad Operoj neatsirastu vertikalus scroll bar'as
            visasAukstis += 20;
        $('#slenkanti_dalis').css('height',  visasAukstis);
        
        setFooter();
    }
}

function blink(selector, pradineSpalva, mirktelejimoSpalva, laikas) {
    var mirksi = selector.find('#mirksi').val();
    if (mirksi == 'False') {
        selector.find('#mirksi').val('True');
        selector.css('backgroundColor', mirktelejimoSpalva);
        if (laikas == null)
            laikas = 1000;
        selector.animate({ 'backgroundColor': pradineSpalva }, laikas, function () {
            selector.find('#mirksi').val('False');
        });
    }
}

function attachElements(selector) {

    if (selector == undefined)
        selector = 'body';
    var element = $(selector);
    if (element != undefined) {

        var datepickers = element.find('input[class~=datepicker]');
        var timepickers = element.find('input[class~=timepicker]');

        if (datepickers.length != 0) {
            datepickers.datepicker({
                constrainInput: true,
                dateFormat: 'yy-mm-dd',
                onSelect: function (dateText, inst) {
                    $(this).valid();
                }
            });

            datepickers.each(function (index, Element) {
                $(Element).next('img[class~=datepickerButton]').click(Element, function (e) {
                    $(e.data).datepicker('show');
                });
            });
        }

        if (timepickers.length != 0) {
            timepickers.timepicker({
                showLeadingZero: false,
                showPeriodLabels: false,
                hourText: $.timepickerLocalization.hourText,
                minuteText: $.timepickerLocalization.minuteText,
                onSelect: function (time, inst) {
                    $(this).valid();
                },
                rows: 4
            });
        }

        timepickers.each(function (index, Element) {
            $(Element).next('img[class~=timepickerButton]').click(Element, function (e) {
                $(e.data).timepicker('show', this);
            });
        });

        $('input[class~=deleteItemButton]').click(function (e) {
            $(this).parent().remove();
            setFooter();
        });

        $('a.delete_row_button').live('click', function (e) {
            e.preventDefault();
            $(this).parents('tr').remove();
            setFooter();
        });
    }
}

function ajaxGetSuApdorojimu(url, parametrai, klaidosZinute, sekmesFunkcija, klaidosFunkcija) {
    $.ajax(url, {
        cache: false,
        data: parametrai,
        success: function (data) {
            apdorotiAjaxAtsakyma(data, sekmesFunkcija, klaidosZinute, klaidosFunkcija);
        },
        error: function () {
            var klaidosDuomenys = { SekmingaUzklausa: false, Zinute: klaidosZinute };
            apdorotiAjaxAtsakyma(klaidosDuomenys, null, klaidosZinute);
        }
    });
}

function apdorotiAjaxAtsakyma(atsakymas, sekmesFunkcija, klaidosZinute, klaidosFunkcija) {
    var klaiduDiv = $('.errorHolder');
    klaiduDiv.empty();
    var successDiv = $('.successHolder');
    successDiv.empty();
    if (atsakymas.SekmingaUzklausa == true) {
        sekmesFunkcija(atsakymas);
        if (atsakymas.Zinute != null) {
            successDiv.append('<div class="success_message"></div>');
            var pranesimoDiv = successDiv.find('div:first');
            pranesimoDiv.append('<ul><li>' + atsakymas.Zinute + '</li></ul>');
            setTimeout(function () {
                pranesimoDiv.slideUp('normal', function () {
                    setFooter();
                });
            }, 3000);
        }
    }
    else {
        if (atsakymas.Zinute || klaidosZinute != null) {
            klaiduDiv.append('<div class="validation-summary-errors"></div>');
            if ('undefined' === (typeof klaidosFunkcija)) {
                var validacijosDiv = klaiduDiv.find('div:first');
                if (atsakymas.Zinute != null) {
                    validacijosDiv.append('<ul><li>' + atsakymas.Zinute + '</li></ul>');
                } else {
                    validacijosDiv.append('<ul><li>' + klaidosZinute + '</li></ul>');
                }
            }
            else {
                klaidosFunkcija(atsakymas);
            }
        }
    }
}

$('.disabledMenuLink').click(function (e) {
    e.preventDefault();
});

function createLoadingDialog() {
    var langas = $('#c_main');
    langas.append('<div id="loading-dialog" title="Vykdoma operacija">');
    var dialogas = $('#loading-dialog');
    dialogas.append('<div class="loading_image">');
    dialogas.dialog({
        modal: true,
        close: function (event, ui) { deleLoadingDialog(); }
    });
    $('#loading-dialog').closest('.ui-dialog').attr('id', 'loading-dialog-window');
}

function deleLoadingDialog(){
    $('#loading-dialog').dialog('destroy');
    remove($('#loading-dialog'));
}

//custom client validation
(function ($) {
    // The validator function
    $.validator.addMethod('rangeDate',
        function (value, element, param) {
            try {
                var dateValue = $.datepicker.parseDate("yy-mm-dd", value);
            }
            catch (e) {
                return true;
            }
            return param.min <= dateValue && dateValue <= param.max;
        });
    // The adapter to support ASP.NET MVC unobtrusive validation
    $.validator.unobtrusive.adapters.add('rangedate', ['min', 'max'],
        function (options) {
            var params = {
                min: $.datepicker.parseDate("yy-mm-dd", options.params.min),
                max: $.datepicker.parseDate("yy-mm-dd", options.params.max)
            };
            options.rules['rangeDate'] = params;
            if (options.message) {
                options.messages['rangeDate'] = options.message;
            }
        });

    $.validator.addMethod('notgreaterdate', function (value, element, param) {
        try {
            var dateFrom = $.datepicker.parseDate("yy-mm-dd", value);
            var dateTo = $.datepicker.parseDate("yy-mm-dd", $('#' + param).val());
            if (dateTo == null)
                return true;
        }
        catch (e) {
            return true;
        }
        if (dateFrom > dateTo)
            return false;

        return true;
    });
    $.validator.unobtrusive.adapters.addSingleVal('notgreaterdate', 'otherproperty');

    $.validator.addMethod('badformatdate', function (value, element, param) {
        try {
            var dateValue = $.datepicker.parseDate("yy-mm-dd", value);
        }
        catch (e) {
            return false;
        }

        return true;
    });
    $.validator.unobtrusive.adapters.addBool('badformatdate');
})($);
