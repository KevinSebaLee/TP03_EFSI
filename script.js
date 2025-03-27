const listasVer = document.getElementById('listasVer');
const ingresoLista = document.getElementById('ingresoLista');
const lista = document.getElementById('lista');

let listas = [];

listasVer.addEventListener('submit', (event) => {
    event.preventDefault();

    const listaIngresar = ingresoLista.value.trim();

    if (listaIngresar !== '') {
        listas.push(listaIngresar);

        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        const span = document.createElement('span');
        const eliminar = document.createElement('button');

        checkbox.type = 'checkbox';
        eliminar.style.display = "none"

        span.textContent = listaIngresar;

        checkbox.addEventListener('change', () => {
            eliminar.style.display = checkbox.checked ? 'inline' : 'none';
        });

        eliminar.addEventListener('click', () => {
            listas.pop()
        })

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(eliminar)

        lista.appendChild(li);

        ingresoLista.value = '';
    }
});


