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

//var tblCandidatoselecionado = $('table#candidato-selecionado').DataTable();
//var tblEleitorselecionado = $('table#eleitor-selecionado').DataTable();
//var tblResponsavelSelecionado = $('table#responsavel-selecionado').DataTable();

//var tableCandidato = $('table#table-candidato').DataTable();
//var tableEleitor = $('table#table-eleitor').DataTable();
//var tableResponsavel = $('table#table-responsavel').DataTable();

//Fill table pessoa
function getPessoaTable(tipo) {
    

    if (!!tipo) {
        var url = urlApi + 'pessoa?' + tipo + '=true';
        var tabela = 'table#table-' + tipo + '';
        
        if ( $.fn.DataTable.fnIsDataTable(tabela) ) {
//            console.log("já existe");
        }
        //Populates Table with Json

        switch (tipo) {
            case "candidato":
                tableCandidato = $('table#table-' + tipo).DataTable({
                    destroy: true,
                    ajax: {

                        url: url,
                        contentType: 'application/json; charset=UTF-8',
                        dataType: 'json'

                    },
                    columns: [
                        {
                            data: "id",
                            visible: true,
                            searchable: false,
                            width: "10%"
			             },
                        {
                            data: "nome",
                            width: "40%"
			             },
                        {
                            data: "cpf",
                            width: "40%"
                        },
                        {
                            data: null,
                            render: function (data, type, full, meta) {
                                return '<a href="#" class=" table-action btn-add"><i class="material-icons green-text">add</i></a>';
                            },
                            searchable: false
			             }],
                    fnInitComplete: function (oSettings, json) {
                        var row = tableCandidato.row();
                        var rowNode = row.node();
                        var remove;

                        var arr = [];

                        tableCandidato.rows().every(function (rowIdx, tableLoop, rowLoop) {
                            var d = this.data();

                            $.each(votCandidato, function (index, value) {
                                if (d.id == votCandidato[index]) {
                                    obj = new Object();
                                    obj.Candidato = d;
                                    obj.Remove = rowIdx;
                                    arr[index] = obj;
                                }
                            });

                        });

                        tblCandidatoselecionado = $('table#candidato-selecionado').DataTable({
                            destroy: true,

                            columns: [{
                                data: "id",
                                visible: true,
                                searchable: false,
                                width: "10%"
			             }, {
                                data: "nome",
                                width: "40%"
			             }, {
                                data: "cpf",
                                width: "40%"
                         }, {
                                data: null,
                                render: function (data, type, full, meta) {
                                    return '<a href="#" class=" table-action btn-remove"><i class="material-icons red-text">remove</i></a>';
                                },
                                searchable: false
			            }],
                            fnInitComplete: function (oSettings, json) {
                                var remove = [];
                                tblCandidatoselecionado.clear();
                                $.each(arr, function (index, value) {
                                    tblCandidatoselecionado.row.add(value.Candidato).draw(false);
                                    remove[index] = value.Remove;
                                });
                                tableCandidato.rows(remove).remove().draw(false);
                            },
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


                    },
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
                break;
            case "eleitor":
                tableEleitor = $('table#table-' + tipo).DataTable({
                    destroy: true,
                    ajax: {
                        url: url,
                        contentType: 'application/json; charset=UTF-8',
                        dataType: 'json'
                    },
                    columns: [{
                        data: "id",
                        visible: true,
                        searchable: false,
                        width: "10%"
			}, {
                        data: "nome",
                        width: "40%"
			}, {
                        data: "cpf",
                        width: "40%"
            }, {
                        data: null,
                        render: function (data, type, full, meta) {
                            return '<a href="#" class=" table-action btn-add"><i class="material-icons green-text">add</i></a>';
                        },
                        searchable: false
			}],
                    fnInitComplete: function (oSettings, json) {
                        var row = tableEleitor.row();
                        var rowNode = row.node();
                        var remove;
                        var arr = [];

                        tableEleitor.rows().every(function (rowIdx, tableLoop, rowLoop) {
                            var d = this.data();

                            $.each(votEleitor, function (index, value) {
                                if (d.id == votEleitor[index]) {
                                    obj = new Object();
                                    obj.Eleitor = d;
                                    obj.Remove = rowIdx;
                                    arr[index] = obj;

                                }
                            });

                        });

                        tblEleitorselecionado = $('table#eleitor-selecionado').DataTable({
                            destroy: true,

                            columns: [{
                                data: "id",
                                visible: true,
                                searchable: false,
                                width: "10%"
			             }, {
                                data: "nome",
                                width: "40%"
			             }, {
                                data: "cpf",
                                width: "40%"
                         }, {
                                data: null,
                                render: function (data, type, full, meta) {
                                    return '<a href="#" class=" table-action btn-remove"><i class="material-icons red-text">remove</i></a>';
                                },
                                searchable: false
			            }],
                            fnInitComplete: function (oSettings, json) {

                                var remove = [];
                                tblEleitorselecionado.clear();
                                $.each(arr, function (index, value) {
                                    tblEleitorselecionado.row.add(value.Eleitor).draw(false);
                                    remove[index] = value.Remove;
                                });
                                tableEleitor.rows(remove).remove().draw(false);
                            },
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


                    },
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
                break;
            case "responsavel":
                tableResponsavel = $('table#table-' + tipo).DataTable({
                    destroy: true,
                    ajax: {
                        url: url,
                        contentType: 'application/json; charset=UTF-8',
                        dataType: 'json'
                    },
                    columns: [{
                        data: "id",
                        visible: true,
                        searchable: false,
                        width: "10%"
			}, {
                        data: "nome",
                        width: "40%"
			}, {
                        data: "cpf",
                        width: "40%"
            }, {
                        data: null,
                        render: function (data, type, full, meta) {
                            return '<a href="#" class=" table-action btn-add"><i class="material-icons green-text">add</i></a>';
                        },
                        searchable: false
			}],
                    fnInitComplete: function (oSettings, json) {
                        var row = tableResponsavel.row();
                        var rowNode = row.node();
                        var remove;
                        var arr = [];

                        tableResponsavel.rows().every(function (rowIdx, tableLoop, rowLoop) {
                            var d = this.data();

                            $.each(votResponsavel, function (index, value) {
                                if (d.id == votResponsavel[index]) {
                                    obj = new Object();
                                    obj.Responsavel = d;
                                    obj.Remove = rowIdx;
                                    arr[index] = obj;

                                }
                            });

                        });

                        tblResponsavelSelecionado = $('table#responsavel-selecionado').DataTable({
                            destroy: true,

                            columns: [{
                                data: "id",
                                visible: true,
                                searchable: false,
                                width: "10%"
			             }, {
                                data: "nome",
                                width: "40%"
			             }, {
                                data: "cpf",
                                width: "40%"
                         }, {
                                data: null,
                                render: function (data, type, full, meta) {
                                    return '<a href="#" class=" table-action btn-remove"><i class="material-icons red-text">remove</i></a>';
                                },
                                searchable: false
			            }],
                            fnInitComplete: function (oSettings, json) {

                                var remove = [];
                                tblResponsavelSelecionado.clear();
                                $.each(arr, function (index, value) {
                                    tblResponsavelSelecionado.row.add(value.Responsavel).draw(false);
                                    remove[index] = value.Remove;
                                });
                                tableResponsavel.rows(remove).remove().draw(false);

                                qtdCandidato = tblCandidatoselecionado.rows().count();
                                qtdEleitor = tblEleitorselecionado.rows().count();
                                qtdResponsavel = tblResponsavelSelecionado.rows().count();
                            },
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


                    },
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
                break;
            default:
                //                code block
        }

    } else {
        //Populates Table with Json
        var table = $('table#table-pessoa').DataTable({
            ajax: {

                url: urlApi + "pessoa",
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
function createPessoa(data) {
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
                    "Pessoa gravado com sucesso.",
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
