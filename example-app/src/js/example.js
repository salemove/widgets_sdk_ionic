import { GliaSdk } from 'glia-widgets-ionic';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    GliaSdk.echo({ value: inputValue })
}
