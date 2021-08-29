//If you want to copyText from Element
const button = document.querySelector('.btn-large')

function copyTextFromElement(elementID) {
    let element = document.getElementById(elementID); //select the element
    let elementText = element.textContent; //get the text content from the element
    copyText(elementText); //use the copyText function below
    console.log(button)
    button.innerText = 'Скопировано'
  }
  
  //If you only want to put some Text in the Clipboard just use this function
  // and pass the string to copied as the argument.
  function copyText(text) {
    navigator.clipboard.writeText(text);
  }

