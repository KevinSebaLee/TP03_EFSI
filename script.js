const listasVer = document.getElementById('listasVer');
const ingresoLista = document.getElementById('ingresoLista');
const lista = document.getElementById('lista');
const botonBorrar = document.getElementById('eliminarLista');
const botonVerMasRapida = document.getElementById('verMasRapida');
const tareaMasRapidaElemento = document.getElementById('tareaMasRapida');

let listas = JSON.parse(localStorage.getItem('listas')) || [];

const saveToLocalStorage = () => localStorage.setItem('listas', JSON.stringify(listas));

const listaMostrar = () => {
    lista.innerHTML = '';
    listas.forEach((item, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        const span = document.createElement('span');
        const eliminar = document.createElement('button');
        const tiempoCompletado = document.createElement('span'); // Para mostrar el tiempo de completado.

        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        eliminar.style.display = item.completed ? 'inline' : 'none';
        eliminar.textContent = 'Borrar';

        span.textContent = item.text;

        if (item.completed && item.completedAt) {
            // Mostrar el tiempo que pasó para completar la tarea
            const timeSpent = ((new Date(item.completedAt) - new Date(item.createdAt)) / 1000).toFixed(2);
            tiempoCompletado.textContent = `Completado en ${timeSpent} segundos`;
        }

        checkbox.addEventListener('change', () => {
            item.completed = checkbox.checked;
            if (checkbox.checked && !item.completedAt) {
                // Si la tarea se marca como completada, registramos el tiempo
                item.completedAt = new Date().toISOString();
            }
            eliminar.style.display = checkbox.checked ? 'inline' : 'none';
            saveToLocalStorage();
            listaMostrar();
        });

        eliminar.addEventListener('click', () => {
            listas.splice(index, 1);
            saveToLocalStorage();
            listaMostrar();
        });

        li.append(checkbox, span, eliminar, tiempoCompletado);
        lista.appendChild(li);
    });
};

listasVer.addEventListener('submit', (event) => {
    event.preventDefault();
    const listaIngresar = ingresoLista.value.trim();
    
    if (!listaIngresar) return;

    // Guardar la fecha y hora de creación de la tarea
    listas.push({ text: listaIngresar, completed: false, createdAt: new Date().toISOString() });
    saveToLocalStorage();
    listaMostrar();
    ingresoLista.value = '';
});

botonBorrar.addEventListener('click', () => {
    listas = listas.filter(item => !item.completed);
    saveToLocalStorage();
    listaMostrar();
});

const calcularTareaMasRapida = () => {
    let tareaMasRapida = null;
    let tiempoMasRápido = Infinity;

    listas.forEach(item => {
        if (item.completedAt) {
            const tiempoDeCompletado = (new Date(item.completedAt) - new Date(item.createdAt)) / 1000;
            if (tiempoDeCompletado < tiempoMasRápido) {
                tiempoMasRápido = tiempoDeCompletado;
                tareaMasRapida = item;
            }
        }
    });

    if (tareaMasRapida) {
        tareaMasRapidaElemento.textContent = `La tarea más rápida en completarse fue: "${tareaMasRapida.text}" en ${tiempoMasRápido.toFixed(2)} segundos.`;
    } else {
        tareaMasRapidaElemento.textContent = 'Aún no se han completado tareas.';
    }
};

botonVerMasRapida.addEventListener('click', calcularTareaMasRapida);

listaMostrar();
