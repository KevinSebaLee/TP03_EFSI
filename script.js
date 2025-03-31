const listasVer = document.getElementById('listasVer');
const ingresoLista = document.getElementById('ingresoLista');
const lista = document.getElementById('lista');
const botonBorrar = document.getElementById('eliminarLista')

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
        eliminar.innerHTML = "Borrar"

        span.textContent = listaIngresar;

        checkbox.addEventListener('change', () => {
            eliminar.style.display = checkbox.checked ? 'inline' : 'none';
        });

        botonBorrar.addEventListener('click', () => {
            const checkbox = li.querySelector('input[type="checkbox"]'); 
            if (checkbox && checkbox.checked) { 
                console.log(li.innerHTML);
                lista.removeChild(li);
            }
        });    

        eliminar.addEventListener('click', () => {
            lista.removeChild(li)
        })

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(eliminar)

        lista.appendChild(li);

        ingresoLista.value = '';
    }
});


