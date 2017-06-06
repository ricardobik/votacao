var qtdCandidato = 0;
var qtdEleitor = 0;
var qtdResponsavel = 0;
var votCandidato = [];


//Rules and Messages to Validate
$("#votacao_form_partial").validate({
    ignore: [],
    debug: true,
    rules: {
        titulo: {
            required: true
        },
        descricao: {
            required: true
        },
        datainicio: {
            required: true
        },
        datatermino: {
            required: true
        }
    },
    messages: {
        titulo: {
            required: "true"
        },
        descricao: {
            required: "true"
        },
        datainicio: {
            required: "true"
        },
        datatermino: {
            required: "true"
        }
    }
});

//Rules and Messages to Validate
$("#votacao_form").validate({
    ignore: [],
    debug: true,
    rules: {
        titulo: {
            required: true
        },
        descricao: {
            required: true
        },
        datainicio: {
            required: true
        },
        datatermino: {
            required: true
        }
    },
    messages: {
        titulo: {
            required: "true"
        },
        descricao: {
            required: "true"
        },
        datainicio: {
            required: "true"
        },
        datatermino: {
            required: "true"
        }
    }
});

//Create function
function createVotacao(data) {

    validator = $("#votacao_form_partial").validate();

    swal({
            title: "Deseja Cadastrar essa votação?",
            text: "A votação tem:\nCANDIDATOS: " + qtdCandidato + "\nELEITORES: " + qtdEleitor + "\nRESPONSÁVEIS: " + qtdResponsavel,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Sim, Tenho certeza!',
            cancelButtonText: "Não, Quero cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function (isConfirm) {

            if (isConfirm) {

                //make AJAX request
                if ($("#votacao_form_partial").valid()) {
                    $.ajax({
                        type: "POST",
                        url: urlApi + "votacao",
                        data: JSON.stringify(data),
                        dataType: "json",
                        contentType: "application/json",

                        //if received a response from the server
                        success: function (response) {
                            slideOut("#cardFirst", 1350, -800, more);
                            resetForm($("#votacao_form_partial"));
                            validator.resetForm();
                        }
                    });
                };

                swal("Shortlisted!", "Votação cadastrada!", "success");

            } else {
                swal("Cancelled", "Você cancelou a ação", "error");
            }
        });

    //Reload Material Form
    Materialize.updateTextFields();

};

function getVotacaoTable() {

    table_votacao = $('table#table-votacao').DataTable({
        ajax: {
            url: urlApi + "votacao",
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json'
        },
        columns: [{
            data: "titulo"
                }, {
            data: "datainicio"
                }, {
            data: "datatermino"
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

//Fill Votacao Modal to Edit
function getVotacao(id) {

    $.ajax({
        type: "GET",
        url: urlApi + "votacao/" + id,
        dataType: "json",

        //if received a response from the server
        success: function (resp) {

            $("#id").val(resp.data.id);
            $("#titulo").val(resp.data.titulo);
            $("#descricao").val(resp.data.descricao);
            $("#datainicio").val(resp.data.datainicio);
            $("#datatermino").val(resp.data.datatermino);

            votCandidato = resp.data.candidato;
            votResponsavel = resp.data.responsavel;
            votEleitor = resp.data.eleitor;
            
            //Reload Material Form
            Materialize.updateTextFields();

            //Load material dropbox
            $('select').material_select();

        }

    });

}

//Update function
function updateVotacao(id, data) {


    //do AJAX request
    $("#votacao_form").validate();
    if ($("#votacao_form").valid()) {

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
                url: urlApi + "votacao/" + id,
                data: data,
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    //Reload dataTable
                    $('#table-votacao').DataTable().ajax.reload();
                    $('#modal-edit').modal('close');

                }

            });

        });

    }
    //Reload Material Form
    Materialize.updateTextFields();

}

//Delete function
function deleteVotacao(id) {
    swal({
        title: "Tem certeza?",
        text: "Esta ação excluirá o votacao!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: 'btn-danger',
        confirmButtonText: 'Excluir',
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {

            $.ajax({
                type: "DELETE",
                url: urlApi + "votacao/" + id,
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    //Reload dataTable
                    $('#table-votacao').DataTable().ajax.reload();
                    $('#modal-edit').modal('close');
                }

            });

            swal("Excluído!", "A votação foi excluída!", "success");
        } else {
            swal("Cancelado", "Nada foi modificado", "error");
        }
    });

}
