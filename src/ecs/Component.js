export class Component {
  constructor(values) {
    const defaultProperties = this.getDefaultProperties();
    Object.keys(defaultProperties).forEach((key) => {
      this[key] = defaultProperties[key];
    });

    if (values !== undefined)
      Object.keys(values).forEach((key) => {
        this[key] = values[key];
      });
  }

  getDefaultProperties() {
    return {};
  }
}