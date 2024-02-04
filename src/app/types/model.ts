/** @desc Interface for Model **/
export interface IModel {
  findAll(authUserId: number): Promise<any[]>
  findById(id: number, authUserId: number): Promise<any>
  create<T>(data: T, authUserId: number): Promise<any>
  update<T>(id: number, data: T, authUserId: number): Promise<any>
  deleteById(id: number, authUserId: number): Promise<void>
  destroyManyById(taskIds: number[], authUserId: number): Promise<void>
}

export interface IUserModel extends IModel {
  findByEmail(email: string): Promise<any>
}
