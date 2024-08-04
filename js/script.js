document.addEventListener('DOMContentLoaded', function () {
    const valorDigitado = document.querySelector('#valorEmReal');
    const moedaSelecionada = document.getElementsByName('moedaEstrangeira');
    const aviso = document.querySelector('#aviso');
    const btnConverter = document.querySelector('#btnConverter');
    const btnLimpar = document.querySelector('#btnLimpar');
  
    const valorDoDolar = 5.31;
    const valorDoEuro = 6.23;
    const valorDaLibra = 7.26;
    const valorDoBitcoin = 229762.85;
    let valorEmReal = 0;
    let moedaEstrangeira = '';
    let moedaConvertida = 0.00;
  
    function formatarMensagem(moedaConvertida, simbolo) {
      aviso.textContent = `O valor ${valorEmReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} convertido em ${moedaEstrangeira} é ${moedaConvertida} ${simbolo}`;
    }
  
    function bloquearBotao() {
      btnConverter.disabled = true;
      btnConverter.style.background = '#ccc';
      btnConverter.style.cursor = 'not-allowed';
    }
  
    function ativarBotao() {
      if (valorDigitado.value > 0) {
        btnConverter.disabled = false;
        btnConverter.style.background = '#ffc107';
        btnConverter.style.cursor = 'pointer';
      } else {
        bloquearBotao();
      }
    }
  
    function converterMoeda() {
      valorEmReal = parseFloat(valorDigitado.value);
  
      moedaEstrangeira = Array.from(moedaSelecionada).find(radio => radio.checked)?.value;
  
      if (!moedaEstrangeira) {
        aviso.textContent = 'Escolha uma moeda estrangeira';
        return;
      }
  
      switch (moedaEstrangeira) {
        case 'Dólar':
          moedaConvertida = valorEmReal / valorDoDolar;
          formatarMensagem(moedaConvertida.toLocaleString('en-US', { style: 'currency', currency: 'USD' }), 'USD');
          break;
  
        case 'Euro':
          moedaConvertida = valorEmReal / valorDoEuro;
          formatarMensagem(moedaConvertida.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }), 'EUR');
          break;
  
        case 'Libra':
          moedaConvertida = valorEmReal / valorDaLibra;
          formatarMensagem(moedaConvertida.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }), 'GBP');
          break;
  
        case 'Bitcoins':
          moedaConvertida = valorEmReal / valorDoBitcoin;
          aviso.textContent = `O valor ${valorEmReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} convertido em Bitcoins é ${moedaConvertida.toFixed(5)} BTC`;
          break;
  
        default:
          aviso.textContent = 'Escolha uma moeda estrangeira';
      }
    }
  
    function limparCampos() {
      valorDigitado.value = '';
      moedaSelecionada.forEach(radio => (radio.checked = false));
      aviso.textContent = 'Digite o valor, escolha a moeda e converter';
      bloquearBotao();
    }
  
    valorDigitado.addEventListener('input', ativarBotao);
    btnConverter.addEventListener('click', converterMoeda);
    btnLimpar.addEventListener('click', limparCampos);
  
    bloquearBotao(); // Inicialmente, o botão deve estar bloqueado.
  });
  