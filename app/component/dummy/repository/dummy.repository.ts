import Model from './dummy.model';

class DummyRepository {
  public static async create(data: { name: string }) {
    try {
      return await Model.create(data);
    } catch (e) {
      return e;
    }
  }
}
export default DummyRepository;
