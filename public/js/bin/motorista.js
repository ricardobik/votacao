//Rules and Messages to Validate
$("#motorista_form").validate({
    ignore: [],
    //    debug: true,
    rules: {
        nome: {
            required: true,
            minlength: 3
        },
        cnh: {
            required: true,
            rangelength: [11, 11],
            digits: true
        },
        cnh_vencimento: {
            required: true
        },
        setor: {
            required: true
        }
    },
    messages: {
        nome: {
            required: "O campo nome deve ser preenchido",
            minlength: jQuery.validator.format("O nome do motorista deve conter ao menos {0} caracteres")
        },
        cnh: {
            required: "O número da CNH do motorista deve ser prenchido",
            rangelength: "O número da CNH deve conter onze digitos",
            digits: "O campo CNH só pode conter números"

        },
        cnh_vencimento: {
            required: "A data de vencimento da CNH deve ser preenchida"
        },
        setor: {
            required: "Selecione um setor válido"
        }
    }
});

//Fill motorista Modal to Edit
function getMotorista(Id) {

    $.ajax({
        type: "GET",
        url: urlApi + "motorista/" + Id,

        dataType: "json",

        //if received a response from the server
        success: function (resp) {

            $("#motoristaId").val(resp.data.id);
            $("#nome").val(resp.data.nome);
            $("#cnh").val(resp.data.cnh);
            $("#cnh_vencimento").val(resp.data.cnh_vencimento);
            $("#telefone").val(resp.data.telefone);

            getSetores(resp.data.setor);

            //Reload Material Form
            Materialize.updateTextFields();


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro!");

        }

    });

};

//Delete function
function deleteMotorista(id) {
    swal({
            title: "Tem certeza?",
            text: "Esta ação excluirá o motorista!",
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
                    url: urlApi + "motorista/" + id,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-motorista').DataTable().ajax.reload();
                        $('#modal-edit').modal('close');
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("Erro!");
                    }

                });

                swal("Excluído!", "O motorista foi excluído!", "success");
            } else {
                swal("Cancelado", "Nada foi modificado", "error");
            }
        });

};

//Create function
function createMotorista(data) {

    //make AJAX request
    validator = $("#motorista_form").validate();
    if ($("#motorista_form").valid()) {
        $.ajax({
            type: "POST",
            url: urlApi + "motorista",
            data: data,
            dataType: "json",

            //if received a response from the server
            success: function (response) {
                swal("Pronto!",
                    "Motorista gravado com sucesso.",
                    "success");

                resetForm($("#motorista_form"));
                getSetores("null");
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
function updateMotorista(id, data) {

    //do AJAX request
    validator = $("#motorista_form").validate();
    if ($("#motorista_form").valid()) {

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
                url: urlApi + "motorista/" + id,
                data: data,
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    //Reload dataTable
                    $('#table-motorista').DataTable().ajax.reload();
//                    validator.resetForm();
                    $('#modal-edit').modal('close');

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Erro!");
                }
            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

};

//Fill table to search motorista
function getMotoristaTable() {

    table = $('table#table-motorista').DataTable({
        ajax: {
            url: urlApi + "motorista",
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json'
        },
        columns: [{
            data: "id"
                }, {
            data: "nome"
                }, {
            data: "cnh"
                }, {
            data: "telefone"
                }],
        "columnDefs": [{
            "width": "10%",
            "targets": 0
                }, {
            "width": "30%",
            "targets": 1
                }, {
            "width": "30%",
            "targets": 2
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
