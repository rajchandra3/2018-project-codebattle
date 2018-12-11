require.config({ paths: { 'vs': '/scripts/monaco-editor/min/vs' }});
	require(['vs/editor/editor.main'], function() {
		var editor = monaco.editor.create(document.getElementById('container'), {
			value: [
				'// Make sure you put your answer is returned! ',
				'function answer(n){',
				'\t',
				'\t ',
				'}',
				''
			].join('\n'),
            language: 'javascript',
            theme: "vs-dark"
		});

		function saveI(){
			document.getElementById("hiddencodeinput").value = editor.getValue();
			document.getElementById("sendcodeform").submit(); 
		}
		document.getElementById('submit_solution').onclick = saveI;
		

	});

