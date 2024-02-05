/** @desc Interface for Model **/
export interface IModel {
  findAll(authUserId: number): Promise<any[]>
  findById(itemId: number, authUserId: number): Promise<any>
  create<T>(body: T, authUserId?: number): Promise<any>
  update<T>(itemId: number, body: T, authUserId: number): Promise<any>
  deleteById(itemId: number, authUserId: number): Promise<void>
  destroyManyById(itemIds: number[], authUserId: number): Promise<void>
}

export interface IUserModel extends IModel {
  findByEmail(userEmail: string): Promise<any>
}
