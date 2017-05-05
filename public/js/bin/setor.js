//Rules and Messages to Validate
$("#setor_form").validate({
    rules: {
        nome: {
            required: true,
            minlength: 3
        },
        setorNome: {
            required: true,
            minlength: 3
        }
    },
    messages: {
        nome: {
            required: "Preencha com o nome do novo setor",
            minlength: jQuery.validator.format("O nome do setor deve conter ao menos {0} caracteres")

        },
        setorNome: {
            required: "Preencha com o nome do novo setor",
            minlength: jQuery.validator.format("O nome do setor deve conter ao menos {0} caracteres")

        }
    }
});

//Fill table setor
function getSetorTable() {

    //Populates Table with Json
    table = $('table#table-setor').DataTable({
        ajax: {
            url: urlApi + "setor",
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
}

//Fill input to update
function getSetor(id, inputType) {
    //    $('#setor-form').empty();

    $.ajax({
        type: "GET",
        url: urlApi + "setor/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (resp) {

            if (inputType == "select") {
                $("#setor").append(
                    $("<option></option>")
                    .attr('value', resp.data.id)
                    .text(resp.data.nome)
                    .prop('selected', true)

                );
                $("#setor").material_select();

            } else {

                $("#id").val(resp.data.id);
                $("#nome").val(resp.data.nome);
            }
            //Reload Material Form
            Materialize.updateTextFields();

        },

    });

};

//Delete function
function deleteSetor(id) {
    swal({
            title: "Tem certeza?",
            text: "Esta ação excluirá o setor!",
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
                    url: urlApi + "setor/" + id,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-setor').DataTable().ajax.reload();
                        $('#modal-edit').modal('close');
                    },

                });

                swal("Excluído!", "O setor foi excluído!", "success");
            } else {
                swal("Cancelado", "Nada foi modificado", "error");
                $('#modal-edit').modal('close');
            }
        });

};

//Create function
function createSetor(data) {

    //make AJAX request
    validator = $("#setor_form").validate();
    if ($("#setor_form").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "setor",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Setor gravado com sucesso.",
                    "success");

                resetForm($("#setor_form"));
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
function updateSetor(data) {

    //do AJAX request
    validator = $("#setor_form").validate();
    if ($("#setor_form").valid()) {

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
                url: urlApi + "setor/" + data.id,
                data: data,
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    //Reload dataTable
                    $('#table-setor').DataTable().ajax.reload();
                    validator.resetForm();
                    $('#modal-edit').modal('close');

                },

            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

};

//Get Setores to fill a select
function getSetores(id) {

    if (id == "null") {
        $('#setor').children().remove().end().append('<option value="" disable selected>Selecione o setor</option>');
    }
    
    //Load Json setor
    $.ajax({
        url: urlApi + "setor",
        type: 'GET',
        dataType: 'json',
        success: function (resp) {

            $.each(resp.data, function (key, value) {

                $('#setor').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.nome)
                );

            });

            if (id !== "null") {
                $('#setor').find('option[value="' + id + '"]').prop('selected', true);
            }

            $('#setor').material_select();

            //Reload Material Form
            Materialize.updateTextFields();
        }
    });

};
 

