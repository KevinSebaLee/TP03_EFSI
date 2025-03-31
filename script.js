const listasVer = document.getElementById('listasVer');
const ingresoLista = document.getElementById('ingresoLista');
const lista = document.getElementById('lista');
const botonBorrar = document.getElementById('eliminarLista');

let listas = JSON.parse(localStorage.getItem('listas')) || [];

const saveToLocalStorage = () => localStorage.setItem('listas', JSON.stringify(listas));

const renderList = () => {
    lista.innerHTML = '';
    listas.forEach((item, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        const span = document.createElement('span');
        const eliminar = document.createElement('button');

        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        eliminar.style.display = item.completed ? 'inline' : 'none';
        eliminar.textContent = 'Borrar';

        span.textContent = item.text;

        checkbox.addEventListener('change', () => {
            item.completed = checkbox.checked;
            eliminar.style.display = checkbox.checked ? 'inline' : 'none';
            saveToLocalStorage();
        });

        eliminar.addEventListener('click', () => {
            listas.splice(index, 1);
            saveToLocalStorage();
            renderList();
        });

        li.append(checkbox, span, eliminar);
        lista.appendChild(li);
    });
};

listasVer.addEventListener('submit', (event) => {
    event.preventDefault();
    const listaIngresar = ingresoLista.value.trim();
    
    if (!listaIngresar) return;

    listas.push({ text: listaIngresar, completed: false });
    saveToLocalStorage();
    renderList();
    ingresoLista.value = '';
});

botonBorrar.addEventListener('click', () => {
    listas = listas.filter(item => !item.completed);
    saveToLocalStorage();
    renderList();
});

renderList();
