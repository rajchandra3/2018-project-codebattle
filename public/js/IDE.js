require.config({ paths: { 'vs': '/scripts/monaco-editor/min/vs' }});
	require(['vs/editor/editor.main'], function() {
		var editor = monaco.editor.create(document.getElementById('container'), {
			value: [
				'function result() {',
                '\t ',
                '\t return answer //put your result here',
				'}'
			].join('\n'),
            language: 'javascript',
            theme: "vs-dark"
		});
	});