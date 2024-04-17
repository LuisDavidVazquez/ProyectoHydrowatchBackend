import MongoRecordRepository from "../infrastructure/repositories/MongoRecordRespository";

export default class GetByPkUseCase {
  constructor(readonly repository: MongoRecordRepository) {}
  async run(pk: string) {
    return await this.repository.getByPk(pk);
  }
}
