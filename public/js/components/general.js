//Path to home
var getUrl = window.location;
var path = getUrl.pathname.split('/');
var homeUrl = getUrl.protocol + "//" + getUrl.host + "/index.html";
var searchUrl = getUrl.protocol + "//" + getUrl.host + "/" + path[1] + "/" + path[2] + "/search.html";
var createUrl = getUrl.protocol + "//" + getUrl.host + "/" + path[1] + "/" + path[2] + "/create.html";
var imageUrl = getUrl.protocol + "//" + getUrl.host + "/img/"; 

var urlApi = "http://192.168.10.10:3004/"

// Validade default Fields materialize.css
$.validator.setDefaults({
    errorClass: 'invalid',
    validClass: "valid",
    errorPlacement: function (error, element) {
        $(element)
            .closest("form")
            .find("label[for='" + element.attr("id") + "']")
            .attr('data-error', error.text())
            .attr('class', 'active');

    },
    submitHandler: function (form) {
        console.log('form ok');
    }
});

function resetForm($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox')
        .removeAttr('checked').removeAttr('selected');

    $("input:text:first:visible").focus();
    $('select').prop('selectedIndex', 0);
        
    $('select').material_select;

    //Reload Material Form
    Materialize.updateTextFields();
}

function goHome() {
    location.href = homeUrl;
}

function goSearch() {
    location.href = searchUrl;
}

function goCreate() {
    location.href = createUrl;
}

function goInfoVeiculo(div) {
    
    
    //location.href = createUrl;
    location.href = getUrl.protocol + "//" + getUrl.host + "/" + path[1] + "/infoveiculo/create.html#" + div;
    
    console.log(div);
}

function goSetorCreate() {
    //location.href = createUrl;
    location.href = getUrl.protocol + "//" + getUrl.host + "/" + path[1] + "modules/setor/create.html";
}

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 200, // Creates a dropdown of 200 years to control year
    format: 'dd/mm/yyyy',

    // Languages
    // Strings and translations
    monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    showMonthsShort: false,
    showWeekdaysFull: false,

    // Buttons
    today: 'Hoje',
    clear: 'Limpar',
    close: 'Fechar',

    // Accessibility labels
    labelMonthNext: 'Próximo mês',
    labelMonthPrev: 'Mês anterior',
    labelMonthSelect: 'Selecione o mês',
    labelYearSelect: 'Selecione o ano'
});

swal.setDefaults({
    confirmButtonText: "OK",
    cancelButtonText: "Cancelar"
});

//To update materializecss select every time it is changed
$('select').on('contentChanged', function () {
    $(this).material_select();
});


//My transition function is here
slideIn = function (selector, durationARG, startPosition, first) {

    $(first).css("opacity", 0).addClass("hide");

    $(first).velocity({
        translateX: "-500px"
    }, {
        duration: 0
    });

    //Make sure opacity is set to 0
    $(selector).css("opacity", 0).removeClass("hide");

    //If duration isn't specified
    if (durationARG == undefined) {
        durationARG = "800px";
    };

    //If start position isn't specified, revert to default
    if (startPosition == undefined) {
        startPosition = "-500px";
    };


    var time = 0;


    $(selector).velocity({
        translateX: "500px"
    }, {
        duration: 0
    });

    $(selector).velocity({
        opacity: "1",
        translateX: "0"
    }, {
        duration: durationARG,
        delay: time,
        easing: [60, 10]
    });
    time += 120;
};

//My transition function is here
slideOut = function (selector, durationARG, startPosition, first) {

    $(first).css("opacity", 0).addClass("hide");

    $(first).velocity({
        translateX: "-500px"
    }, {
        duration: 0
    });

    //Make sure opacity is set to 0
    $(selector).css("opacity", 0).removeClass("hide");

    //If duration isn't specified
    if (durationARG == undefined) {
        durationARG = "800px";
    }

    //If start position isn't specified, revert to default
    if (startPosition == undefined) {
        startPosition = "-500px";
    }

    var time = 0;

    $(selector).velocity({
        translateX: "-500px"
    }, {
        duration: 0
    });

    $(selector).velocity({
        opacity: "1",
        translateX: "0"
    }, {
        duration: durationARG,
        delay: time,
        easing: [60, 10]
    });
    time += 120;
};

/**
 * Get an array of indexes for columns that have the given class name.
 *
 * @param columns list of DataTables column objects
 * @param className name of the class to look for
 * @returns array of indexes
 */
function getColumnIndexesWithClass( columns, className ) {
    var indexes = [];
    $.each( columns, function( index, columnInfo ) {
        // note: doesn't attempt to support multiple class names on a column
        if( columnInfo.className == className ) {
            indexes.push( index );
        }
    } );
 
    return indexes;
}
