javascript: (function () {
    var texto = ObtenerValorfromSelection();
    var divisaOrigin = "JPY";
    var divisaDestiny = "EUR";
    if (dineroValido(texto)) {
        texto = EliminarSeparadorMiles(texto);
        convertirMoneda(texto, divisaOrigin, divisaDestiny).then(resultado => {
            if (resultado !== null) {
                alert(texto + " "+ divisaOrigin + " = " + resultado +" " +divisaDestiny);
            } else {
                alert('Failed conversion: ' + texto);
            }
        });
    }
    else
        alert("Invalid value: " + texto);

    function ObtenerValorfromSelection() {
        const selection = window.getSelection();
        var selectedText = "";
        if (selection && selection.rangeCount > 0) {
            selectedText = selection.toString();
        }
        if (!selectedText) {
            const activeElement = document.activeElement;
            if (activeElement && (activeElement.tagName === "TEXTAREA" || activeElement.tagName === "INPUT")) {
                const start = activeElement.selectionStart;
                const end = activeElement.selectionEnd;
                selectedText = activeElement.value.substring(start, end);
            }
        }
        return selectedText;
    }

    function dineroValido(texto) {
        const regex = /^[$€£¥]?[\d,.]+(\.\d{1,2})?$/;
        return regex.test(texto.trim());
    }

    function EliminarSeparadorMiles(numero) {
        return numero.replace(/(?<=\d)([.,])(?=\d{3})/g, '');
    }

    async function convertirMoneda(cantidad, base, destino) {
        const url = `https://api.frankfurter.app/latest?amount=${cantidad}&from=${base}&to=${destino}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Request error: ${response.status}`);
            }
            const data = await response.json();
            return data.rates[destino];
        } catch (error) {
            alert('Error:', error);
            return null;
        }
    }
})();