import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Estudiante, EstudianteRelations, Matricula} from '../models';
import {MatriculaRepository} from './matricula.repository';

export class EstudianteRepository extends DefaultCrudRepository<
  Estudiante,
  typeof Estudiante.prototype.id,
  EstudianteRelations
> {

  public readonly matriculas: HasManyRepositoryFactory<Matricula, typeof Estudiante.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('MatriculaRepository') protected matriculaRepositoryGetter: Getter<MatriculaRepository>,
  ) {
    super(Estudiante, dataSource);
    this.matriculas = this.createHasManyRepositoryFactoryFor('matriculas', matriculaRepositoryGetter,);
    this.registerInclusionResolver('matriculas', this.matriculas.inclusionResolver);
  }
}
