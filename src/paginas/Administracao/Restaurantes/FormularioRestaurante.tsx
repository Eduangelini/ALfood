import { Box, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import IRestaurante from '../../../interfaces/IRestaurante'
import http from '../../../http'

export const FormularioRestaurante = () => {

  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => {
          setNomeRestaurante(resposta.data.nome)
        })
        .catch(erro => console.log(erro))
    }
  }, [parametros])

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(resposta => {
          alert('Restaurante atualizado com sucesso!')
        })
        .catch(erro => console.log('erro de atualização'))

    } else {
      http.post('restaurantes/', {
        nome: nomeRestaurante
      })
        .then(resposta => {
          alert('Restaurante cadastrado com sucesso!')
        })
        .catch(erro => console.log('erro de cadastramento'))
    }
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component='h1' variant='h6'> Formulário de Restaurantes</Typography>
      <Box component="form" onSubmit={aoSubmeterForm}>
        <TextField
          fullWidth
          required
          value={nomeRestaurante}
          onChange={evento => setNomeRestaurante(evento.target.value)}
          label="Nome do Restaurante"
          variant="standard"
        />
        <Button
          sx={{ marginTop: 1 }}
          fullWidth
          type='submit'
          variant="outlined"
        >
          Salvar
        </Button>
      </Box>
    </Box>
  )
}
