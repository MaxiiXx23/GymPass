export class GymAlreadyExistsError extends Error {
  constructor() {
    super('Gym Already Exists.')
  }
}
