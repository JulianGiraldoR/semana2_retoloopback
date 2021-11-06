import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Matricula, MatriculaRelations, Estudiante} from '../models';
import {EstudianteRepository} from './estudiante.repository';

export class MatriculaRepository extends DefaultCrudRepository<
  Matricula,
  typeof Matricula.prototype.id,
  MatriculaRelations
> {

  public readonly estudiante: BelongsToAccessor<Estudiante, typeof Matricula.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>,
  ) {
    super(Matricula, dataSource);
    this.estudiante = this.createBelongsToAccessorFor('estudiante', estudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiante', this.estudiante.inclusionResolver);
  }
}
