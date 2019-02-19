//Rules and Messages to Validate
// $("#veiculo_form").validate({
//     rules: {
//         descricao: {
//             required: true,
//             minlength: 3
//         },
//         prefixo: {
//             required: true,
//             minlength: 3
//         },
//         placa: {
//             required: true,
//             minlength: 3
//         }
//     },
//     messages: {
//         descricao: {
//             required: "Preencha com o nome do novo usuario",
//             // minlength: jQuery.validator.format("O nome do usuario deve conter ao menos {0} caracteres")
//
//         },
//         Prefixo: {
//             required: "Preencha com o usuario",
//             // minlength: jQuery.validator.format("O nome do usuario deve conter ao menos {0} caracteres")
//
//         },
//         placa: {
//             required: "A senha deve ter mais de três caracteres",
//             // minlength: jQuery.validator.format("A senha deve conter ao menos {0} caracteres")
//
//         }
//     }
// });

//Fill table Veículo
function getVeiculoTable() {

  //Populates Table with Json
  table = $('table#table-veiculo').DataTable({
    ajax: {
      type: 'GET',
      url: urlApi + "veiculo",
      contentType: 'application/json; charset=UTF-8',
      dataType: 'json',
      dataSrc: ''
    },
    columns: [
      {title: "ID", data: "id", "visible": false},
      {
        title: "DESCRIÇÃO",
        data: "descricao"
      },
      {
        title: "PREFIXO",
        data: "prefixo"
      },
      {
        title: "PLACA",
        data: "placa"
      }
    ],

    select: true,
    responsive: true,
    fixedColumns: true,
    lengthChange: false,
    pageLength: 5,
    dom: 'lrti<"center"p>',
    language: {
      url: "../../doc/Portuguese-Brasil.json"
    }
  });
};

// //Delete function
function deleteVeiculo(id) {
    swal({
            title: "Tem certeza?",
            text: "Esta ação excluirá o veículo cadastrado!",
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
                    url: urlApi + "veiculo/" + id,
                    dataType: "json",

                    //if received a response from the server
                    success: function (response) {
                        //Reload dataTable
                        $('#table-veiculo').DataTable().ajax.reload();
                        $('#modal-edit').modal('close');
                    },

                });

                swal("Excluído!", "Veículo excluído!", "success");
            } else {
                swal("Cancelado", "Nada foi modificado", "error");
                $('#modal-edit').modal('close');
            }
        });

};

// //Create function
function createVeiculo(data) {
  //make AJAX request
  // validator = $("#veiculo_form").validate();
  // if ($("#veiculo_form").valid()) {
  $.ajax({
    type: "POST",
    url: urlApi + "veiculo",
    data: data,
    dataType: "json",

    //if received a response from the server
    success: function(response) {
      swal("Pronto!",
        "Veículo gravado com sucesso.",
        "success");

      resetForm($("#veiculo_form"));
      // validator.resetForm();

    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert("Erro!");
    }

  });

  // }
  //Reload Material Form
  M.updateTextFields();

};
//
// //Update function
function updateVeiculo(data) {

    //do AJAX request
    // validator = $("#veiculo_form").validate();
    // if ($("#usuario_form").valid()) {

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
                url: urlApi + "veiculo/" + data.id,
                data: JSON.stringify(data),
                dataType: "json",

                //if received a response from the server
                success: function (response) {
                    swal("Pronto!",
                        "As alterações foram salvas com sucesso.",
                        "success");

                    //Reload dataTable
                    $('#table-veiculo').DataTable().ajax.reload();
                    // validator.resetForm();
                    $('#modal-edit').modal('close');

                },

            });

        });

    // }
    //Reload Material Form
    M.updateTextFields();

};

// //Get usuarioes to fill a select
function getVeiculo(id) {

  //Load Json usuario
  $.ajax({
    url: urlApi + "veiculo/" + id,
    type: 'GET',
    dataType: 'json',
    success: function(resp) {

      $("#descricao").val(resp.descricao);
      $("#prefixo").val(resp.prefixo);
      $("#placa").val(resp.placa);

      //Reload Material Form
      M.updateTextFields();
    }
  });
};
