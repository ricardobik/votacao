var qtdCandidato, qtdEleitor, qtdResponsavel = 0;

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
			confirmButtonText: 'Yes, I am sure!',
			cancelButtonText: "No, cancel it!",
			closeOnConfirm: false,
			closeOnCancel: false
		},
		function (isConfirm) {
			if (!isConfirm) return;
			//make AJAX request
			if ($("#votacao_form_partial").valid()) {
				$.ajax({
					type: "POST",
					url: urlApi + "votacao",
					data: data,
					dataType: "json",

					//if received a response from the server
					success: function (response) {
						resetForm($("#votacao_form_partial"));
						validator.resetForm();

					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						alert("Erro!");
					}

				});

			}
		});


	//Reload Material Form
	Materialize.updateTextFields();

};


function getVotacaoTable() {

	table = $('table#table-votacao').DataTable({
		ajax: {
			url: urlApi + "votacao",
			contentType: 'application/json; charset=UTF-8',
			dataType: 'json'
		},
		columns: [{
			data: "id"
                }, {
			data: "marcaid"
                }, {
			data: "modeloid"
                }, {
			data: "placa"
                }],
		"columnDefs": [{
			"width": "10%",
			"targets": 0
                }, {
			"width": "30%",
			"targets": 1
                }, {
			"width": "40%",
			"targets": 2
                }, {
			"width": "50%",
			"targets": 3
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

//Fill motorista Modal to Edit
function getVotacao(Id) {

	$.ajax({
		type: "GET",
		url: urlApi + "votacao/" + Id,

		dataType: "json",

		//if received a response from the server
		success: function (resp) {

			$("#id").val(resp.data.id);
			$("#tipo").val(resp.data.tipoid);
			$("#placa").val(resp.data.placa);

			getMarca(resp.data.marcaid, "select")

			getModelo(resp.data.modeloid, "select");

			getCombustiveis(resp.data.combustivelid);

			getSetor(resp.data.setorid, "select");

			$("#anofabricacao").val(resp.data.anofabricacao);
			$("#combustivel").val(resp.data.combustivelid);
			$("#renavam").val(resp.data.renavam);
			$("#estadovotacao").val(resp.data.estadovotacao);
			$("#info").val(resp.data.info);

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
