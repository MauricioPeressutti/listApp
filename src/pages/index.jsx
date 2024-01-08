import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import styles from '../styles/styles.module.css'
import ProgressBar from 'react-bootstrap/ProgressBar';
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
    {
      tarea: 'Revisar abajo de la cama',
      resuelta: false
    },
    {
      tarea: 'Baño',
      resuelta: false
    },
    {
      tarea: 'Rejilla',
      resuelta: false
    },
    {
      tarea: 'Papel higiénico y rolo de cocina',
      resuelta: false
    },
    {
      tarea: 'Fosforos',
      resuelta: false
    },
    {
      tarea: 'Mantel y repasador',
      resuelta: false
    },
    {
      tarea: 'Revisar horno',
      resuelta: false
    },
    {
      tarea: 'Parrilla',
      resuelta: false
    },
    {
      tarea: 'Barrer',
      resuelta: false
    },
    {
      tarea: 'Pasar el trapo',
      resuelta: false
    },
    {
      tarea: 'Limpiar la mesa',
      resuelta: false
    },
    {
      tarea: 'Limpiar vidrios',
      resuelta: false
    },
    {
      tarea: 'Sacar telarañas',
      resuelta: false
    },
    {
      tarea: 'Sillas y mesas de afuera',
      resuelta: false
    },
    {
      tarea: 'Galletas dulces',
      resuelta: false
    },
    {
      tarea: 'Caja de té',
      resuelta: false
    },
    {
      tarea: 'Toallas y sábanas limpias',
      resuelta: false
    },
    {
      tarea: 'Detergente',
      resuelta: false
    },
    {
      tarea: 'Ollas',
      resuelta: false
    },
    {
      tarea: 'Tachos de basura',
      resuelta: false
    },
    {
      tarea: 'Cubiertos',
      resuelta: false
    },
    {
      tarea: 'Bandejas del horno',
      resuelta: false
    },
    {
      tarea: 'Tablas de asado',
      resuelta: false
    },
    {
      tarea: 'Pala de asador',
      resuelta: false
    },
    {
      tarea: 'Limpiar los espejos de las piezas',
      resuelta: false
    },
  ]








  const [finish, setFinish] = useState(0);
  const [checkList, setCheckList] = useState(initialCheckList);
  const [visibleAlerts, setVisibleAlerts] = useState(Array(initialCheckList.length).fill(true));
  const [colorBarra, setColorBarra] = useState('danger');
  const [porcentajeResueltas, setPorcentajeResueltas] = useState(0);

  const setTask = (index) => {
    // Activar animación al presionar "Finalizado"
    setVisibleAlerts((prevVisibleAlerts) => {
      const newVisibleAlerts = [...prevVisibleAlerts];
      newVisibleAlerts[index] = false;
      return newVisibleAlerts;
    });


    setCheckList((prevCheckList) => {
      const newList = [...prevCheckList];
      newList[index].resuelta = true;
      checkAllTaskFinished(newList);
      const resuelt = (checkList.filter(tarea => tarea.resuelta === true).length * 100 / checkList.length);
      setPorcentajeResueltas(resuelt)
      let colorBarra;
      if (resuelt <= 25) {
        colorBarra = 'danger';
        setColorBarra('danger')
      } else if (resuelt <= 50) {
        colorBarra = 'warning';
        setColorBarra('warning')
      } else if (resuelt <= 75) {
        colorBarra = 'info';
        setColorBarra('info')
      } else {
        colorBarra = 'success';
        setColorBarra('success')
      }
      return newList;
    });
  };

  const checkAllTaskFinished = (lista) => {
    const todasResueltas = lista.every(tarea => tarea.resuelta === true);
    let auxArr = 0;
    lista.forEach(e => {
      if (e.resuelta) {
        auxArr++
      }
    });
    setFinish(auxArr)
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
        setFinish(0);
        // Reiniciar el estado de visibilidad de las alertas
        setVisibleAlerts(Array(initialCheckList.length).fill(true));
        setColorBarra('danger');
        setPorcentajeResueltas('0')
      }
    });
  };

  return (
    <main>
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm my-20">
        {checkList.map((c, index) => (
          !c.resuelta && visibleAlerts[index] ? (
            <div
              key={index}
              onAnimationStart={() => setVisibleAlerts((prevVisibleAlerts) => {
                const newVisibleAlerts = [...prevVisibleAlerts];
                newVisibleAlerts[index] = true;
                return newVisibleAlerts;
              })}
              className={`${styles.fadeInOut} p-2 pb-1`}
            >
              <Alert className='my-2' variant="info">
                {/* <Alert.Heading> <h4>Tarea #{index + 1}</h4> </Alert.Heading> */}
                <p className='text-lg'>{c.tarea}</p>
                <hr />
                <div className="d-grid pt-2">
                  <button class="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-1 rounded-full shadow-lg" onClick={() => setTask(index)}>
                    Finalizado
                  </button>
                  {/*<Button variant="outline-primary" onClick={() => setTask(index)}>
                    Finalizado
            </Button>*/}
                </div>
              </Alert>
            </div>
          ) : null
        ))}
      </div>
      <div className='p-8 bg-blue-950 fixed top-0 left-0 right-0 p-3'>
        <h2 className="text-center text-2xl mb-2">Listado de tareas {checkList.filter(tarea => tarea.resuelta === true).length}/{checkList.length}</h2>
        <ProgressBar animated now={porcentajeResueltas} variant={colorBarra} />
        {/* <ProgressBar animated now={((checkList.filter(tarea => tarea.resuelta === true).length) * 100 / checkList.length)} /> */}
      </div>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">

        {/* Contenido adicional */}
      </div>
    </main>
  );
}
