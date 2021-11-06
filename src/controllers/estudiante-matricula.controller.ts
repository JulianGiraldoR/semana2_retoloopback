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
  Estudiante,
  Matricula,
} from '../models';
import {EstudianteRepository} from '../repositories';

export class EstudianteMatriculaController {
  constructor(
    @repository(EstudianteRepository) protected estudianteRepository: EstudianteRepository,
  ) { }

  @get('/estudiantes/{id}/matriculas', {
    responses: {
      '200': {
        description: 'Array of Estudiante has many Matricula',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Matricula)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Matricula>,
  ): Promise<Matricula[]> {
    return this.estudianteRepository.matriculas(id).find(filter);
  }

  @post('/estudiantes/{id}/matriculas', {
    responses: {
      '200': {
        description: 'Estudiante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Matricula)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estudiante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Matricula, {
            title: 'NewMatriculaInEstudiante',
            exclude: ['id'],
            optional: ['estudianteId']
          }),
        },
      },
    }) matricula: Omit<Matricula, 'id'>,
  ): Promise<Matricula> {
    return this.estudianteRepository.matriculas(id).create(matricula);
  }

  @patch('/estudiantes/{id}/matriculas', {
    responses: {
      '200': {
        description: 'Estudiante.Matricula PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Matricula, {partial: true}),
        },
      },
    })
    matricula: Partial<Matricula>,
    @param.query.object('where', getWhereSchemaFor(Matricula)) where?: Where<Matricula>,
  ): Promise<Count> {
    return this.estudianteRepository.matriculas(id).patch(matricula, where);
  }

  @del('/estudiantes/{id}/matriculas', {
    responses: {
      '200': {
        description: 'Estudiante.Matricula DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Matricula)) where?: Where<Matricula>,
  ): Promise<Count> {
    return this.estudianteRepository.matriculas(id).delete(where);
  }
}
