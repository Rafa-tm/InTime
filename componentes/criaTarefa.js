import { carregaTarefa } from './carregaTarefa.js'
import BotaoConclui from './concluiTarefa.js'
import BotaoDeleta from './deletaTarefa.js'

export const handleNovoItem = evento => {
  evento.preventDefault()
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
  const input = document.querySelector('[data-form-input]')
  const valor = input.value

  const calendario = document.querySelector('[data-form-date]')
  const data = moment(calendario.value)

  const horario = data.format('HH:mm')

  const dataFormatada = data.format('DD/MM/YYYY')
  const concluida = false

  const dados = {
    valor,
    dataFormatada,
    horario,
    concluida
  }

  const tarefasAtualizadas = [...tarefas, dados]

  localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas))

  input.value = ' '

  carregaTarefa()
}

export const Tarefa = ({ valor, horario, concluida }, id) => {
  const tarefa = document.createElement('li')
  const conteudo = `<p class="tarefa__conteudo">${horario} <br> ${valor}</p>`

  if (concluida) {
    tarefa.classList.add('tarefa--concluida')
  }
  tarefa.classList.add('tarefa')
  tarefa.innerHTML = conteudo

  const container = document.createElement('div')
  container.classList.add('containerBotao')
  container.appendChild(BotaoConclui(carregaTarefa, id))
  container.appendChild(BotaoDeleta(carregaTarefa, id))

  tarefa.appendChild(container)

  return tarefa
}
