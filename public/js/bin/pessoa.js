//Rules and Messages to Validate
$("#pessoa_form").validate({
    rules: {
        nome: {
            required: true,
            minlength: 3
        },
        pessoa: {
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
            required: "Preencha com o nome do novo pessoa",
            minlength: jQuery.validator.format("O nome do pessoa deve conter ao menos {0} caracteres")

        },
        pessoa: {
            required: "Preencha com o pessoa",
            minlength: jQuery.validator.format("O nome do pessoa deve conter ao menos {0} caracteres")

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

//Fill table pessoa
function getPessoaTable() {

    //Populates Table with Json
    table = $('table#table-pessoa').DataTable({
        ajax: {
            url: urlApi + "pessoa",
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json'
            
        },
        columns: [{
            data: "id"
                }, {
            data: "nome"
                }, {
            data: "pessoa"        
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
}

//Fill input to update
function getPessoa(id, inputType) {
    //    $('#pessoa-form').empty();

    $.ajax({
        type: "GET",
        url: urlApi + "pessoa/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (resp) {

            if (inputType == "select") {
                $("#pessoa").append(
                    $("<option></option>")
                    .attr('value', resp.data.id)
                    .text(resp.data.nome)
                    .prop('selected', true)

                );
                $("#pessoa").material_select();

            } else {

                $("#id").val(resp.data.id);
                $("#nome").val(resp.data.nome);
                $("#pessoa").val(resp.data.pessoa);
            }
            //Reload Material Form
            Materialize.updateTextFields();

        },

    });

};

//Delete function
function deletePessoa(id) {
    swal({
            title: "Tem certeza?",
            text: "Esta ação excluirá o usuário!",
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
                    url: urlApi + "pessoa/" + id,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-pessoa').DataTable().ajax.reload();
                        $('#modal-edit').modal('close');
                    },

                });

                swal("Excluído!", "O usuário foi excluído!", "success");
            } else {
                swal("Cancelado", "Nada foi modificado", "error");
                $('#modal-edit').modal('close');
            }
        });

};

//Create function
function createPessoa(data) {
    
    console.log(data);
    
    //make AJAX request
    validator = $("#pessoa_form").validate();
    if ($("#pessoa_form").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "pessoa",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Usuário gravado com sucesso.",
                    "success");

                resetForm($("#pessoa_form"));
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
function updatePessoa(data) {

    //do AJAX request
    validator = $("#pessoa_form").validate();
    if ($("#pessoa_form").valid()) {

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
                url: urlApi + "pessoa/" + data.id,
                data: data,
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    //Reload dataTable
                    $('#table-pessoa').DataTable().ajax.reload();
                    validator.resetForm();
                    $('#modal-edit').modal('close');

                },

            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

};

//Get pessoaes to fill a select
function getPessoas(id) {

    if (id == "null") {
        $('#pessoa').children().remove().end().append('<option value="" disable selected>Selecione o usuário</option>');
    }
    
    //Load Json pessoa
    $.ajax({
        url: urlApi + "pessoa",
        type: 'GET',
        dataType: 'json',
        success: function (resp) {

            $.each(resp.data, function (key, value) {

                $('#pessoa').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.pessoa)
                );

            });

            if (id !== "null") {
                $('#pessoa').find('option[value="' + id + '"]').prop('selected', true);
            }

            $('#pessoa').material_select();

            //Reload Material Form
            Materialize.updateTextFields();
        }
    });

};
 

