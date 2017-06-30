//Rules and Messages to Validate
$("#usuario_form").validate({
    rules: {
        nome: {
            required: true,
            minlength: 3
        },
        usuario: {
            required: true,
            minlength: 3
        },
        senha: {
            required: true,
            minlength: 3
        },
        confirmaSenha: {
            required: true,
            equalTo: "#senha"
        }

    },
    messages: {
        nome: {
            required: "Preencha com o nome do novo usuario",
            minlength: jQuery.validator.format("O nome do usuario deve conter ao menos {0} caracteres")

        },
        usuario: {
            required: "Preencha com o usuario",
            minlength: jQuery.validator.format("O nome do usuario deve conter ao menos {0} caracteres")

        },
        senha: {
            required: "A senha deve ter mais de três caracteres",
            minlength: jQuery.validator.format("A senha deve conter ao menos {0} caracteres")

        },
        confirmaSenha: {
            required: "Campo obrigatório",
            equalTo: "Senhas não conferem"
        }
    }
});

//Fill table usuario
function getUsuarioTable(tipo) {


    //Populates Table with Json
    var table = $('table#table-usuario').DataTable({
        ajax: {

            url: urlApi + "usuario",
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json'

        },
        columns: [{
            data: "nome",
            width: "30%"
                }, {
            data: "cpf",
            width: "25%"
                }, {
            data: "candidato",
            width: "15%",
            render: function (data) {
                if (data == "true") {
                    return '<i class="material-icons green-text">done</i>';
                } else {
                    return '<i class="material-icons red-text">clear</i>';
                }
            }
            }, {
            data: "eleitor",
            width: "20%",
            render: function (data) {
                if (data == "true") {
                    return '<i class="material-icons green-text">done</i>';
                } else {
                    return '<i class="material-icons red-text">clear</i>';
                }
            }
			}, {
            data: "responsavel",
            render: function (data) {
                if (data == "true") {
                    return '<i class="material-icons green-text">done</i>';
                } else {
                    return '<i class="material-icons red-text">clear</i>';
                }
            }
			}],

        select: true,
        responsive: true,
        fixedColumns: true,
        lengthChange: false,
        pageLength: 5,
        dom: 'lrti<"right"p>',
        language: {
            url: "../../doc/Portuguese-Brasil.json"
        }
    });
}


//Fill input to update
function getUsuario(id, inputType) {
    //    $('#usuario-form').empty();

    $.ajax({
        type: "GET",
        url: urlApi + "usuario/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (resp) {

            if (inputType == "select") {
                $("#usuario").append(
                    $("<option></option>")
                    .attr('value', resp.data.id)
                    .text(resp.data.nome)
                    .prop('selected', true)

                );
                $("#usuario").material_select();

            } else {

                $("#id").val(resp.data.id);
                $("#nome").val(resp.data.nome);
                $("#cpf").val(resp.data.cpf);
                $('#candidato').prop('checked', JSON.parse(resp.data.candidato));
                $('#eleitor').prop('checked', JSON.parse(resp.data.eleitor));
                $('#responsavel').prop('checked', JSON.parse(resp.data.responsavel));
            }
            //Reload Material Form
            Materialize.updateTextFields();

        },

    });

};

//Delete function
function deleteUsuario(id) {
    swal({
            title: "Tem certeza?",
            text: "Esta ação excluirá a usuario!",
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
                    url: urlApi + "usuario/" + id,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-usuario').DataTable().ajax.reload();
                        $('#modal-edit').modal('close');
                    },

                });

                swal("Excluído!", "Usuario excluída!", "success");
            } else {
                swal("Cancelado", "Nada foi modificado", "error");
                $('#modal-edit').modal('close');
            }
        });

};

//Create function
function createUsuario(data) {
    //make AJAX request
    validator = $("#usuario_form").validate();
    if ($("#usuario_form").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "usuario",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Usuario gravado com sucesso.",
                    "success");

                resetForm($("#usuario_form"));
                validator.resetForm();

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Erro!");
            }

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

};

//Update function
function updateUsuario(data) {

    //do AJAX request
    validator = $("#usuario_form").validate();
    if ($("#usuario_form").valid()) {

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
                url: urlApi + "usuario/" + data.id,
                data: data,
                dataType: "json",


                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    //Reload dataTable
                    $('#table-usuario').DataTable().ajax.reload();
                    validator.resetForm();
                    $('#modal-edit').modal('close');

                },

            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

};

//Get usuarioes to fill a select
function getUsuario(id) {

    if (id == "null") {
        $('#usuario').children().remove().end().append('<option value="" disable selected>Selecione o usuário</option>');
    }

    //Load Json usuario
    $.ajax({
        url: urlApi + "usuario",
        type: 'GET',
        dataType: 'json',
        success: function (resp) {

            $.each(resp.data, function (key, value) {

                $('#usuario').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.usuario)
                );

            });

            if (id !== "null") {
                $('#usuario').find('option[value="' + id + '"]').prop('selected', true);
            }

            $('#usuario').material_select();

            //Reload Material Form
            Materialize.updateTextFields();
        }
    });

};
