//Rules and Messages to Validate
$("#combustivel_form").validate({
    //    ignore: [],
    debug: true,
    rules: {
        combustivelTipo: {
            required: true,
            minlength: 3
        }
    },
    messages: {
        combustivelTipo: {
            required: "Preencha corretamente o campo",
            minlength: jQuery.validator.format("O nome do setor deve conter ao menos {0} caracteres")
        }
    }
});

//Fill combustivel imput to update/delete
function getCombustivel(id, inputType) {

    $.ajax({
        type: "GET",
        url: urlApi + "combustivel/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (resp) {

            $("#combustivelId").val(resp.data.id);
            $("#combustivelTipo").val(resp.data.tipo);

            //Reload Material Form
            Materialize.updateTextFields();

        },

    });

};

//fill table combustivel to search table
function getCombustivelTable() {
    //Populates Table with Json
    tableCombustivel = $('table#table-combustivel').DataTable({
        ajax: {
            url: urlApi + "combustivel",
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json'
        },
        columns: [{
            data: "id"
                }, {
            data: "tipo"
                }],
        columnDefs: [
            {
                width: '20%',
                targets: 'combIdCol'
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

//insert into select to create veiculo
function getCombustiveis() {

    //Load Json marca
    $.ajax({
        url: urlApi + "combustivel",

        type: 'GET',
        dataType: 'json',
        success: function (resp) {

            $.each(resp.data, function (key, value) {

                $('#combustivel').append(
                    $("<option></option>")
                    .attr('value', value.id)
                    .text(value.tipo)
                );
                $('#combustivel').material_select();

            });

        }
    });
};

//Create function
function createCombustivel(data) {

    //make AJAX request
    $("#combustivel_form").validate();
    if ($("#combustivel_form").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "combustivel",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Combustivel gravado com sucesso.",
                    "success");

                resetForm($("#combustivel_form"));

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
function updateCombustivel(id, dados) {

    var data = new Object();
    data.tipo = $("#combustivelTipo").val();
    data.id = id;

    //do AJAX request
    $("#combustivel_form").validate();
    if ($("#combustivel_form").valid()) {

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
                url: urlApi + "combustivel/" + id,
                data: data,
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    //Reload dataTable
                    $('#table-combustivel').DataTable().ajax.reload();
                    $('#modal-combustivel').modal('close');

                },

            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

};

//Delete function
function deleteCombustivel(id) {
    swal({
            title: "Tem certeza?",
            text: "Esta ação excluirá o combustivel!",
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
                    url: urlApi + "combustivel/" + id,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-combustivel').DataTable().ajax.reload();
                        $('#modal-combustivel').modal('close');
                    },

                });

                swal("Excluído!", "O combustível foi excluído!", "success");

            } else {
                swal("Cancelado", "Nada foi modificado", "error");
                $('#modal-combustivel').modal('close');
            }
        });

};
