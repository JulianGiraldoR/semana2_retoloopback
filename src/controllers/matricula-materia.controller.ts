import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Matricula,
  Materia,
} from '../models';
import {MatriculaRepository} from '../repositories';

export class MatriculaMateriaController {
  constructor(
    @repository(MatriculaRepository) protected matriculaRepository: MatriculaRepository,
  ) { }

  @get('/matriculas/{id}/materia', {
    responses: {
      '200': {
        description: 'Matricula has one Materia',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Materia),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Materia>,
  ): Promise<Materia> {
    return this.matriculaRepository.materia(id).get(filter);
  }

  @post('/matriculas/{id}/materia', {
    responses: {
      '200': {
        description: 'Matricula model instance',
        content: {'application/json': {schema: getModelSchemaRef(Materia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Matricula.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Materia, {
            title: 'NewMateriaInMatricula',
            exclude: ['id'],
            optional: ['matriculaId']
          }),
        },
      },
    }) materia: Omit<Materia, 'id'>,
  ): Promise<Materia> {
    return this.matriculaRepository.materia(id).create(materia);
  }

  @patch('/matriculas/{id}/materia', {
    responses: {
      '200': {
        description: 'Matricula.Materia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Materia, {partial: true}),
        },
      },
    })
    materia: Partial<Materia>,
    @param.query.object('where', getWhereSchemaFor(Materia)) where?: Where<Materia>,
  ): Promise<Count> {
    return this.matriculaRepository.materia(id).patch(materia, where);
  }

  @del('/matriculas/{id}/materia', {
    responses: {
      '200': {
        description: 'Matricula.Materia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Materia)) where?: Where<Materia>,
  ): Promise<Count> {
    return this.matriculaRepository.materia(id).delete(where);
  }
}
