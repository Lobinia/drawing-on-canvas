// Initial data

let currentColor = 'black';
let colorPicker = '';
let podeDesenhar = false;
let mouseX = 0;
let mouseY = 0;
let screen = document.querySelector('#tela');
let contexto = screen.getContext('2d');

// Events
document.querySelectorAll('.color').forEach( item => {
    item.addEventListener('click', colorChanger);
});
document.querySelector('input').addEventListener('input', pegadorDCor)


screen.addEventListener('mousedown', ativarModoDesenho);
screen.addEventListener('mousemove', desenhar);
window.addEventListener('mouseup', desativarModoDesenho);
document.querySelector('.clear').addEventListener('click', clearScreen)
// Functions

function clearScreen() {
    contexto.setTransform(1, 0, 0, 1, 0, 0);
    contexto.clearRect(0, 0, contexto.canvas.width, contexto.canvas.height);

}


function pegadorDCor() {
    
    let corSelecionada = document.querySelector('input').value;

    document.querySelector('input').setAttribute('data-color', `${corSelecionada}`);

    let color = document.querySelector('input').getAttribute('data-color');

    currentColor = color;

}
function colorChanger(event) {

        document.querySelector('.color.active').classList.remove('active');

        event.target.classList.add('active');

        let color = event.target.getAttribute('data-color')

        currentColor = color;

}

function ativarModoDesenho(e) {
    podeDesenhar = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function desenhar(e) {
    if(podeDesenhar) {
        draw(e.pageX, e.pageY);
    }
}

function desativarModoDesenho() {
    podeDesenhar = false;
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    contexto.beginPath();
    contexto.lineWidth = 5;
    contexto.lineJoin = "round";
    contexto.moveTo(mouseX, mouseY);
    contexto.lineTo(pointX, pointY);
    contexto.closePath();
    contexto.strokeStyle = currentColor;
    contexto.stroke();


    mouseX = pointX;
    mouseY = pointY;
}