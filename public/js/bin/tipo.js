//Rules and Messages to Validate
$("#tipo_form").validate({
    ignore: [],
    debug: true,
    rules: {
        tipoNome: {
            required: true,
            minlength: 3
        },
        nome: {
            required: true,
            minlength: 3
        }
    },
    messages: {
        tipoNome: {
            required: "Digite o tipo de veículo a ser adicionada",
            minlength: jQuery.validator.format("O tipo de veículo deve conter ao menos {0} caracteres")
        },
        nome: {
            required: "Digite o tipo de veículo a ser adicionada",
            minlength: jQuery.validator.format("O tipo de veículo deve conter ao menos {0} caracteres")
        }
    }
});

//Fill table tipo
function getTipoTable() {
    //Populates Table with Json
    tableTipo = $('table#table-tipo').DataTable({
        ajax: {
            url: urlApi + "tipo_veiculo",
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json'
        },
        columns: [{
            data: "id"
                }, {
            data: "nome"
                }],
        columnDefs: [
            {
                width: 10,
                targets: 0
            }
        ],
        select: true,
        lengthChange: false,
        pageLength: 5,
        dom: 'lrti<"right"p>',
        language: {
            url: "../../doc/Portuguese-Brasil.json"
        }
    });
}

function getTipo(id, input) {

    $.ajax({
        type: "GET",
        url: urlApi + "tipo_veiculo/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (resp) {
            
            if (input === "update") {
                $("#tipoId").val(resp.data.id);
            $("#tipoNome").val(resp.data.nome);
            }

            $("#id").val(resp.data.id);
            $("#nome").val(resp.data.nome);

            //Reload Material Form
            Materialize.updateTextFields();

        },

    });

};

//insert into select to create veiculo
function getTipos(id) {
    
    if (id == "null") {
        $('#tipo').children().remove().end().append('<option value="" disable selected>Selecione o tipo</option>');
    }
    
    //Load 
    $.ajax({
        url: urlApi + "tipo_veiculo",

        type: 'GET',
        dataType: 'json',
        success: function (resp) {

            $.each(resp.data, function (key, value) {

                $('#tipo').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.nome)
                );
                $('#tipo').material_select();

            });
            
            if (id !== "null") {
                $('#tipo').find('option[value="' + id + '"]').prop('selected', true);
            }

        }
    });
};

function updateTipo(id, dados) {

    var data = new Object();
    data.id = id;
    data.nome = $("#tipoNome").val();
       
    //do AJAX request
    $("#tipo_form").validate();
    if ($("#tipo_form").valid()) {

        swal({
            title: "Confirmação",
            text: "Deseja salvar as informações?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Salvar",
            closeOnConfirm: false,
            html: false
        }, function () {

            $.ajax({
                type: "PUT",
                url: urlApi + "tipo_veiculo/" + id,
                data: data,
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    //Reload dataTable
                    $('#table-tipo').DataTable().ajax.reload();
                    $('#modal-tipo').modal('close');

                },

            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

};

function deleteTipo(id) {
    swal({
            title: "Tem certeza?",
            text: "Esta ação excluirá o tipo de Veículo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: 'btn-danger',
            confirmButtonText: 'Excluir',
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function (isConfirm) {
            if (isConfirm) {

                $.ajax({
                    type: "DELETE",
                    url: urlApi + "tipo_veiculo/" + id,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-tipo').DataTable().ajax.reload();
                        $('#modal-tipo').modal('close');
                    },

                });

                swal("Excluído!", "O tipo foi excluído!", "success");

            } else {
                swal("Cancelado", "Nada foi modificado", "error");
                $('#modal-tipo').modal('close');
            }
        });

};

function createTipo(data) {

    //make AJAX request
    $("#tipo_form").validate();
    if ($("#tipo_form").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "tipo_veiculo",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Tipo de veículo gravado com sucesso.",
                    "success");

            },

        });
    }
    //Reload Material Form
    Materialize.updateTextFields();

};


