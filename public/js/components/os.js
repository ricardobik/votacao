//Fill input to update
function getOs(id, inputType) {
    //    $('#pessoa-form').empty();

    $.ajax({
        type: "GET",
        url: urlApi + "os/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (resp) {

            if (inputType == "select") {
                $("#os").append(
                    $("<option></option>")
                    .attr('value', resp.data.id)
                    .text(resp.data.nome)
                    .prop('selected', true)

                );
                $("#os").material_select();

            } else {

                $("#placa").val(resp.data.placa);
                $("#prisma").val(resp.data.prisma);
                $("#cpf").val(resp.data.cpf);

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
            text: "Esta ação excluirá a pessoa!",
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

                swal("Excluído!", "Pessoa excluída!", "success");
            } else {
                swal("Cancelado", "Nada foi modificado", "error");
                $('#modal-edit').modal('close');
            }
        });

};

//Create function
function createOs(data) {
    //make AJAX request
    // validator = $("#os_form").validate();
    if ($("#os_form").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "os",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Os gravada com sucesso.",
                    "success");

                resetForm($("#os_form"));
                validator.resetForm();

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Erro!");
            }

        });

    }
    //Reload Material Form
    M.updateTextFields();

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
