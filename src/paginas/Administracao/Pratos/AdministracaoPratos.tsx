import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import http from '../../../http'
import IPrato from '../../../interfaces/IPrato'

const AdministracaoPratos = () => {

  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get<IPrato[]>('pratos/')
      .then(resposta => setPratos(resposta.data))
      .catch(erro => console.log(erro))
  }, [])

  const excluir = (pratoAhSerExcluido: IPrato) => {
    http.delete(`pratos/${pratoAhSerExcluido.id}/`)
      .then(() => {
        const novosPratos = pratos.filter(pratos => pratos.id !== pratoAhSerExcluido.id)
        setPratos([...novosPratos])
      })
      .catch(erro => console.log(erro))
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Tag
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Deletar
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map(prato =>
            <TableRow key={prato.id}>
              <TableCell>
                {prato.nome}
              </TableCell>
              <TableCell>
                {prato.tag}
              </TableCell>
              <TableCell>
                <a href={prato.imagem} target='_blank' rel="noreferrer">Ver imagem</a>
              </TableCell>
              <TableCell>
                [<Link to={`/admin/pratos/${prato.id}`}> editar</Link>]
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='error' onClick={() => excluir(prato)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer >
  )
}

export default AdministracaoPratos