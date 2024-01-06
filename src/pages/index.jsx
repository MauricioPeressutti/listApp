import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import styles from '../styles/styles.module.css'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const initialCheckList = [
    {
      tarea: 'Sábanas',
      resuelta: false
    },
    {
      tarea: 'Toallas',
      resuelta: false
    },
    {
      tarea: 'Chequear muebles',
      resuelta: false
    },
    {
      tarea: 'Limpiar las mesa de luz',
      resuelta: false
    },
  ]








  const [checkList, setCheckList] = useState(initialCheckList);
  const [visibleAlerts, setVisibleAlerts] = useState(Array(initialCheckList.length).fill(true));

  const setTask = (index) => {
    // Activar animación al presionar "Finalizado"
    setVisibleAlerts((prevVisibleAlerts) => {
      const newVisibleAlerts = [...prevVisibleAlerts];
      newVisibleAlerts[index] = false;
      return newVisibleAlerts;
    });

    // Esperar un breve período antes de cambiar el estado de checkList
    setTimeout(() => {
      setCheckList((prevCheckList) => {
        const newList = [...prevCheckList];
        newList[index].resuelta = true;
        checkAllTaskFinished(newList);
        return newList;
      });
    }, 500); // Puedes ajustar el tiempo según la duración de tu animación
  };

  const checkAllTaskFinished = (lista) => {
    const todasResueltas = lista.every(tarea => tarea.resuelta === true);
    if (todasResueltas) {
      mostrarAlerta();
    }
  };

  const mostrarAlerta = () => {
    Swal.fire({
      title: 'Tareas finalizadas',
      text: 'Su cabaña esta lista para los nuevos clientes',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#A5DC86',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Nueva cabaña!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Preparando nueva cabaña!',
          text: '',
          icon: 'success'
        });
        setCheckList(initialCheckList);

        // Reiniciar el estado de visibilidad de las alertas
        setVisibleAlerts(Array(initialCheckList.length).fill(true));
      }
    });
  };

  return (
    <main>
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm">
        <h2 className="text-center mb-2">Listado de tareas</h2>
        {checkList.map((c, index) => (
          !c.resuelta && visibleAlerts[index] ? (
            <div
              key={index}
              onAnimationStart={() => setVisibleAlerts((prevVisibleAlerts) => {
                const newVisibleAlerts = [...prevVisibleAlerts];
                newVisibleAlerts[index] = true;
                return newVisibleAlerts;
              })}
              className={`mb-3 ${styles.fadeInOut} p-2`}
            >
              <Alert variant="info">
                <Alert.Heading> <h3>Tarea</h3> </Alert.Heading>
                <p>{c.tarea}</p>
                <hr />
                <div className="d-flex justify-content-end pt-2">
                  <Button variant="outline-primary" onClick={() => setTask(index)}>
                    Finalizado
                  </Button>
                </div>
              </Alert>
            </div>
          ) : null
        ))}
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        {/* Contenido adicional */}
      </div>
    </main>
  );
}
