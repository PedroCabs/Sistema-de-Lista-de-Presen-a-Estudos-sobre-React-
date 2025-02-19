import { useState, useEffect } from "react";
import "./style.css";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";

export function Home() {
  const [studentName, setstudentName] = useState(); // Armazena o valor digitado pela pessoa no input
  const [students, setStudents] = useState([]); // Armazena os estudantes na lista de presença
  const [user, setUser] = useState({name: '', avatar: '' }) // Estado que irá armazenar mo nome e avatar do usuario no githhub


  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit",
      }),
    };
    setStudents(prevState => [...prevState, newStudent]) // Aqui temos a função que armazena o valor anterior do estado, antes que ele seja substituido
  }

  useEffect(() => {
    //corpo so useEfect
    fetch('https://api.github.com/users/PedroCabs') // Api padrão do Js fetch, para fazer requisições http 
    .then(response => response.json()) // Aqui fazemos uma promisse a partir do then, e em seguida convertemos a reposta para o formato json()
    .then(data =>{ // Aqui criamos um Estado para poder pegar os dados da resposta e armazenalos no Obj user(Estado  )
        setUser({ 
          name:data.login,
         avatar: data.avatar_url,
        })
    })
  }, []  ) //Quais os Estados que o nosso useEfect depende

  return (
    <div className="container">

      <Header
        name = {user.name}
        avatar = {user.avatar}
       />
      <input
        type="text"
        placeholder="Digite seu nome"
        onChange={(e) => setstudentName(e.target.value)}
      />
      <button type="button" onClick={ handleAddStudent} >Enviar</button>
      {
        students.map((student) => (
          <Card
          key = {student.time} // Lembrar de adicionar uma key unica para cada componente gerado por estrutura de repetição 
          name={student.name} 
          time={student.time} 
          />
        )) // Percorre a array contendo os estudantes
      }
    </div>
  );
}

export default Home;
