interface MemoryState {
  [key: string]: string | number;
}

export class MemoryRouter {
  private _memoryState: MemoryState;
  constructor(initialState: MemoryState = {}) {
    this._memoryState = initialState;
  }
  write(routeState: MemoryState) {
    this._memoryState = routeState;
  }
  read() {
    return this._memoryState;
  }
  createURL() {
    return '';
  }
  onUpdate() {
    return {};
  }
  dispose() {}
}
