import { IGymRepository } from '@/http/repositories/gymsRepository/IGymsRepository'
import { Gym } from '@prisma/client'

interface IRequest {
  query: string
  page: number
}

interface IResponse {
  gyms: Gym[]
}

export class SearchFetchGymsUseCase {
  constructor(private gymsRepository: IGymRepository) {}

  async execute({ query, page }: IRequest): Promise<IResponse> {
    const gyms = await this.gymsRepository.findManyByQuery(query, page)

    return {
      gyms,
    }
  }
}
