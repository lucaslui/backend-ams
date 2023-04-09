import { left, right } from '@/src/shared/either'
import { IDeleteUnit, DeleteUnitParams, DeleteUnitReturn } from '../../boundaries/input/unit/delete-unit'
import { IDeleteUnitRepository } from '../../boundaries/output/repositories/unit/delete-unit-repository'
import { ILoadUnitByIdRepository } from '../../boundaries/output/repositories/unit/load-unit-by-id-repository'

export class DeleteUnit implements IDeleteUnit {
  constructor (
    private readonly unitsRepository: ILoadUnitByIdRepository & IDeleteUnitRepository
  ) {}

  async delete (params: DeleteUnitParams): Promise<DeleteUnitReturn> {
    const isFoundUnit = await this.unitsRepository.loadById({ unitId: params.unitId })

    if (!isFoundUnit) {
      return left(new Error('Unit not found'))
    }

    await this.unitsRepository.delete(params)

    return right(undefined)
  }
}
