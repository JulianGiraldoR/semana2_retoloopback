import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Matricula,
  Estudiante,
} from '../models';
import {MatriculaRepository} from '../repositories';

export class MatriculaEstudianteController {
  constructor(
    @repository(MatriculaRepository)
    public matriculaRepository: MatriculaRepository,
  ) { }

  @get('/matriculas/{id}/estudiante', {
    responses: {
      '200': {
        description: 'Estudiante belonging to Matricula',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estudiante)},
          },
        },
      },
    },
  })
  async getEstudiante(
    @param.path.string('id') id: typeof Matricula.prototype.id,
  ): Promise<Estudiante> {
    return this.matriculaRepository.estudiante(id);
  }
}
