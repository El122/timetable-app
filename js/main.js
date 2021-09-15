function tableAss(id) {
	$(id).DataTable({
		language: {
			"processing": "Подождите...",
			"search": "Поиск:",
			"lengthMenu": "Показать _MENU_ записей",
			"info": "Записи с _START_ до _END_ из _TOTAL_ записей",
			"infoEmpty": "Записи с 0 до 0 из 0 записей",
			"infoFiltered": "(отфильтровано из _MAX_ записей)",
			"infoPostFix": "",
			"loadingRecords": "Загрузка записей...",
			"zeroRecords": "Записи отсутствуют.",
			"emptyTable": "В таблице отсутствуют данные",
			"paginate": {
				"first": "Первая",
				"previous": "Предыдущая",
				"next": "Следующая",
				"last": "Последняя"
			},
			"aria": {
				"sortAscending": ": активировать для сортировки столбца по возрастанию",
				"sortDescending": ": активировать для сортировки столбца по убыванию"
			}
		}
	});
}

// setTimeout("$('div.cookie').slideDown(300)", 3000);

$('button#yescookie').click(function() {
	$.cookie('cookie', 'yes', { expires: 30 });
	$('div.cookie').slideUp(300);
});

$(function () {
	$('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function() {
	$("#authModalButt1").animatedModal({color: '#fff'});
	$("#buttmodalauth1").animatedModal({color: '#fff'});
	$("#buttmodalauth2").animatedModal({color: '#fff'});
	$("#buttmodalauth3").animatedModal({color: '#fff'});
	$("#buttmodalauth4").animatedModal({color: '#fff'});
});

$('a#newUser').click(function() {
	$('div#newUserInfo').slideToggle(200);
});

$('form#authForm').submit(function(e) {
	e.preventDefault();
	var form = $(this).serialize();

	$.ajax({
		url: '/',
		type: 'POST',
		data: form,
		success: function(res) {
			res = JSON.parse(res);
			if (res.yesAuth == 'passFalse') {
				$('form#authForm > input[type="password"]').val('');
				$('div#authRes').slideDown(300);
				setTimeout(() => { $('div#authRes').slideUp(300); }, 5000);
			}
			if (res.yesAuth == 'yes') {
				$.cookie('surname', res.surname, { expires: 7 });
				$.cookie('name', res.name, { expires: 7 });
				$.cookie('patr', res.patr, { expires: 7 });
				$.cookie('id', res.id, { expires: 7 });
				$.cookie('uuid', res.uuid, { expires: 7 });
				$.cookie('photo', res.photo, { expires: 7 });
				$.cookie('role', res.role, { expires: 7 });
				$.cookie('is_admin', res.is_admin, { expires: 7 });
				window.location.href = '/';
			}
		}
	});
});

switch(list) {
	case 'main':
	$(document).ready(function() {
		$("#authModalButt2").animatedModal({color: '#fff'});
		$("#authModalButt3").animatedModal({color: '#fff'});
		$("#authModalButt4").animatedModal({color: '#fff'});
	});

	$('a#norole').click(function(e) {
		e.preventDefault();
		$('div#norole').toast('show');
	});
	break;

	case 'entrant':

	$(document).ready(function() {
		$("#authModal5").animatedModal({color: '#fff'});
	});

	$('form#loginAbt').submit(function(e) {
		e.preventDefault();
		var info = $(this).serialize();
		$('div.overlay').hide().fadeIn(300);

		$.ajax({
			url: '/entrant',
			type: 'POST',
			data: info,
			success: function(res) {
				$('div.overlay').hide();
				if (res != 'no') {
					$('table#abt').hide().slideDown(300);
					$('#abt').dataTable().fnDestroy();
					$('table#abt > tbody').html(res);
					
					tableAss("#abt");
				}
			}
		});
	});
	break;

	case 'attendance':
	$('form#period').submit(function(e) {
		e.preventDefault();
		var info = $(this).serialize();
		$('div.overlay').hide().fadeIn(300);

		$.ajax({
			url: '/attendance',
			type: 'POST',
			data: info,
			success: function(res) {
				$('div.overlay').hide();
				if (res != 'no') $('div#atten').text('').html(res);
			}
		});
	});
	break;

	case 'rasp':
	$('a.link').click(function(e) {
		e.preventDefault();
		var item = $(this).text();

		switch(item) {
			case 'Учебные группы':
			$('a.link').removeClass('active');
			$(this).addClass('active');
			$('div.items').fadeOut(300);
			setTimeout(() => {  $('div#study').hide().fadeIn(300); }, 300);
			break;

			case 'Преподаватели':
			$('a.link').removeClass('active');
			$(this).addClass('active');
			$('div.items').fadeOut(300);
			setTimeout(() => {  $('div#prepod').hide().fadeIn(300); }, 300);
			break;

			case 'Аудитории':
			$('a.link').removeClass('active');
			$(this).addClass('active');
			$('div.items').fadeOut(300);
			setTimeout(() => {  $('div#cabs').hide().fadeIn(300); }, 300);
			break;

			case 'Общее':
			$('a.link').removeClass('active');
			$(this).addClass('active');
			$('div.items').fadeOut(300);
			setTimeout(() => {  $('div#all').hide().fadeIn(300); }, 300);
			break;
		}
	});
	$('input[name="studytype"]').click(function() {
		$('input[name="studytype"]').prop('checked', false);
		$(this).prop('checked', true);
	});
	$('input[name="prepodtype"]').click(function() {
		$('input[name="prepodtype"]').prop('checked', false);
		$(this).prop('checked', true);
	});
	$('input[name="cabtype"]').click(function() {
		$('input[name="cabtype"]').prop('checked', false);
		$(this).prop('checked', true);
	});
	$('input[name="alltype"]').click(function() {
		$('input[name="alltype"]').prop('checked', false);
		$(this).prop('checked', true);
	});

	$('input#date').click(function() {
		$('input[name="studytype"]').prop('checked', false);
		$('input#datesg').prop('checked', true);
	});

	$('input#dateprepod').click(function() {
		$('input[name="prepodtype"]').prop('checked', false);
		$('input#datesp').prop('checked', true);
	});
	$('input#datecab').click(function() {
		$('input[name="cabtype"]').prop('checked', false);
		$('input#datesa').prop('checked', true);
	});
	$('input#dateall').click(function() {
		$('input[name="alltype"]').prop('checked', false);
		$('input#datesc').prop('checked', true);
	});

	$('input[name="studytype"]').click(function() {
		var item = $(this).val();
		var type = $(this).attr('data-type');
		
		switch(item){
			case '1':
			// $('input#date[data-type="'+type+'"]').attr('disabled', 'disabled');
			var d=new Date();
			var day=d.getDate();
			var month=d.getMonth() + 1;
			if (month >= 0 && month <= 9) {month='0' + month;}
			if (day >= 0 && day <= 9) {day='0' + day;}
			var year=d.getFullYear();
			$('input#date[data-type="'+type+'"]').attr('value', year+'-'+month+'-'+day);
			break;

			case '2':
			// $('input#date[data-type="'+type+'"]').attr('disabled', 'disabled');
			var d=new Date();
			var day=d.getDate() + 1;
			var month=d.getMonth() + 1;
			if (month >= 0 && month <= 9) {month='0' + month;}
			if (day >= 0 && day <= 9) {day='0' + day;}
			var year=d.getFullYear();
			$('input#date[data-type="'+type+'"]').attr('value', year+'-'+month+'-'+day);
			break;

			// case '3':
			// $('input#date[data-type="'+type+'"]').attr('disabled', 'disabled');
			// break;

			case '4':
			$('input#date[data-type="'+type+'"]').removeAttr('disabled');
			break;
		}
	});

	$('input[name="prepodtype"]').click(function() {
		var item = $(this).val();
		var type = $(this).attr('data-type');
		
		switch(item){
			case '1':
			// $('input#dateprepod[data-type="'+type+'"]').attr('disabled', 'disabled');
			var d=new Date();
			var day=d.getDate();
			var month=d.getMonth() + 1;
			if (month >= 0 && month <= 9) {month='0' + month;}
			if (day >= 0 && day <= 9) {day='0' + day;}
			var year=d.getFullYear();
			$('input#dateprepod[data-type="'+type+'"]').attr('value', year+'-'+month+'-'+day);
			break;

			case '2':
			// $('input#dateprepod[data-type="'+type+'"]').attr('disabled', 'disabled');
			var d=new Date();
			var day=d.getDate() + 1;
			var month=d.getMonth() + 1;
			if (month >= 0 && month <= 9) {month='0' + month;}
			if (day >= 0 && day <= 9) {day='0' + day;}
			var year=d.getFullYear();
			$('input#dateprepod[data-type="'+type+'"]').attr('value', year+'-'+month+'-'+day);
			break;

			// case '3':
			// $('input#date[data-type="'+type+'"]').attr('disabled', 'disabled');
			// break;

			case '4':
			$('input#dateprepod[data-type="'+type+'"]').removeAttr('disabled');
			break;
		}
	});

	$('input[name="cabtype"]').click(function() {
		var item = $(this).val();
		var type = $(this).attr('data-type');
		
		switch(item){
			case '1':
			// $('input#datecab[data-type="'+type+'"]').attr('disabled', 'disabled');
			var d=new Date();
			var day=d.getDate();
			var month=d.getMonth() + 1;
			if (month >= 0 && month <= 9) {month='0' + month;}
			if (day >= 0 && day <= 9) {day='0' + day;}
			var year=d.getFullYear();
			$('input#datecab[data-type="'+type+'"]').attr('value', year+'-'+month+'-'+day);
			break;

			case '2':
			// $('input#datecab[data-type="'+type+'"]').attr('disabled', 'disabled');
			var d=new Date();
			var day=d.getDate() + 1;
			var month=d.getMonth() + 1;
			if (month >= 0 && month <= 9) {month='0' + month;}
			if (day >= 0 && day <= 9) {day='0' + day;}
			var year=d.getFullYear();
			$('input#datecab[data-type="'+type+'"]').attr('value', year+'-'+month+'-'+day);
			break;

			// case '3':
			// $('input#date[data-type="'+type+'"]').attr('disabled', 'disabled');
			// break;

			case '4':
			$('input#datecab[data-type="'+type+'"]').removeAttr('disabled');
			break;
		}
	});

	$('input[name="alltype"]').click(function() {
		var item = $(this).val();
		var type = $(this).attr('data-type');
		
		switch(item){
			case '1':
			// $('input#datecab[data-type="'+type+'"]').attr('disabled', 'disabled');
			var d=new Date();
			var day=d.getDate();
			var month=d.getMonth() + 1;
			if (month >= 0 && month <= 9) {month='0' + month;}
			if (day >= 0 && day <= 9) {day='0' + day;}
			var year=d.getFullYear();
			$('input#dateall[data-type="'+type+'"]').attr('value', year+'-'+month+'-'+day);
			break;

			case '2':
			// $('input#datecab[data-type="'+type+'"]').attr('disabled', 'disabled');
			var d=new Date();
			var day=d.getDate() + 1;
			var month=d.getMonth() + 1;
			if (month >= 0 && month <= 9) {month='0' + month;}
			if (day >= 0 && day <= 9) {day='0' + day;}
			var year=d.getFullYear();
			$('input#dateall[data-type="'+type+'"]').attr('value', year+'-'+month+'-'+day);
			break;

			// case '3':
			// $('input#date[data-type="'+type+'"]').attr('disabled', 'disabled');
			// break;

			case '4':
			$('input#dateall[data-type="'+type+'"]').removeAttr('disabled');
			break;
		}
	});


	$('form#rasp_group').submit(function(e) {
		e.preventDefault();
		var info = $(this).serialize();
		$('div.overlay').hide().fadeIn(300);

		$.ajax({
			url: '/rasp',
			type: 'POST',
			data: info,
			success: function(res) {
				$('div.overlay').hide();
				if (res != 'no') {
					$('div#fullrasp').show(0).text('').html(res);
				} else {
					$('#nofullform').toast('show');
				}
			}
		});
	});

	$('form#rasp_prepod').submit(function(e) {
		e.preventDefault();
		var info = $(this).serialize();
		$('div.overlay').hide().fadeIn(300);

		$.ajax({
			url: '/rasp',
			type: 'POST',
			data: info,
			success: function(res) {
				$('div.overlay').hide();
				if (res != 'no') {
					$('div#fullrasp').show(0).text('').html(res);
				} else {
					$('#nofullform').toast('show');
				}
			}
		});
	});

	$('form#rasp_cabs').submit(function(e) {
		e.preventDefault();
		var info = $(this).serialize();
		$('div.overlay').hide().fadeIn(300);

		$.ajax({
			url: '/rasp',
			type: 'POST',
			data: info,
			success: function(res) {
				$('div.overlay').hide();
				if (res != 'no') {
					$('div#fullrasp').show(0).text('').html(res);
				} else {
					$('#nofullform').toast('show');
				}
			}
		});
	});

	$('form#rasp_all').submit(function(e) {
		e.preventDefault();
		var info = $(this).serialize();
		$('div.overlay').hide().fadeIn(300);

		$.ajax({
			url: '/rasp',
			type: 'POST',
			data: info,
			success: function(res) {
				$('div.overlay').hide();
				if (res != 'no') {
					$('div#fullrasp').show(0).text('').html(res);
				} else {
					$('#nofullform').toast('show');
				}
			}
		});
	});
	break;

	case 'profile':
	$(document).ready(function() {
		$("#apiKeyButt").animatedModal({color: '#fff'});
	});

	$(function($){
		$("#phone").mask("+7 (999) 999-9999");
	});

	$('form#apikeyForm').submit(function(e) {
		e.preventDefault();
		var info = $(this).serialize();

		$.ajax({
			url: '/profile',
			type: 'POST',
			data: info,
			success: function(res) {
				if (res == 'yes') {
					$('div#addApi').slideDown(300);
					setTimeout(() => { $('div#addApi').slideUp(300); }, 5000);
				}
				if (res == 'newYes') {
					$('div#noApi').slideDown(300);
					setTimeout(() => { $('div#noApi').slideUp(300); }, 5000);
				}
			}
		});
	});

	$('form#editInfo').submit(function(e) {
		e.preventDefault();
		var info = $(this).serialize();

		$.ajax({
			url: '/?view=profile',
			type: 'POST',
			data: info,
			success: function(res) {
				if (res == "accept") {
					$('div#saveInfo').slideDown(300);
					setTimeout(() => { $('div#saveInfo').slideUp(300); }, 5000);
				}
			}
		});

	});

	$('form#editPass').submit(function(e) {
		e.preventDefault();
		var info = $(this).serialize();

		$.ajax({
			url: '/?view=profile',
			type: 'POST',
			data: info,
			success: function(res) {
				if (res == "accept") {
					$('form#editPass > input').val('');
					$('div#savePass').slideDown(300);
					setTimeout(() => { $('div#savePass').slideUp(300); }, 5000);
				}
				if (res == "noPass") {
					$('form#editPass > input').val('');
					$('div#noPass').slideDown(300);
					setTimeout(() => { $('div#noPass').slideUp(300); }, 5000);
				}
			}
		});
	});
	break;

	case 'progress':
	$('form#progres').submit(function(e) {
		e.preventDefault();
		var info = $(this).serialize();
		$('div.overlay').hide().fadeIn(300);

		$.ajax({
			url: '/progress',
			type: 'POST',
			data: info,
			success: function(res) {
				$('div.overlay').hide();
				$('div#getProgress').text('').html(res);
			}
		});
	});
	break;

	case 'reference':

	$('input[name="emailcheck1"]').click(function() {
		if ($(this).prop('checked')) {
			$('#email1').slideDown(150);
		} else {
			$('#email1').slideUp(150);
		}
	});
	$('input[name="emailcheck2"]').click(function() {
		if ($(this).prop('checked')) {
			$('#email2').slideDown(150);
		} else {
			$('#email2').slideUp(150);
		}
	});
	$('input[name="emailcheck3"]').click(function() {
		if ($(this).prop('checked')) {
			$('#email3').slideDown(150);
		} else {
			$('#email3').slideUp(150);
		}
	});

	$('select#type').change(function() {
		let type = $(this).val();

		$('div.type').slideUp(300);
		$('div#type-'+type).slideDown(300);
	});

	$(function($){
		$("#phone1").mask("+7 (999) 999-9999");
		$("#phone2").mask("+7 (999) 999-9999");
		$("#phone3").mask("+7 (999) 999-9999");
	});

	$('form.formType').submit(function(e) {
		e.preventDefault();
		let info = $(this).serialize();

		$.ajax({
			url: '/reference',
			type: 'POST',
			data: info,
			success: function(res) {
				if (res == 'yes') {
					$('form.formType > input').val('');
					$('form.formType > div > input').val('');
					$('div.sendYes').slideDown(300);
					setTimeout(() => { $('div.sendYes').slideUp(300); }, 5000);
				} else {
					$('form.formType > input').val('');
					$('form.formType > div > input').val('');
					$('div.sendError').slideDown(300);
					setTimeout(() => { $('div.sendError').slideUp(300); }, 5000);
				}
			}
		});
	});

	break;
}

$('div.spoiler').click(function() {
	var info = $(this).attr('data-item');

	if ($(this).hasClass('active')) {
		$('div.spoiler-content[data-item="' + info + '"]').slideUp(300);
		$(this).removeClass('active');
	} else {
		$('div.spoiler-content').slideUp(300);
		$('div.spoiler').removeClass('active');
		$('div.spoiler-content[data-item="' + info + '"]').slideDown(300);
		$(this).addClass('active');
	}

});



$('div.spoiler-close').click(function() {
	$('#noauth').toast('show');
});

$('a#norole').click(function(e) {
	e.preventDefault();
	$('#noauth').toast('show');
});