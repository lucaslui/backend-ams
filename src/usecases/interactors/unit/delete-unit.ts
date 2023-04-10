import { left, right } from '@/src/shared/either'
import { IDeleteUnit, DeleteUnitParams, DeleteUnitReturn } from '../../boundaries/input/unit/delete-unit'
import { IDeleteUnitRepository } from '../../boundaries/output/repositories/unit/delete-unit-repository'
import { ILoadUnitByIdRepository } from '../../boundaries/output/repositories/unit/load-unit-by-id-repository'
import { IDeleteAssetsByUnitIdRepository } from '../../boundaries/output/repositories/asset/delete-assets-by-unit-id-repository'

export class DeleteUnit implements IDeleteUnit {
  constructor (
    private readonly unitsRepository: ILoadUnitByIdRepository & IDeleteUnitRepository,
    private readonly assetsRepository: IDeleteAssetsByUnitIdRepository
  ) {}

  async delete (params: DeleteUnitParams): Promise<DeleteUnitReturn> {
    const unit = await this.unitsRepository.loadById({ unitId: params.unitId })

    if (!unit) {
      return left(new Error('Unit not found'))
    }

    await this.unitsRepository.delete(params)
    await this.assetsRepository.deleteByUnitId({ unitId: unit.id })

    return right(undefined)
  }
}
