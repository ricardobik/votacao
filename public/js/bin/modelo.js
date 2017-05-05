//Rules and Messages to Validate
$("#modelo_form").validate({
    ignore: [],
    debug: true,
    rules: {
        modelo: {
            required: true,
            minlength: 3
        },
        modeloNome: {
            required: true,
            minlength: 3
        }
    },
    messages: {
        modelo: {
            required: "O campo nome deve ser preenchido",
            minlength: jQuery.validator.format("O nome do modelo deve conter ao menos {0} caracteres")
        },
        modeloNome: {
            required: "O campo nome deve ser preenchido",
            minlength: jQuery.validator.format("O nome do modelo deve conter ao menos {0} caracteres")
        }
    }
});

//Fill table with all modelos
function getModelosTable(id) {

    //Populates Table with Json
    tableModelo = $('table#table-modelo').DataTable({
        destroy: true,
        ajax: {
            url: urlApi + "marca/" + id + "/modelo",
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json'
        },
        columns: [{
            data: "id"
                }, {
            data: "nome"
                }],
        "columnDefs": [{
            "width": "20%",
            "targets": 0
                }],
        select: true,
        fixedColumns: true,
        lengthChange: false,
        pageLength: 5,
        dom: 'lrti<"right"p>',
        language: {
            url: "../../doc/Portuguese-Brasil.json"
        }

    });
    tableModelo.draw(false);

}

//function getModelo(data) {
function getModelo(id, inputType) {

    $.ajax({
        type: "GET",
        url: urlApi + "modelo/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (resp) {

            if (inputType === "select") {
                $("#modelo").empty().html(' ');

                $('#modelo').append(
                    $("<option></option>")
                    .attr('value', resp.data.id)
                    .text(resp.data.nome)
                    .prop('selected', true)
                );
                $('#modelo').material_select();

            } else {

                $("#modeloId").val(resp.data.id);
                $("#modeloNome").val(resp.data.nome);
            }

            //Reload Material Form
            Materialize.updateTextFields();

        },

        error: function (textStatus, errorThrown) {
            console.log("errou");
        }

    });

}

function getModelos(marcaId, modeloId) {

    $("#modelo").empty().html(' ');
    $("#modelo").append("<option value='' disabled selected>Escolha o modelo</option>");
    $("#loader").css('display', '');

    $.ajax({
        url: urlApi + "marca/" + marcaId + "/modelo",

        type: 'GET',
        dataType: 'json',
        success: function (resp) {

            if (resp === '') {
                $("#modelo")
                    .find("option")
                    .remove()
                    .end()
                    .append("<option value='' disabled selected>Não há modelo disponível</option>")
                    .material_select();
            };

            $.each(resp.data, function (key, value) {

                $('#modelo').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.nome)
                );
                $("#modelo").attr("disabled", false);
                $('#modelo').material_select();

            });
            $("#loader").css('display', 'none');
            if (modeloId !== undefined) {
                $('#modelo').find('option[value="' + modeloId + '"]').prop('selected', true);
            };

        },
        error: function (textStatus, errorThrown) {
            console.log("errou");
        }
    });
}

function updateModelo(dados) {

    var data = new Object();
    data.id = dados.id;
    data.nome = $("#modeloNome").val();
    data.marcaId = dados.marcaId;


    //do AJAX request
    $("#modelo_form").validate();
    if ($("#modelo_form").valid()) {

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
                url: urlApi + "modelo/" + dados.id,
                data: data,
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    //Reload dataTable
                    $('#table-modelo').DataTable().ajax.reload();
                    $('#modal-modelo').modal('close');

                },
                error: function (textStatus, errorThrown) {
                    console.log("errou");
                }

            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

}

function createModelo(data) {

    //make AJAX request
    $("#modelo_form").validate();
    if ($("#modelo_form").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "modelo",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Modelo gravado com sucesso.",
                    "success");

                resetForm($("#modelo_form"));
            },

            error: function (textStatus, errorThrown) {
                console.log("errou");
            }

        });
    }
    //Reload Material Form
    Materialize.updateTextFields();

}

function deleteModelo(id) {
    swal({
            title: "Tem certeza?",
            text: "Esta ação excluirá o modelo de Veículo!",
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
                    url: urlApi + "modelo/" + id,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-modelo').DataTable().ajax.reload();
                        $('#modal-modelo').modal('close');
                    },

                    error: function (textStatus, errorThrown) {
                        console.log("errou");
                    }

                });

                swal("Excluído!", "O modelo foi excluído!", "success");

            } else {
                swal("Cancelado", "Nada foi modificado", "error");
                $('#modal-modelo').modal('close');
            }
        });

}
